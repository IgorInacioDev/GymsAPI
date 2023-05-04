import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { CheckInUseCase } from '../checkIn/checkin'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymRepository)

  return useCase
}
