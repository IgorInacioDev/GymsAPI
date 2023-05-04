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

  it('Deve ser possivel registrar um usuario', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Igor Inacio',
      email: 'email@test.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
