require("dotenv").config();

const express = require("express");
const config = require("./src/utils/config");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = config.app.port || 3000;
app.listen(PORT, config.app.host, () => {
  console.log(`App listening on http://${config.app.host}:${config.app.port}`);
});
