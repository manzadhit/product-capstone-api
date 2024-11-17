const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  userController.createUserController
);
router.get("/", userController.getAllUsersController);

module.exports = router;
