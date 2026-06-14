export class AppError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AppError";
  }
}

export class HttpError extends AppError {
  constructor(message?: string) {
    super(message);
    this.name = "HttpError";
  }
}
