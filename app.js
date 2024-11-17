require("dotenv").config();

const express = require("express");
const config = require("./src/utils/config");
const routes = require("./src/routes/index");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World1");
});

const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
