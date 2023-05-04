import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-chekIn-repository'
import { GetUserMetricsUseCase } from '@/use-case/user/get-user-metric'
import { beforeEach, expect, describe, it } from 'vitest'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Profile UseCase Test', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  /// ////////////////////////////////////////////////////////////////////
  it('Deverar ser possivel retornar a quantidade de checkins feitos pelo usuario.', async () => {
    await checkInRepository.create({
      gym_id: 'gym-id1',
      user_id: 'user-id',
    })

    await checkInRepository.create({
      gym_id: 'gym-id2',
      user_id: 'user-id',
    })

    const { checkInMetrics } = await sut.execute({
      userId: 'user-id',
    })

    expect(checkInMetrics).toEqual(2)
  })
})
