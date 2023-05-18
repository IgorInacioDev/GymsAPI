import { verifyJWS } from '@/http/middlewares/verify-jws'
import { FastifyInstance } from 'fastify'
import { createCheckIn } from './create'
import { validateCheckIn } from './validate'
import { historyCheckIn } from './history'
import { metricsCheckIn } from './metrics'
import { veirfyUserRole } from '@/http/middlewares/only-adm'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWS)

  // POST ROUTES
  app.post('/user/gym/checkIn/:gymId', createCheckIn)

  // PATCH ROUTES
  app.patch(
    '/gym/checkIn/user',
    { onRequest: [veirfyUserRole('ADMIN')] },
    validateCheckIn,
  )

  // GET ROUTES
  app.get('/user/checkIn', historyCheckIn)
  app.get('/user/checkIn/metrics', metricsCheckIn)
}
