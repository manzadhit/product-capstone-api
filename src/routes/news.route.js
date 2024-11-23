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
  )
  .get(authenticateJwt, newsController.getAllNews);

router
  .route("/title/:title")
  .get(authenticateJwt, newsController.getNewsByTitle);

router
  .route("/:newsId")
  .get(authenticateJwt, checkRole("admin"), newsController.getNewsById)
  .put(
    authenticateJwt,
    checkRole("admin"),
    upload.single("image"),
    newsController.updateNews
  )
  .delete(authenticateJwt, checkRole("admin"), newsController.deleteNews);

module.exports = router;
