import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-chekIn-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym'
import { CheckInUseCase } from '@/use-case/checkIn/checkin'
import { MaxDistanceError } from '@/use-case/err/max-distance-error'
import { MaxNumberCheckInError } from '@/use-case/err/max-number-checkin-error'
import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, expect, describe, it, vi, afterAll } from 'vitest'

let usersRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('ChekIn UseCase Test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(usersRepository, gymsRepository)
    vi.useFakeTimers()

    gymsRepository.create({
      id: 'gym_id',
      title: 'Gym Test',
      description: '',
      latitude: new Decimal(-23.0080615),
      longitude: new Decimal(-43.3006575),
      phone: '',
    })
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('Deve ser possivel criar um Checkin', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -23.0080615,
      userLongitude: -43.3006575,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Não deve ser possivel criar um checkin apos ja ter feito um no mesmo dia.', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -23.0080615,
      userLongitude: -43.3006575,
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym_id',
        userId: 'user_id',
        userLatitude: -23.0080615,
        userLongitude: -43.3006575,
      })
    }).rejects.toBeInstanceOf(MaxNumberCheckInError)
  })

  it('Deve ser possivel criar um checkin no outro dia apos ja ter feito um.', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -23.0080615,
      userLongitude: -43.3006575,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym_id',
      userId: 'user_id',
      userLatitude: -23.0080615,
      userLongitude: -43.3006575,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Não deve ser possivel fazer chekIn com uma distancia maior doque a determinada', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: 'gym_id2',
      title: 'Gym Test',
      description: '',
      latitude: new Decimal(-23.0080615),
      longitude: new Decimal(-43.3006575),
      phone: '',
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym_id2',
        userId: 'user_id',
        userLatitude: -23.0120751,
        userLongitude: -43.4768867,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
