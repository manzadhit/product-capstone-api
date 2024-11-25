require("dotenv").config();
require("./src/config/passport-config"); // Import konfigurasi Passport Google

const express = require("express");
const httpStatus = require("http-status");
const helmet = require("helmet");
const passport = require("passport");
const config = require("./src/config/config");
const routes = require("./src/routes/index");
const {
  errorHandler,
  errorConverter,
} = require("./src/middlewares/errorHandler");
const ApiError = require("./src/utils/ApiError");
const jwtStrategy = require("./src/config/passport");

const app = express();

// Middleware
app.use(passport.initialize());

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Gunakan strategi JWT Passport (sudah ada di konfigurasi Anda)
passport.use("jwt", jwtStrategy);

// API routes
app.use(routes);

// Tambahkan rute autentikasi Google
const authRoutes = require("./src/routes/auth.route"); // Import rute autentikasi
app.use("/auth", authRoutes); // Pasang rute untuk autentikasi di prefix "/auth"

// Send back a 404 error for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Error handling middleware
app.use(errorConverter);
app.use(errorHandler);

// Jalankan server
const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
