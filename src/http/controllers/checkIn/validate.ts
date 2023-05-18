import { makeValidateCheckInUseCase } from '@/use-case/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInBySchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInBySchema.parse(request.query)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(200).send({
    checkIn,
  })
}
