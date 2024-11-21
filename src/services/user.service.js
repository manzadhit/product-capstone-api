const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");

const createUser = async (data) => {
  const docRef = db.collection("users").doc();
  data.password = bcrypt.hashSync(data.password, 8);
 
  let role = "user";
  if (data.role && data.role === "admin") {
    role = data.role
  }

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt; 

  await docRef.set({ ...data, role, createdAt, updatedAt});
  return { id: docRef.id, ...data, role, createdAt, updatedAt };
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

  const updatedAt = new Date().toISOString();

  await docRef.update({...data, updatedAt});
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

const calculateBMI = async (userId, data) => {
  const docRef = db.collection("users").doc(userId);
  const user = await docRef.get();

  if (!user.exists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  await docRef.update({
    bmi: data
  })
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  calculateBMI,
};
