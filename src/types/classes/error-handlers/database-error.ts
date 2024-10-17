import mongoose from "mongoose";
import { AppError } from "./app-error";

export class DatabaseError extends AppError {
  public operation: string;
  public details?: object;

  constructor(message: string, operation: string, error: mongoose.Error) {
    super(message, 500, { errorType: "DatabaseError", errorCode: "DB_ERR" });
    this.operation = operation;
    this.checkError(error);
  }

  private checkError(error: mongoose.Error) {
    if (error instanceof mongoose.Error.ValidationError) {
      this.statusCode = 400;
      this.errorCode = "DB_VALIDATION_ERR";
      this.details = this.parseValidationError(error);
    } else if (error instanceof mongoose.Error.CastError) {
      this.statusCode = 400;
      this.errorCode = "DB_CAST_ERR";
      this.details = { field: error.path, value: error.value };
    } else if (
      error instanceof mongoose.mongo.MongoError &&
      error.code === 11000
    ) {
      this.statusCode = 409;
      this.errorCode = "DB_DUPLICATE_KEY_ERR";
    } else {
      this.details = {
        message:
          error instanceof Error ? error.message : "Unknown database error",
      };
    }
  }

  private parseValidationError(
    error: mongoose.Error.ValidationError
  ): Record<string, string> {
    const errors: Record<string, string> = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return errors;
  }
}
