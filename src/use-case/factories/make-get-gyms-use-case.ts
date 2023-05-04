import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { SearchGymsUseCase } from '../gym/get-gyms'

export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new SearchGymsUseCase(gymRepository)

  return useCase
}
