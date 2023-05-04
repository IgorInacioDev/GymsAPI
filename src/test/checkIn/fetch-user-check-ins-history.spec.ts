import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-chekIn-repository'
import { FetchUserCheckInHistoryUseCase } from '@/use-case/checkIn/fetch-user-check-ins-history'
import { beforeEach, expect, describe, it } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Featch User CheckIn UseCase Test', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInHistoryUseCase(checkInRepository)
  })

  it('Deve ser possivel retornar os chekins de um usuario', async () => {
    await checkInRepository.create({
      gym_id: 'id_1',
      user_id: 'user_id',
    })

    await checkInRepository.create({
      gym_id: 'id_2',
      user_id: 'user_id',
    })

    const { checkIns } = await sut.execute({
      userId: 'user_id',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
  })

  it('Deve ser possivel retornar os checkins de um usuario com no maximo 20 objetos por paginas', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-id',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
