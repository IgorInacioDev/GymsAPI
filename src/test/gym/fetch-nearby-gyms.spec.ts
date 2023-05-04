import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym'
import { FetchNearByGymsUseCase } from '@/use-case/gym/fetch-nearBy-gyms'
import { beforeEach, expect, describe, it } from 'vitest'

describe('Fetch Nearby Use Case Test', () => {
  let gymsRepository: InMemoryGymRepository
  let sut: FetchNearByGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('Só deve ser possivel retornar as academias com no maximo 10km de distancia', async () => {
    await gymsRepository.create({
      title: `Near Gym`,
      description: null,
      phone: null,
      latitude: -23.0079825,
      longitude: -43.3004858,
    })

    await gymsRepository.create({
      title: `Far Gym`,
      description: null,
      phone: null,

      latitude: -27.0079825,
      longitude: -43.3004858,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.0079825,
      userLongitude: -43.3004858,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
