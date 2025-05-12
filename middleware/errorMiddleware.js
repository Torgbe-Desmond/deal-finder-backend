import ErrorResponse from "../utils/ErrorResponse.js";
const errorMiddleware = (err, req, res, next) => {
  // if(err.)
  console.log('error',err.name,err)
  const errorObject = new ErrorResponse(err);
  res.status(errorObject.error.code).json(errorObject);
};

export default errorMiddleware;
