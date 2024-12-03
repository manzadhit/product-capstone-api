const { v4: uuidv4 } = require("uuid");
const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createMeal = async (meal, userId) => {
  const mealsSnapshot = await db
    .collection("meals")
    .where("Food Name", "==", meal["Food Name"])
    .get();

  if (!mealsSnapshot.empty) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Food Name already exists");
  }

  const mealsCollection = db.collection("meals");
  const mealId = uuidv4();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const docRef = mealsCollection.doc(mealId);
  const data = { ...meal, createdAt, updatedAt, userId };
  await docRef.set(data);

  return { id: docRef.id, ...data };
};


const getAllMeals = async () => {
  const snapshot = await db.collection("meals").get();
  const meals = [];
  snapshot.forEach((doc) => {
    meals.push({ id: doc.id, ...doc.data() });
  });
  return meals;
};

const getMealById = async (mealId) => {
  const docRef = db.collection("meals").doc(mealId);
  const doc = await docRef.get();
  
  if (!doc.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Meal Not Found");
  }

  return { id: doc.id, ...doc.data() };
};

const updateMeal = async (mealId, updatedData, userId) => {
  const docRef = db.collection("meals").doc(mealId);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Meal Not Found");
  }

  const mealData = existingDoc.data();
  if (mealData.userId !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this meal"
    );
  }

  const updatedAt = new Date().toISOString();
  const dataToUpdate = { ...updatedData, updatedAt };

  await docRef.update(dataToUpdate);

  return { id: docRef.id, ...dataToUpdate };
};

const deleteMeal = async (mealId, userId) => {
  const docRef = db.collection("meals").doc(mealId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Meal Not Found");
  }

  const mealData = existingDoc.data();
  if (mealData.userId !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this meal"
    );
  }

  await docRef.delete();
  return { message: "Meal deleted successfully" };
};


module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
