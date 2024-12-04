const { mealHistoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
// const ApiError = require("../utils/ApiError");

const createMealHistory = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { mealIds } = req.body;

  const mealHistory = await mealHistoryService.createOrUpdateMealHistory(
    userId,
    mealIds
  );

  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Meal History Success",
    data: mealHistory,
  });
});

const addMealManual = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const meal = await mealHistoryService.addMealManual(userId, req.body);
  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Add Meal Success",
    data: meal,
  });
});

const getMealHistoriesByMealType = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { meal_type } = req.query;
  const mealsHistories = await mealHistoryService.getMealHistoriesByMealType(userId, meal_type);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch Meals Histories by Meal Type Success",
    data: mealsHistories,
  });
});

module.exports = {
  createMealHistory,
  addMealManual,
  getMealHistoriesByMealType,
};