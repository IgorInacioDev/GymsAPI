import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym'
import { SearchGymsUseCase } from '@/use-case/gym/get-gyms'
import { beforeEach, expect, describe, it } from 'vitest'

describe('Get Gym UseCase Test', () => {
  let gymsRepository: InMemoryGymRepository
  let sut: SearchGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Deve ser possivel buscar por academias passando uma string', async () => {
    await gymsRepository.create({
      title: `JavaScript Gym`,
      description: null,
      phone: null,
      latitude: -23.0080615,
      longitude: -43.3006575,
    })

    await gymsRepository.create({
      title: `TypeScript Gym`,
      description: null,
      phone: null,
      latitude: -23.0080615,
      longitude: -43.3006575,
    })

    const { gyms } = await sut.execute({
      page: 1,
      query: 'JavaScript',
    })

    console.log(gyms)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })

  it('Deve ser possivel buscar por academias passando uma string e definir a pagina de retorno', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    console.log(gyms)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
