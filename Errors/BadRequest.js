import custom_error_handler from "./custom-error-handler.js";
import { StatusCodes } from "http-status-codes";

class BadRequest extends custom_error_handler {
  constructor(message, isOperational = false) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = "BadRequest";
    this.message = message;
    this.statusCode = StatusCodes.NOT_FOUND;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default BadRequest;
