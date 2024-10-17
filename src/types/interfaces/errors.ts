export interface AppErrorOptions {
  errorCode?: string;
  errorType?: string;
  isOperational?: boolean;
}

export interface ErrorResponse {
    success: boolean;
    error: {
      statusCode: number;
      message: string;
      errorType?: string;
      errorCode?: string;
      details?: object;
    };
  }