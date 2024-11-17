const { createUser, getAllData } = require("../models/user.model");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

const createUserController = async (req, res) => {
  // const existingUser = await findDataByEmail(req.body.email);
  // if (existingUser) {
  //   return res.status(httpStatus.CONFLICT).send({
  //     status: httpStatus.CONFLICT,
  //     message: "Email is already in use",
  //   });
  // }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await createUser("users", {
    ...req.body,
    password: hashedPassword,
  });

  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create User Success",
  });
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllData("users");

    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Fetch All Users Success",
      data: users,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

module.exports = {
  createUserController,
  getAllUsersController,
};
