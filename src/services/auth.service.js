const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
// const db = require("../config/firestore");
const ApiError = require("../utils/ApiError");
const { findUserByEmail } = require("./user.service");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await findUserByEmail(email);

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


module.exports = {
  loginUserWithEmailAndPassword,
};
