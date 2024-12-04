const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middlewares/authMiddleware");
// const checkRole = require("../middlewares/roleMiddleware");
const mealHistoryController = require("../controllers/mealHistory.controller");

router
  .route("/")
  .post(authenticateJwt, mealHistoryController.createMealHistory);

router.post("/manual", authenticateJwt, mealHistoryController.addMealManual);

router
  .route("/search")
  .get(authenticateJwt, mealHistoryController.getMealHistoriesByMealType);

module.exports = router;
