require("dotenv").config();

const config = require("./src/utils/config");

console.log(config.jwt.secret);
