import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel retornar o perfil do usuario', async () => {
    await request(app.server).post('/users').send({
      name: 'Igor Inacio',
      email: 'email@test.com',
      password: '123456',
    })

    const autResponse = await request(app.server).post('/sessions').send({
      email: 'email@test.com',
      password: '123456',
    })

    const { token } = autResponse.body

    const profile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profile.statusCode).toEqual(200)
    expect(profile.body.user).toEqual(
      expect.objectContaining({
        email: 'email@test.com',
      }),
    )
  })
})
