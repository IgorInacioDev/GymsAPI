import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym'
import { CreateGymUseCase } from '@/use-case/gym/create-gym'
import { beforeEach, expect, describe, it } from 'vitest'

describe('Gym UseCase Test', () => {
  let inMemoryGymRepository: InMemoryGymRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(inMemoryGymRepository)
  })

  it('Deve ser possivel Cadastrar uma cademia.', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Test',
      description: null,
      phone: null,
      latitude: -23.0080615,
      longitude: -43.3006575,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
