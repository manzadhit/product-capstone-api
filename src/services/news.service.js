const db = require("../config/firestore");
const { uploadImageToStorage } = require("../utils/uploadImage");

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

const getNewsByTitle = async (title) => {
  const snapshot = await db.collection("news").where("title", "==", title).get();
  if (snapshot.empty) throw new Error("No News Found with the given Title");
  const news = [];
  snapshot.forEach((doc) => {
    news.push({ id: doc.id, ...doc.data() });
  });
  return news;
};

const getNewsById = async (newsId) => {
  const doc = await db.collection("news").doc(newsId).get();
  if (!doc.exists) throw new Error("News Not Found");
  return { id: doc.id, ...doc.data() };
};

const updateNews = async (newsId, data, imageFile) => {
  const docRef = db.collection("news").doc(newsId);

  const existingDoc = await docRef.get();
  if (!existingDoc.exists) throw new Error("News Not Found");

  const updatedAt = new Date().toISOString();
  const updateData = { ...data, updatedAt };

  if (imageFile) {
    const imageUrl = await uploadImageToStorage(imageFile);
    updateData.image = imageUrl;
  }

  await docRef.update(updateData);
  return { id: newsId, ...updateData };
};

const deleteNews = async (newsId) => {
  const docRef = db.collection("news").doc(newsId);
  const existingDoc = await docRef.get();
  if (!existingDoc.exists) throw new Error("News Not Found");
  await docRef.delete();
};

module.exports = {
  createNews,
  getAllNews,
  getNewsByTitle,
  getNewsById,
  updateNews,
  deleteNews,
};

