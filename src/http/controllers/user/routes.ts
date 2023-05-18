import { FastifyInstance } from 'fastify'
import { verifyJWS } from '../../middlewares/verify-jws'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from '../token/refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token', refresh)

  /** Authenticate */
  app.get('/me', { onRequest: verifyJWS }, profile)
}
