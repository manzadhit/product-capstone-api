const { mealHistoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

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

const searchMealHistories = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { meal_type, date } = req.query;

  if (!meal_type && !date) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Query parameter 'meal_type' or 'date' is required."
    );
  }

  let mealsHistories;

  if (date && meal_type) {
    mealsHistories = await mealHistoryService.getMealHistoriesByDateAndMealType(
      userId,
      date,
      meal_type
    );
  } else if (meal_type) {
    // Panggil layanan untuk filter berdasarkan meal_type
    mealsHistories = await mealHistoryService.getMealHistoriesByMealType(
      userId,
      meal_type
    );
  } else if (date) {
    // Panggil layanan untuk filter berdasarkan date
    mealsHistories = await mealHistoryService.getMealHistoriesByDate(
      userId,
      date
    );
  }

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch Meals Histories Success",
    data: mealsHistories,
  });
});

const deleteHistory = catchAsync(async (req, res) => {
  const { historyId } = req.params;
  const result = await mealHistoryService.deleteHistories(historyId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: result.message,
  });
});

module.exports = {
  createMealHistory,
  addMealManual,
  searchMealHistories,
  deleteHistory,
};
