import { makeFetchNearByGymsUseCase } from '@/use-case/factories/make-fetch-nearBy-gyms-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsBodyBySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsBodyBySchema.parse(request.query)

  const nearbyGymsUseCase = makeFetchNearByGymsUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
