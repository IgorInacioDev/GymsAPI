import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearByGymsUseCase } from '../gym/fetch-nearBy-gyms'

export function makeFetchNearByGymsUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new FetchNearByGymsUseCase(gymRepository)

  return useCase
}
