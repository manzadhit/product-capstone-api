require("dotenv").config();

const express = require("express");
const multer = require("multer");
const config = require("./src/utils/config");
const routes = require("./src/routes/index");

const app = express();
const upload = multer();

// Tentukan environment
const ENV = process.env.NODE_ENV || "development";

// Konfigurasi port berdasarkan environment
const PORT = config.app.port;

// Konfigurasi host
const HOST = ENV === "production" ? "0.0.0.0" : "localhost";

// Middleware
app.use(express.json());
app.use(upload.none());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World1");
});

// Logging untuk debugging
console.log(`
  Environment: ${ENV}
  Port: ${PORT}
  Host: ${HOST}
`);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`App listening on http://${HOST}:${PORT}`);
});
