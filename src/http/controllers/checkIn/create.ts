import { makeCheckInUseCase } from '@/use-case/factories/make-checkin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInByParams = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInByParams.parse(request.params)

  const { userLatitude, userLongitude } = createCheckInBySchema.parse(
    request.body,
  )

  const createCheckInUseCase = makeCheckInUseCase()

  const { checkIn } = await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send({
    checkIn,
  })
}
