const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const checkRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    return next();
  }
  throw new ApiError(
    httpStatus.FORBIDDEN,
    `Access denied. You must be an ${role} to access this route.`
  );
};

module.exports = checkRole;
