const { v4: uuidv4 } = require("uuid");
const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const mealService = require("./meal.service");
const getMealType = require("../utils/getMealType");


const createOrUpdateMealHistory = async (userId, mealIds) => {
  if (!mealIds || mealIds.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Meal IDs are required.");
  }

  const meal_type = getMealType();
  const date = new Date().toISOString().split("T")[0];

  const historyCollection = db.collection("meals_histories");

  // Cek apakah riwayat makanan untuk tipe makanan pada hari tersebut sudah ada
  const existingHistoryQuery = await historyCollection
    .where("userId", "==", userId)
    .where("meal_type", "==", meal_type)
    .where("date", "==", date)
    .limit(1)
    .get();

  let totalCalories = 0;
  const totalNutrition = {
    Calcium: 0,
    "Dietary Fiber": 0,
    Iron: 0,
    Protein: 0,
    "Vitamin A": 0,
    "Vitamin B": 0,
    "Vitamin C": 0,
    Carbohydrate: 0,
  };

  const details = [];
  for (const mealId of mealIds) {
    const mealData = await mealService.getMealById(mealId);
    const { Calories, nutritions } = mealData;

    // Tambahkan ke daftar makanan baru
    details.push(mealData);

    // Tambahkan total nutrisi dari makanan baru
    totalCalories += Calories;
    for (const [key, value] of Object.entries(nutritions)) {
      if (totalNutrition[key] !== undefined) {
        totalNutrition[key] += value;
      }
    }
  }

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  if (!existingHistoryQuery.empty) {
    // Jika sudah ada riwayat makanan, lakukan update
    const existingHistoryDoc = existingHistoryQuery.docs[0];
    const existingData = existingHistoryDoc.data();

    // Update total kalori dan nutrisi
    const updatedTotalCalories = existingData.total_calories + totalCalories;
    const updatedTotalNutrition = { ...existingData.total_nutrition };
    for (const [key, value] of Object.entries(totalNutrition)) {
      if (updatedTotalNutrition[key] !== undefined) {
        updatedTotalNutrition[key] += value;
      }
    }

    // Tambahkan makanan baru ke detail yang sudah ada
    const updatedDetails = [...existingData.details, ...details];

    // Update dokumen di Firestore
    await historyCollection.doc(existingHistoryDoc.id).update({
      total_calories: updatedTotalCalories,
      total_nutrition: updatedTotalNutrition,
      details: updatedDetails,
      updatedAt,
    });

    return {
      id: existingHistoryDoc.id,
      total_calories: updatedTotalCalories,
      total_nutrition: updatedTotalNutrition,
      details: updatedDetails,
      userId,
      meal_type,
      date,
      createdAt: existingData.createdAt,
      updatedAt,
    };
  } else {
    // Jika tidak ada riwayat, buat dokumen baru
    const historyId = uuidv4();
    const mealHistory = {
      total_calories: totalCalories,
      total_nutrition: totalNutrition,
      userId,
      meal_type,
      date,
      details,
      createdAt,
      updatedAt,
    };

    const docRef = historyCollection.doc(historyId);
    await docRef.set(mealHistory);

    return { id: historyId, ...mealHistory };
  }
};

const addMealManual = async (userId, meal) => {
  const meal_type = getMealType(); // Menentukan tipe makan berdasarkan waktu
  const date = new Date().toISOString().split("T")[0];

  const historyCollection = db.collection("meals_histories");

  // Cek apakah ada riwayat makanan dengan tipe makan dan tanggal ini
  const existingHistoryQuery = await historyCollection
    .where("userId", "==", userId)
    .where("meal_type", "==", meal_type)
    .where("date", "==", date)
    .limit(1)
    .get();

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // Tambahkan properti tambahan ke makanan
  const mealWithMetadata = {
    ...meal,
    id: uuidv4(),
    userId,
    createdAt,
    updatedAt,
  };

  const { Calories, nutritions } = meal;

  if (!existingHistoryQuery.empty) {
    // Jika riwayat makanan sudah ada, update data
    const existingHistoryDoc = existingHistoryQuery.docs[0];
    const existingData = existingHistoryDoc.data();

    // Update total kalori dan nutrisi
    const updatedTotalCalories = existingData.total_calories + Calories;
    const updatedTotalNutrition = { ...existingData.total_nutrition };
    for (const [key, value] of Object.entries(nutritions)) {
      if (updatedTotalNutrition[key] !== undefined) {
        updatedTotalNutrition[key] += value;
      }
    }

    // Tambahkan makanan baru ke `details`
    const updatedDetails = [...existingData.details, mealWithMetadata];

    // Perbarui dokumen
    await historyCollection.doc(existingHistoryDoc.id).update({
      total_calories: updatedTotalCalories,
      total_nutrition: updatedTotalNutrition,
      details: updatedDetails,
      updatedAt,
    });

    return {
      id: existingHistoryDoc.id,
      total_calories: updatedTotalCalories,
      total_nutrition: updatedTotalNutrition,
      details: updatedDetails,
      meal_type,
      date,
      createdAt: existingData.createdAt,
      updatedAt,
    };
  } else {
    // Jika tidak ada riwayat makanan, buat dokumen baru
    const mealHistory = {
      total_calories: Calories,
      total_nutrition: nutritions,
      userId,
      meal_type,
      date,
      details: [mealWithMetadata],
      createdAt,
      updatedAt,
    };

    const historyId = uuidv4();
    const docRef = historyCollection.doc(historyId);
    await docRef.set(mealHistory);

    return { id: historyId, ...mealHistory };
  }
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

module.exports = {
  createOrUpdateMealHistory,
  addMealManual,
  getMealHistoriesByMealType,
};
