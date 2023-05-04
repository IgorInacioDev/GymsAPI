export class LateCheckInValidateError extends Error {
  constructor() {
    super('❌ Check in has already expired ❌')
  }
}
