import mongoose, { Error as MongooseError } from 'mongoose';

export interface ErrorResponse {
  status: number;
  message: string;
  errors?: string[] | string;
}

class MongooseErrorHandler {
  public static handleError(err: MongooseError): ErrorResponse {
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(err.errors).map((e) => e.message);
      return {
        status: 400,
        message: 'A validation error ocurred',
        errors,
      };
    }

    if (err instanceof mongoose.mongo.MongoError) {
      if (err.code === 11000) {
        return {
          status: 409,
          message: 'A duplicate key error ocurred',
          errors: err.message,
        };
      }
    }

    if (err instanceof mongoose.Error.CastError) {
      return {
        status: 400,
        message: `Invalid ${err.path}: ${err.value}`,
      };
    }

    return {
      status: 500,
      message: 'Internal server error',
      errors: err.message,
    };
  }
}

export default MongooseErrorHandler;
