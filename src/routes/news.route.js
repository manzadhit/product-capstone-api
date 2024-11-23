const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerUpload");
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const newsController = require("../controllers/newsController");

router
  .route("/")
  .post(
    authenticateJwt,
    checkRole("admin"),
    upload.single("image"),
    newsController.createNews
  );

module.exports = router;
