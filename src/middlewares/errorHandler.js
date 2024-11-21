const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;

  // Jika error berasal dari axios
  if (error.isAxiosError && error.response) {
    const message =
      error.response.data.message || error.response.data || "Axios Error";
    const statusCode =
      error.response.status || httpStatus.INTERNAL_SERVER_ERROR;
    error = new ApiError(statusCode, message, false, err.stack);
  } else if (!(error instanceof ApiError)) {
    // Global error handling
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.message || httpStatus[statusCode] || "Internal Server Error";
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  if (!(err instanceof ApiError)) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.status(statusCode).send({
    status: statusCode,
    message,
  });
};

module.exports = { errorHandler, errorConverter };
