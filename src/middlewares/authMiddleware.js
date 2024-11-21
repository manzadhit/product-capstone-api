const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user || info) {
      const errorMessage = info?.message || "Please login/register";
      return next(new ApiError(httpStatus.UNAUTHORIZED, errorMessage));
    }

    req.user = user;

    // Cek jika pengguna hanya boleh mengakses data mereka sendiri
    if (req.params.userId && req.params.userId !== user.id && user.role !== "admin") {
      return next(
        new ApiError(
          httpStatus.FORBIDDEN,
          "You can only access your own resource"
        )
      );
    }

    next();
  })(req, res, next);
};

module.exports = {
  authenticateJwt,
};
