import { FastifyInstance } from 'fastify'
import { verifyJWS } from '../../middlewares/verify-jws'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticate */
  app.get('/me', { onRequest: verifyJWS }, profile)
}
