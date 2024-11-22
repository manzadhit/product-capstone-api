const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerUpload");
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const { createNews } = require("../controllers/newsController");

router.post(
  "/",
  authenticateJwt,
  checkRole("admin"),
  upload.single("image"),
  createNews
);

module.exports = router;
