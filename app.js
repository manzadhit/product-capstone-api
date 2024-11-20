require("dotenv").config();

const express = require("express");
const multer = require("multer");
const httpStatus = require("http-status");
const helmet = require("helmet");
const config = require("./src/utils/config");
const routes = require("./src/routes/index");
const errorHandler = require("./src/middlewares/errorHandler");
const ApiError = require("./src/utils/ApiError");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const upload = multer();
app.use(upload.none());

// API routes
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// error handling
app.use(errorHandler);

const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
