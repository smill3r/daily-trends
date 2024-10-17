import { ServerResponse } from "http";
import { AppError } from "../types/classes/error-handlers/app-error";
import { AuthorizationError } from "../types/classes/error-handlers/authorization-error";
import { DatabaseError } from "../types/classes/error-handlers/database-error";
import { ValidationError } from "../types/classes/error-handlers/validation-error";
import { ErrorResponse } from "../types/interfaces/errors";

export class BaseController {
  protected handleError(error: unknown, res: ServerResponse): void {
    if (error instanceof AppError) {
      const errorResponse = this.formatErrorResponse(error);
      res.statusCode = errorResponse.error.statusCode;
      res.end(JSON.stringify(errorResponse));
    } else {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          statusCode: 500,
          message: "Internal Server Error",
          errorType: "InternalError",
          details: {errorDetails: error}
        },
      };

      res.statusCode = 500;
      res.end(JSON.stringify(errorResponse));
    }
  }

  protected formatErrorResponse(error: AppError): ErrorResponse {
    let errorDetails;

    if (error instanceof ValidationError) {
      errorDetails = { invalidFields: error.invalidFields };
    } else if (error instanceof DatabaseError) {
      errorDetails = error.details;
    } else if (error instanceof AuthorizationError) {
      errorDetails = { message: "Insufficient permissions" };
    }

    return {
      success: false,
      error: {
        statusCode: error.statusCode,
        message: error.message,
        errorType: error.errorType,
        errorCode: error.errorCode,
        details: errorDetails,
      },
    };
  }
}
