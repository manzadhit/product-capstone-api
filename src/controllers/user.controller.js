const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
} = require("../models/user.model");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

const createUserController = async (req, res) => {
  try {
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).send({
        status: httpStatus.CONFLICT,
        message: "Email is already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await createUser({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(httpStatus.CREATED).send({
      status: httpStatus.CREATED,
      message: "Create User Success",
      data: {
        userId: user.id,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getUsers();
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

const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Fetch User Success",
      data: user,
    });
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        status: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
  }
};

const updateUserController = async (req, res) => {
  const { userId } = req.params;
  const { email, password, ...updateData } = req.body;

  try {
    const user = await getUserById(userId);
    if (email && email !== user.email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(httpStatus.CONFLICT).send({
          status: httpStatus.CONFLICT,
          message: "Email is already in use",
        });
      }
      updateData.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    await updateUser(userId, updateData);
    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Update User Success",
    });
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        status: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  try {
    await deleteUser(userId);
    return res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Delete User Success",
    });
  } catch (error) {
    return res
      .status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        status: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
  }
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
