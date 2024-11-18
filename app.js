require("dotenv").config();

const express = require("express");
const multer = require("multer");
const config = require("./src/utils/config");
const routes = require("./src/routes/index");

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const upload = multer();
app.use(upload.none());

// API routes
app.use(routes);

app.get("/", (req, res) => {
  res.send(`Hello World! Running in ${config.app.env} mode`);
});

const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
