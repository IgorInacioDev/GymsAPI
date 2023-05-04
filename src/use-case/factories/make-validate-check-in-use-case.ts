import { ValidateCheckInUseCase } from '../checkIn/validate-check-in'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}
