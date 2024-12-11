require("dotenv").config();

const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const { userService, authService } = require("../services");
const config = require("../config/config");

const SECRET_KEY = config.jwt.secret;

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.findUserByEmail(req.body.email);
  if (existingUser) {
    return res.status(httpStatus.CONFLICT).send({
      status: httpStatus.CONFLICT,
      message: "Email is already in use",
    });
  }

  const user = await userService.createUser(req.body);

  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, SECRET_KEY);

  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Register Succesfully",
    data: {
      userId: user.id,
      token,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, SECRET_KEY);

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Login Successfully",
    data: {
      user,
      token,
    },
  });
});

const loginWithFirebase = catchAsync(async (req, res) => {
  const { idToken } = req.body;

  const decodedToken = await authService.verifyFirebaseToken(idToken);

  let username = decodedToken.email.split("@")[0];

  const dataUser = {
    username: username,
    email: decodedToken.email,
    password: "", 
    role: "user", 
  };

  const user = await authService.findOrCreateUser(dataUser);

  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, SECRET_KEY);

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Login successful",
    user,
    token,
  });
});

module.exports = {
  register,
  login,
  loginWithFirebase,
};
