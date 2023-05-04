import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { GetUserMetricsUseCase } from '../user/get-user-metric'

export function makeGetUserMetricUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(checkInRepository)

  return useCase
}
