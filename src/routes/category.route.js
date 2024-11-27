const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const categoryController = require("../controllers/category.controller");

router
  .route("/")
  .post(authenticateJwt, checkRole("admin"), categoryController.createCategory)
  .get(authenticateJwt, categoryController.getAllCategories);

router
  .route("/:categoryId")
  .get(authenticateJwt, categoryController.getCategoryById)
  .put(authenticateJwt, checkRole("admin"), categoryController.updateCategory)
  .delete(
    authenticateJwt,
    checkRole("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
