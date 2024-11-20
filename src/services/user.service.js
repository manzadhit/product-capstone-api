const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");

const createUser = async (data) => {
  const docRef = db.collection("users").doc();
  data.password = bcrypt.hashSync(data.password, 8);
  await docRef.set(data);
  return { id: docRef.id, ...data };
};

const getUsers = async () => {
  const snapshot = await db.collection("users").get();
  if (snapshot.empty) {
    return [];
  }
  const data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

const getUserById = async (userId) => {
  const docRef = db.collection("users").doc(userId);
  const user = await docRef.get();
  if (!user.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return { id: user.id, ...user.data() };
};

const updateUser = async (userId, data) => {
  const docRef = db.collection("users").doc(userId);
  const user = await docRef.get();
  if (!user.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const { email, password } = data;

  if (email && email !== user.email) {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(httpStatus.CONFLICT, "Email is already in use");
    }
  }

  if (password) {
    data.password = bcrypt.hashSync(data.password, 8);
  }

  await docRef.update(data);
};

const deleteUser = async (userId) => {
  const docRef = db.collection("users").doc(userId);
  const user = await docRef.get();
  if (!user.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await docRef.delete();
};

const findUserByEmail = async (email) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (snapshot.empty) {
    return null;
  }
  let user = null;
  snapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });
  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
};