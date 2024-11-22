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

module.exports = {
  createNews
}
