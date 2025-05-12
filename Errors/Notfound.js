import custom_error_handler from "./custom-error-handler.js";
import { StatusCodes } from "http-status-codes";

class NotFound extends custom_error_handler {
  constructor(message = "Resource not found", isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'NotFound';
    this.message = message;
    this.statusCode = StatusCodes.NOT_FOUND;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFound;
