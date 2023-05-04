import { Gym } from '@prisma/client'
import { ResoucerNotFoundError } from '../err/resoucer-not-found'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    if (!gyms) {
      throw new ResoucerNotFoundError()
    }
    return { gyms }
  }
}
