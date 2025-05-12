import sendMailToAdminIfCritical from "../utils/sendMailToAdminIfCritical.js";
import AppError  from "./custom-error-handler.js";

class ErrorHandler {
  async handleError(err) {
    await sendMailToAdminIfCritical(err);
     console.log("err",err)
  }

  isTrustedError(error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export default ErrorHandler;
