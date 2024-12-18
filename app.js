require("dotenv").config();

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
const { jwtStrategy } = require("./src/config/passport");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
passport.use("jwt", jwtStrategy);
app.use(passport.initialize());

// Gunakan rute utama aplikasi
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// error handling
app.use(errorConverter);
app.use(errorHandler);

// Start the server
const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
