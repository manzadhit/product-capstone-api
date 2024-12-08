const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const mealController = require("../controllers/meal.controller");

router
  .route("/")
  .post(authenticateJwt, mealController.createMeal)
  .get(authenticateJwt, checkRole("admin"), mealController.getAllMeals);

router
  .route("/nutrition")
  .get(authenticateJwt, mealController.getMealsByFoodName);

router
  .route("/:mealId")
  .get(authenticateJwt, mealController.getMealById)
  .put(authenticateJwt, mealController.updateMeal)
  .delete(authenticateJwt, mealController.deleteMeal);

module.exports = router;
