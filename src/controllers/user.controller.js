const { createUser } = require("../models/user.model");
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

module.exports = {
  createUserController,
};
