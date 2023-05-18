import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/createAndAuthenticateUser'
import { prisma } from '@/lib/prisma'

describe('Register e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Deve ser possivel criar um checkIn', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        latitude: -20.25145,
        longitude: -47.2562,
        title: 'Gym JavaScript',
      },
    })
    const user = await prisma.user.findFirstOrThrow()

    const response = await request(app.server)
      .post(`/user/gym/checkIn/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user.id,
        userLatitude: -20.25145,
        userLongitude: -47.2562,
      })

    expect(response.statusCode).toEqual(201)
  })
})
