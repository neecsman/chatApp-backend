export default class ErrorService extends Error {
  status: number;
  errors: unknown;

  constructor(status: number, message: string, errors: unknown = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ErrorService(401, "Пользователь не авторизован");
  }

  static BadRequest(message: string, errors: unknown = []) {
    return new ErrorService(400, message, errors);
  }
}
