import { makeFetchUserCheckInHistoryUseCase } from '@/use-case/factories/make-fetch-user-check-in-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function historyCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const historyCheckInBySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInBySchema.parse(request.query)

  const historyCheckInUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await historyCheckInUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
