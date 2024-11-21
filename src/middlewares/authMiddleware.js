const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user || info) {
      return next(
        new ApiError(
          httpStatus.UNAUTHORIZED,
          info?.message || "Please login/register"
        )
      );
    }

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = {
  authenticateJwt,
};
