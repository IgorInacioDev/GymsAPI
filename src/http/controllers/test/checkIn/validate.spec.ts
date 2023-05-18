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

  it('Deve ser possivel validar um checkIn', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        latitude: -20.25145,
        longitude: -47.2562,
        title: 'Gym JavaScript',
      },
    })

    const createCheckIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch('/gym/checkIn/user')
      .set('Authorization', `Bearer ${token}`)
      .query({
        checkInId: createCheckIn.id,
      })
      .send()

    const checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: createCheckIn.id,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
