const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const checkRole = (role) => (req, res, next) => {
  const { user } = req;

  if (user.role === role) {
    return next();
  }

  return next(
    new ApiError(
      httpStatus.FORBIDDEN,
      "Access denied. You are not authorized to access this resource."
    )
  );
};

module.exports = checkRole;
