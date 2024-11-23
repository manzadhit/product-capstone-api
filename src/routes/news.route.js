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
  .get(newsController.getAllNews); // GET ALL NEWS (Users)

router.route("/title/:title").get(newsController.getNewsByTitle); // GET NEWS BY TITLE (Users)

router
  .route("/:newsId")
  .get(authenticateJwt, checkRole("admin"), newsController.getNewsById) // GET NEWS BY ID (Admin)
  .put(
    authenticateJwt,
    checkRole("admin"),
    upload.single("image"),
    newsController.updateNews
  ) // UPDATE NEWS (Admin)
  .delete(authenticateJwt, checkRole("admin"), newsController.deleteNews); // DELETE NEWS (Admin)

module.exports = router;
