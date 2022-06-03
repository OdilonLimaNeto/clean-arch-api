export class ServerError extends Error {
  constructor() {
    super(`Internal Server Error`);
    super.name = "ServerError";
  }
}
