const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
// const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");
const { findUserByEmail } = require("./user.service");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await findUserByEmail(email);
  const validPassword = await bcrypt.compare(password, user.password);

  if (!user || !validPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
