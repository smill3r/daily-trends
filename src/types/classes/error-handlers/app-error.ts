import { AppErrorOptions } from "../../interfaces/errors";

export class AppError extends Error {
  public statusCode: number;
  public errorCode?: string;
  public errorType?: string;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    options: AppErrorOptions = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = options.errorCode;
    this.errorType = options.errorType || "ApplicationError";
    this.isOperational = options.isOperational ?? true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}