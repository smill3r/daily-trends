import { AppError } from "./app-error";

export class ValidationError extends AppError {
  public invalidFields: string[];

  constructor(message: string, invalidFields: string[]) {
    super(message, 400, { errorType: "ValidationError" });
    this.invalidFields = invalidFields;
  }
}
