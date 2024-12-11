const db = require("../config/firestore");
const { v4: uuidv4 } = require("uuid");
const { uploadImageToStorage } = require("../utils/uploadImage");
const { deleteImageFromStorage } = require("../utils/deleteImage");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createNews = async (data, imageFile) => {
  const newsId = uuidv4();
  const docRef = db.collection("news").doc(newsId);

  const imageUrl = await uploadImageToStorage(imageFile);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // Handle categories (find or create)
  const categoryTitles = data.categories || [];
  const categoryRefs = [];
  for (const title of categoryTitles) {
    const categorySnapshot = await db
      .collection("categories")
      .where("title", "==", title)
      .get();

    if (categorySnapshot.empty) {
      // Create category if not exists
      const categoryRef = db.collection("categories").doc();
      await categoryRef.set({ title });
      categoryRefs.push(categoryRef.id);
    } else {
      categoryRefs.push(categorySnapshot.docs[0].id);
    }
  }

  await docRef.set({
    ...data,
    image: imageUrl,
    createdAt,
    updatedAt,
    categories: categoryRefs, // Save as reference IDs
  });

  return {
    id: docRef.id,
    ...data,
    image: imageUrl,
    createdAt,
    updatedAt,
    categories: categoryRefs,
  };
};

const getAllNews = async () => {
  const snapshot = await db.collection("news").get();
  const news = [];
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const categories = [];

    // Fetch category titles
    for (const categoryId of data.categories || []) {
      const categoryDoc = await db
        .collection("categories")
        .doc(categoryId)
        .get();
      if (categoryDoc.exists) {
        categories.push(categoryDoc.data().title);
      }
    }

    news.push({ id: doc.id, ...data, categories });
  }
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
  if (!existingDoc.exists)
    throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");

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
  if (!existingDoc.exists)
    throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");

  const existingData = existingDoc.data();

  if (existingData.image) {
    const imagePath =
      "news_images/" + existingData.image.split("news_images/")[1];
    await deleteImageFromStorage(imagePath);
  }

  await docRef.delete();
};

const getNewsByCategory = async (categoryTitle) => {
  // Cari kategori berdasarkan judul
  const categorySnapshot = await db
    .collection("categories")
    .where("title", "==", categoryTitle)
    .get();

  if (categorySnapshot.empty) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }

  // Ambil ID kategori
  const categoryId = categorySnapshot.docs[0].id;

  // Cari berita yang memiliki kategori tersebut
  const newsSnapshot = await db
    .collection("news")
    .where("categories", "array-contains", categoryId)
    .get();

  if (newsSnapshot.empty) {
    throw new ApiError(httpStatus.NOT_FOUND, "No News Found for this Category");
  }

  const news = [];
  for (const doc of newsSnapshot.docs) {
    const data = doc.data();
    const categories = [];

    // Ambil nama kategori
    for (const categoryRef of data.categories || []) {
      const categoryDoc = await db
        .collection("categories")
        .doc(categoryRef)
        .get();
      if (categoryDoc.exists) {
        categories.push(categoryDoc.data().title);
      }
    }

    news.push({ id: doc.id, ...data, categories });
  }

  return news;
};

module.exports = {
  createNews,
  getAllNews,
  getNewsByTitleRegex,
  getNewsById,
  updateNews,
  deleteNews,
  getNewsByCategory,
};
