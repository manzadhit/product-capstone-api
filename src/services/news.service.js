const db = require("../config/firestore");
const { uploadImageToStorage } = require("../utils/uploadImage");
const { deleteImageFromStorage } = require("../utils/deleteImage");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createNews = async (data, imageFile) => {
  const docRef = db.collection("news").doc();

  const imageUrl = await uploadImageToStorage(imageFile);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  await docRef.set({
    ...data,
    image: imageUrl,
    createdAt,
    updatedAt,
  });

  return {
    id: docRef.id,
    ...data,
    image: imageUrl,
    createdAt,
    updatedAt,
  };
};
const getAllNews = async () => {
  const snapshot = await db.collection("news").get();
  const news = [];
  snapshot.forEach((doc) => {
    news.push({ id: doc.id, ...doc.data() });
  });
  return news;
};

const getNewsByTitleRegex = async (titlePattern) => {
  // Ambil semua data berita dari Firestore
  const snapshot = await db.collection("news").get();
  const news = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const title = data.title;

    // Cek jika title mengandung pattern regex
    const regex = new RegExp(titlePattern, "i"); // 'i' untuk case-insensitive
    if (regex.test(title)) {
      news.push({ id: doc.id, ...data });
    }
  });

  // Jika tidak ada berita yang cocok
  if (news.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No News Found with the given Title"
    );
  }

  return news;
};


const getNewsById = async (newsId) => {
  const doc = await db.collection("news").doc(newsId).get();
  if (!doc.exists) throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");
  return { id: doc.id, ...doc.data() };
};

const updateNews = async (newsId, data, imageFile) => {
  const docRef = db.collection("news").doc(newsId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists) throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");

  const existingData = existingDoc.data();
  const updatedAt = new Date().toISOString();
  const updateData = { ...data, updatedAt };

  if (imageFile) {
    const imageUrl = await uploadImageToStorage(imageFile);

    if (existingData.image) {
      const oldImagePath =
        "news_images/" + existingData.image.split("news_images/")[1];
      await deleteImageFromStorage(oldImagePath);
    }

    updateData.image = imageUrl;
  }

  await docRef.update(updateData);
  return { id: newsId, ...updateData };
};

const deleteNews = async (newsId) => {
  const docRef = db.collection("news").doc(newsId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists) throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");

  const existingData = existingDoc.data();

  if (existingData.image) {
    const imagePath =
      "news_images/" + existingData.image.split("news_images/")[1];
    await deleteImageFromStorage(imagePath);
  }

  await docRef.delete();
};

module.exports = {
  createNews,
  getAllNews,
  getNewsByTitleRegex,
  getNewsById,
  updateNews,
  deleteNews,
};
