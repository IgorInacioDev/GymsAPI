import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/createAndAuthenticateUser'

describe('Register e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel buscar academia passando um argumento de busca', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym JavaScript',
        description: 'teste gym',
        latitude: -20.25145,
        longitude: -47.2562,
        phone: '1198547112',
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym TypeScript',
        description: 'teste gym',
        latitude: -20.25145,
        longitude: -47.2562,
        phone: '1198547112',
      })

    const response = await request(app.server)
      .get('/gym')
      .set('Authorization', `Bearer ${token}`)
      .query({
        q: 'JavaScript',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym JavaScript',
      }),
    ])
  })
})
