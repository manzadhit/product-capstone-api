const { v4: uuidv4 } = require("uuid");
const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const mealService = require("./meal.service");

const roundToTwoDecimalPlaces = (value) => {
  return parseFloat(value.toFixed(2));
};

const calculateTotalNutritionAndLabel = (meals_details) => {
  const totalNutrition = {
    Calcium: 0,
    DietaryFiber: 0,
    Iron: 0,
    Protein: 0,
    VitaminA: 0,
    VitaminB: 0,
    VitaminC: 0,
    Carbohydrate: 0,
  };

  let totalCalories = 0;

  // Hitung total kalori dan nutrisi
  meals_details.forEach((meal) => {
    totalCalories += meal.Calories;
    for (const [key, value] of Object.entries(meal.nutritions)) {
      if (totalNutrition[key] !== undefined) {
        totalNutrition[key] += value;
      }
    }
  });

  // Pembulatan nilai total
  totalCalories = roundToTwoDecimalPlaces(totalCalories);
  for (const key in totalNutrition) {
    totalNutrition[key] = roundToTwoDecimalPlaces(totalNutrition[key]);
  }

  // Tentukan label berdasarkan nutrisi dominan (totalNutrition)
  const label = Object.keys(totalNutrition).reduce(
    (maxKey, key) =>
      totalNutrition[key] > (totalNutrition[maxKey] || 0) ? key : maxKey,
    null
  );

  return { totalCalories, totalNutrition, label };
};


const upsertMealHistory = async (
  historyCollection,
  existingHistoryDoc,
  userId,
  meal_type,
  date,
  meals_details
) => {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const { totalCalories, totalNutrition } =
    calculateTotalNutritionAndLabel(meals_details);

  if (existingHistoryDoc) {
    // Update existing history
    const existingData = existingHistoryDoc.data();

    const updatedTotalCalories = roundToTwoDecimalPlaces(
      existingData.total_calories + totalCalories
    );

    const updatedTotalNutrition = { ...existingData.total_nutrition };
    for (const [key, value] of Object.entries(totalNutrition)) {
      if (updatedTotalNutrition[key] !== undefined) {
        updatedTotalNutrition[key] = roundToTwoDecimalPlaces(
          updatedTotalNutrition[key] + value
        );
      }
    }

    // Hitung ulang label berdasarkan updatedTotalNutrition
    const label = Object.keys(updatedTotalNutrition).reduce(
      (maxKey, key) =>
        updatedTotalNutrition[key] > (updatedTotalNutrition[maxKey] || 0)
          ? key
          : maxKey,
      null
    );

    const updatedDetails = [...existingData.meals_details, ...meals_details];
    const count = updatedDetails.length;

    await historyCollection.doc(existingHistoryDoc.id).update({
      total_calories: updatedTotalCalories,
      total_nutrition: updatedTotalNutrition,
      meals_details: updatedDetails,
      updatedAt,
      count,
      label,
    });

    return {
      id: existingHistoryDoc.id,
      total_calories: updatedTotalCalories,
      total_nutrition: updatedTotalNutrition,
      meals_details: updatedDetails,
      count,
      label,
      userId,
      meal_type,
      date,
      createdAt: existingData.createdAt,
      updatedAt,
    };
  } else {
    // Create new history
    const label = Object.keys(totalNutrition).reduce(
      (maxKey, key) =>
        totalNutrition[key] > (totalNutrition[maxKey] || 0) ? key : maxKey,
      null
    );

    const historyId = uuidv4();
    const count = meals_details.length;

    const mealHistory = {
      total_calories: totalCalories,
      total_nutrition: totalNutrition,
      meals_details,
      userId,
      meal_type,
      date,
      createdAt,
      updatedAt,
      count,
      label,
    };

    await historyCollection.doc(historyId).set(mealHistory);

    return { id: historyId, ...mealHistory };
  }
};


const createOrUpdateMealHistory = async (userId, mealIds, meal_type) => {
  if (!mealIds || mealIds.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Meal IDs are required.");
  }

  const date = new Date().toISOString().split("T")[0];

  const historyCollection = db.collection("meals_histories");
  const existingHistoryQuery = await historyCollection
    .where("userId", "==", userId)
    .where("meal_type", "==", meal_type)
    .where("date", "==", date)
    .limit(1)
    .get();

  const meals_details = [];
  for (const mealId of mealIds) {
    const mealData = await mealService.getMealById(mealId);
    mealData.Calories = roundToTwoDecimalPlaces(mealData.Calories);
    for (const key in mealData.nutritions) {
      mealData.nutritions[key] = roundToTwoDecimalPlaces(
        mealData.nutritions[key]
      );
    }
    meals_details.push(mealData);
  }

  const existingHistoryDoc = !existingHistoryQuery.empty
    ? existingHistoryQuery.docs[0]
    : null;
  return upsertMealHistory(
    historyCollection,
    existingHistoryDoc,
    userId,
    meal_type,
    date,
    meals_details
  );
};

const addMealManual = async (userId, meal, meal_type) => {
  const date = new Date().toISOString().split("T")[0];

  const historyCollection = db.collection("meals_histories");
  const existingHistoryQuery = await historyCollection
    .where("userId", "==", userId)
    .where("meal_type", "==", meal_type)
    .where("date", "==", date)
    .limit(1)
    .get();

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  meal.Calories = roundToTwoDecimalPlaces(meal.Calories);
  for (const key in meal.nutritions) {
    meal.nutritions[key] = roundToTwoDecimalPlaces(meal.nutritions[key]);
  }
  meal.image = "";
  const mealWithMetadata = {
    ...meal,
    id: uuidv4(),
    userId,
    createdAt,
    updatedAt,
  };

  const meals_details = [mealWithMetadata];
  const existingHistoryDoc = !existingHistoryQuery.empty
    ? existingHistoryQuery.docs[0]
    : null;

  return upsertMealHistory(
    historyCollection,
    existingHistoryDoc,
    userId,
    meal_type,
    date,
    meals_details
  );
};


const getMealHistoriesByMealType = async (userId, mealType) => {
  const historyCollection = db.collection("meals_histories");

  const querySnapshot = await historyCollection
    .where("userId", "==", userId)
    .where("meal_type", "==", mealType)
    .get();

  if (querySnapshot.empty) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `No meal histories found for meal type "${mealType}"`
    );
  }

  const histories = [];
  querySnapshot.forEach((doc) => {
    histories.push({ id: doc.id, ...doc.data() });
  });

  return histories;
};

const getMealHistoriesByDate = async (userId, date) => {
  const historyCollection = db.collection("meals_histories");

  // Query data berdasarkan userId dan tanggal
  const querySnapshot = await historyCollection
    .where("userId", "==", userId)
    .where("date", "==", date)
    .get();

  if (querySnapshot.empty) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `No meal histories found for date "${date}"`
    );
  }

  const histories = [];
  querySnapshot.forEach((doc) => {
    histories.push({ id: doc.id, ...doc.data() });
  });

  return histories;
};

const getMealHistoriesByDateAndMealType = async (userId, date, mealType) => {
  const historyCollection = db.collection("meals_histories");

  // Query data berdasarkan userId dan tanggal
  const querySnapshot = await historyCollection
    .where("userId", "==", userId)
    .where("date", "==", date)
    .where("meal_type", "==", mealType)
    .get();

  if (querySnapshot.empty) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `No meal histories found for date "${date}"`
    );
  }

  const histories = [];
  querySnapshot.forEach((doc) => {
    histories.push({ id: doc.id, ...doc.data() });
  });

  return histories;
};


const deleteHistories = async (historyId) => {
  const docRef = db.collection("meals_histories").doc(historyId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Meal Not Found");
  }

  await docRef.delete();
  return { message: "Meal deleted successfully" };
};

module.exports = {
  createOrUpdateMealHistory,
  addMealManual,
  getMealHistoriesByMealType,
  getMealHistoriesByDate,
  getMealHistoriesByDateAndMealType,
  deleteHistories,
};
