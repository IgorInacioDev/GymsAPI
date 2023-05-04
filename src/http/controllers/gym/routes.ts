import { verifyJWS } from '@/http/middlewares/verify-jws'
import { FastifyInstance } from 'fastify'
import { createGym } from './create-gym'
import { searchGym } from './get-gym'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWS)

  app.post('/gym', createGym)
  app.get('/gym', searchGym)
}
