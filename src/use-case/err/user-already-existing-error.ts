export class UsersAlreadyExistErro extends Error {
  constructor() {
    super('❌ User already exists with this email ❌')
  }
}
