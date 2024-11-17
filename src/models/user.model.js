const db = require("../config/firestore");


const createUser = async (collectionName, data) => {
  const docRef = db.collection(collectionName).doc();
  await docRef.set(data);

  return data;
};

module.exports = {
  createUser,
};