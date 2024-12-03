const { mealService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createMeal = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const meal = await mealService.createMeal(req.body, userId);
  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Meal Success",
    data: meal,
  });
});

const getAllMeals = catchAsync(async (req, res) => {
  const meals = await mealService.getAllMeals();
  const count = meals.length;
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch All Meals Success",
    count,
    data: meals,
  });
});

const getMealById = catchAsync(async (req, res) => {
  const { mealId } = req.params;
  const meal = await mealService.getMealById(mealId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch Meal Success",
    data: meal,
  });
});

const updateMeal = catchAsync(async (req, res) => {
  const { mealId } = req.params;
  const updatedData = req.body;
  const userId = req.user.id; 
  const updatedMeal = await mealService.updateMeal(mealId, updatedData, userId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Meal Success",
    data: updatedMeal,
  });
});

const deleteMeal = catchAsync(async (req, res) => {
  const { mealId } = req.params;
  const userId = req.user.id;
  const result = await mealService.deleteMeal(mealId, userId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: result.message,
  });
});

const getMealsByFoodName = catchAsync(async (req, res) => {
  const { food } = req.query; 
  if (!food) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Food Name is required");
  }
  const meals = await mealService.getMealsByFoodName(food);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch Meals by Food Name Success",
    data: meals,
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMealsByFoodName,
};
