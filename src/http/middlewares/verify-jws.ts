import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWS(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch {
    return reply.status(401).send({
      message: 'Unauthozied',
    })
  }
}
