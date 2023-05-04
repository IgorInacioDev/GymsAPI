import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '@/use-case/user/register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersAlreadyExistErro } from '@/use-case/err/user-already-existing-error'

describe('Register UseCase test', () => {
  it('É possivel criar um usuario.', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      email: 'email@teste.com',
      name: 'teste',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Não deve ser possivel criar um usuario com o mesmo email.', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'email@te2ste.com'

    await registerUseCase.execute({
      email,
      name: 'teste',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        email,
        name: 'teste',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UsersAlreadyExistErro)
  })

  it('A senha informada esta sendo convertida para hash?', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      email: 'email@teste.com',
      name: 'teste',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
