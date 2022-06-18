export class ServerError extends Error {
  constructor(stack: string) {
    super()
    this.message = 'Internal Server Error'
    super.name = 'ServerError',
      super.stack = stack
  }
}
