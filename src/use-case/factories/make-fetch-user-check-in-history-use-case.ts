import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { FetchUserCheckInHistoryUseCase } from '../checkIn/fetch-user-check-ins-history'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(checkInRepository)

  return useCase
}
