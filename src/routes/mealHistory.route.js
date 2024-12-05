const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middlewares/authMiddleware");
// const checkRole = require("../middlewares/roleMiddleware");
const mealHistoryController = require("../controllers/mealHistory.controller");

router.post("/", authenticateJwt, mealHistoryController.createMealHistory);
router.post("/manual", authenticateJwt, mealHistoryController.addMealManual);
router.get("/search", authenticateJwt, mealHistoryController.searchMealHistories);

router
  .route("/:historyId")
  .delete(authenticateJwt, mealHistoryController.deleteHistory);

module.exports = router;
