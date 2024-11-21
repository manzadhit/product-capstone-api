const { userService } = require("../services");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res) => {
  const existingUser = await userService.findUserByEmail(req.body.email);
  if (existingUser) {
    return res.status(httpStatus.CONFLICT).send({
      status: httpStatus.CONFLICT,
      message: "Email is already in use",
    });
  }

  const user = await userService.createUser(req.body);

  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create User Success",
    data: {
      userId: user.id,
    },
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch All Users Success",
    data: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch User Success",
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await userService.updateUser(userId, req.body);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update User Success",
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await userService.deleteUser(userId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete User Success",
  });
});

const calculateBMI = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await userService.calculateBMI(userId, req.body);

  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Adding data success",
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  calculateBMI,
};
