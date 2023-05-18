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

  it('Deve ser possivel reAutorizar um token JWT', async () => {
    await request(app.server).post('/users').send({
      name: 'Igor Inacio',
      email: 'email@test.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'email@test.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    console.log(authResponse.statusCode)

    const response = await request(app.server)
      .patch('/token')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
