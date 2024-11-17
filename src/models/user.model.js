const db = require("../config/firestore");


const createUser = async (collectionName, data) => {
  const docRef = db.collection(collectionName).doc();
  await docRef.set(data);

  return data;
};

const getAllData = async (collectionName) => {
  const snapshot = await db.collection(collectionName).get();

  if (snapshot.empty) {
    return [];
  }

  const data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

module.exports = {
  createUser,
  getAllData,
};