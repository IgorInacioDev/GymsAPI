import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user.sub

  try {
    const profileUseCase = makeGetUserProfileUseCase()

    const { user } = await profileUseCase.execute({ userId: id })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch {
    return reply.status(404).send()
  }
}
