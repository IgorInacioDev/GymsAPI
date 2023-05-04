import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResoucerNotFoundError } from '@/use-case/err/resoucer-not-found'
import { GetUserProfileUseCase } from '@/use-case/user/get-user-profile'
import { hash } from 'bcryptjs'
import { beforeEach, expect, describe, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile UseCase Test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  /// ////////////////////////////////////////////////////////////////////
  it('Deverar ser possivel buscar e retornar o usuario.', async () => {
    const createUser = await usersRepository.create({
      email: 'email@teste.com',
      name: 'teste',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })
    expect(user.name).toEqual('teste')
  })

  it('Caso o id informado seja errado ou inexistente deverar retorar um error', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'IdTest',
      })
    }).rejects.toBeInstanceOf(ResoucerNotFoundError)
  })
})
