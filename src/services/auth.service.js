const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const admin = require("../config/firebaseAdmin");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.findUserByEmail(email);

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The email provided is incorrect or not registered."
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "The password you entered is incorrect."
    );
  }

  return user;
};

// Fungsi untuk memverifikasi token Firebase
const verifyFirebaseToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new ApiError(401, 'Invalid Firebase token');
  }
};

const findOrCreateUser = async (userData) => {
  const user = await userService.findUserByEmail(userData.email);

  if(!user) {
    const newUser = await userService.createUser(userData);
    return newUser
  }

  return user;
};


module.exports = {
  loginUserWithEmailAndPassword,
  verifyFirebaseToken,
  findOrCreateUser,
};
