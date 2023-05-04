import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-chekIn-repository'
import { ValidateCheckInUseCase } from '@/use-case/checkIn/validate-check-in'
import { ResoucerNotFoundError } from '@/use-case/err/resoucer-not-found'
import { beforeEach, expect, describe, it, vi, afterEach } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe(' CheckIn UseCase Test', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Deve ser possivel realizar a validação de um checkIn.', async () => {
    const checkInCreate = await checkInRepository.create({
      gym_id: 'Gym test',
      user_id: 'User Test',
    })

    const { checkIn } = await sut.execute({
      checkInId: checkInCreate.id,
    })

    console.log(checkIn)

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('Não deve ser possivel validar um checkIn inexistente.', async () => {
    expect(async () => {
      await sut.execute({
        checkInId: 'check-inexistent',
      })
    }).rejects.toBeInstanceOf(ResoucerNotFoundError)
  })

  it('Não deve ser possivel validar um checkIn existente a mais de 20 minutos.', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 14, 20))

    const checkInCreate = await checkInRepository.create({
      gym_id: 'Gym test',
      user_id: 'User Test',
    })

    const twentyOneMinuteToMillisecond = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinuteToMillisecond)

    expect(async () => {
      await sut.execute({
        checkInId: checkInCreate.id,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
