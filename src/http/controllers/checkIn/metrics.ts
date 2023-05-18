import { makeGetUserMetricUseCase } from '@/use-case/factories/make-get-user-metric-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metricsCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const metricsCheckInUseCase = makeGetUserMetricUseCase()

  const { checkInMetrics } = await metricsCheckInUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInMetrics,
  })
}
