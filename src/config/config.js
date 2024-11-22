require("dotenv").config();

const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  bucket: {
    bucketName: process.env.BUCKET,
  },
};

module.exports = config;
