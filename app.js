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
const PORT =
  ENV === "production"
    ? process.env.PORT || 8080 // Production
    : config.app.port || 3000; // Development

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


// Start server
app.listen(PORT, HOST, () => {
  console.log(`App listening on http://${HOST}:${PORT}`);
});
