import { CheckIn } from '@prisma/client'
import { ResoucerNotFoundError } from '../err/resoucer-not-found'
import { CheckInRepository } from '@/repositories/checkin-repository'

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    if (!checkIns) {
      throw new ResoucerNotFoundError()
    }
    return { checkIns }
  }
}
