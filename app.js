require("dotenv").config();

const express = require("express");
const multer = require("multer");
const config = require("./src/utils/config");
const routes = require("./src/routes/index");


const app = express();
const upload = multer();

// parse json request body
app.use(express.json());
app.use(upload.none());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World1");
});

const PORT = config.app.port || 3000;
const ENV = process.env.NODE_ENV || "development";

// Host berdasarkan environment
const HOST = ENV === "production" ? "0.0.0.0" : "localhost";
app.listen(PORT, HOST, () => {
  console.log(`App listening on http://${HOST}:${config.app.port}`);
});
