import ErrorResponse from "../utils/ErrorResponse.js";
const errorMiddleware = (err, req, res, next) => {
  const errorObject = new ErrorResponse(err);
  res.status(errorObject.error.code).json(errorObject);
};

export default errorMiddleware;
