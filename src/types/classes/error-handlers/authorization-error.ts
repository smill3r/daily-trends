import { AppError } from "./app-error";

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message, 403, {
      errorType: "AuthorizationError",
      errorCode: "AUTH_ERR",
    });
  }
}
