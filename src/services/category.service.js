const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createCategory = async (data) => {
  const categorySnapshot = await db
    .collection("categories")
    .where("title", "==", data.title)
    .get();

  if (!categorySnapshot.empty) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category already exists");
  }

  const docRef = db.collection("categories").doc();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  await docRef.set({
    title: data.title,
    createdAt,
    updatedAt
  });

  return { id: docRef.id, title: data.title, createdAt, updatedAt };
};

const getAllCategories = async () => {
  const snapshot = await db.collection("categories").get();
  const categories = [];
  snapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
};

const getCategoryById = async (categoryId) => {
  const doc = await db.collection("categories").doc(categoryId).get();
  if (!doc.exists)
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  return { id: doc.id, ...doc.data() };
};

const updateCategory = async (categoryId, data) => {
  const docRef = db.collection("categories").doc(categoryId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists)
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");

  const updatedAt = new Date().toISOString();
  const updatedData = { ...data, updatedAt };

  await docRef.update(updatedData);

  return { id: categoryId, ...existingDoc.data(), ...updatedData };
};

const deleteCategory = async (categoryId) => {
  const docRef = db.collection("categories").doc(categoryId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists)
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");

  await docRef.delete();
  return { message: "Category deleted successfully" };
};

module.exports = {
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
  getAllCategories,
};
