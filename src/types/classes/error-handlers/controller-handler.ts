import { ServerResponse } from "http";
import { MongooseError } from "mongoose";
import MongooseErrorHandler from "./mongoose-error-handler";

export default class ControllerHandler {
  constructor() {}
  protected catchError(err: unknown, res: ServerResponse) {
    const errorResponse = MongooseErrorHandler.handleError(
      err as MongooseError
    );
    res.statusCode = errorResponse.status;
    res.end(JSON.stringify(errorResponse));
  }
}
