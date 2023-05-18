import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const user = await request(app.server).post('/users').send({
    name: 'Igor Inacio',
    email: 'email@test.com',
    password: '123456',
  })

  const authVerify = await request(app.server).post('/sessions').send({
    email: 'email@test.com',
    password: '123456',
  })

  const { token } = authVerify.body

  return {
    token,
    user,
  }
}
