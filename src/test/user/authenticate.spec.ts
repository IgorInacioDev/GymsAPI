import { InvalidCredentialError } from '@/use-case/err/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUserUseCase } from '@/use-case/user/authenticate'
import { hash } from 'bcryptjs'
import { beforeEach, expect, describe, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate UseCase Test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  /// //////////////////////////////////////////////////////////////

  it('É possivel autenticar o usuario dentro do banco de dados?', async () => {
    const { name, email, password } = {
      email: 'email@teste.com',
      name: 'teste',
      password: '123456',
    }

    await usersRepository.create({
      email,
      name,
      password_hash: await hash('123456', 6),
    })

    const authenticate = await sut.execute({
      email,
      password,
    })

    expect(authenticate.user.id).toEqual(expect.any(String))
  })
  /// //////////////////////////////////////////////////////////////

  it('Deverar retorar error ao usar email inexistente.', async () => {
    await usersRepository.create({
      email: 'email@teste.com',
      name: 'teste',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'email@error.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  /// ///////////////////////////////////////////////////////////////
  it('Deverar retorar error ao usar senha incorreta.', async () => {
    await usersRepository.create({
      email: 'email@teste.com',
      name: 'teste',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'email@teste.com',
        password: 'error123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
