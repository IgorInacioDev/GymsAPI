import { verifyJWS } from '@/http/middlewares/verify-jws'
import { FastifyInstance } from 'fastify'
import { createGym } from './create'
import { searchGym } from './searche'
import { nearbyGyms } from './nearby'
import { veirfyUserRole } from '@/http/middlewares/only-adm'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWS)

  // POST ROUTES
  app.post('/gym', { onRequest: [veirfyUserRole('ADMIN')] }, createGym)

  // GET ROUTES
  app.get('/gym', searchGym)
  app.get('/gym/nearby', nearbyGyms)
}
