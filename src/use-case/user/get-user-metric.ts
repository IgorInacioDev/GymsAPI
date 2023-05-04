import { ResoucerNotFoundError } from '../err/resoucer-not-found'
import { CheckInRepository } from '@/repositories/checkin-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInMetrics: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInMetrics = await this.checkInRepository.countByUserId(userId)

    if (!checkInMetrics) {
      throw new ResoucerNotFoundError()
    }

    return { checkInMetrics }
  }
}
