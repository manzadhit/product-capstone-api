const passport = require("passport");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

// Fungsi authenticateJwt yang sudah ada
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

// Fungsi tambahan dari langkah 11 untuk verifikasi JWT langsung
const verifyJwtToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, "Authorization token missing or invalid")
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // Cek jika pengguna hanya boleh mengakses data mereka sendiri
    if (req.params.userId && req.params.userId !== decoded.id && decoded.role !== "admin") {
      return next(
        new ApiError(
          httpStatus.FORBIDDEN,
          "You can only access your own resource"
        )
      );
    }

    next();
  } catch (err) {
    console.error(err); // Log detail error ke console (opsional)
    return next(new ApiError(httpStatus.FORBIDDEN, err.message || "Invalid or expired token"));
  }
};

module.exports = {
  authenticateJwt,
  verifyJwtToken, // Export fungsi tambahan
};
