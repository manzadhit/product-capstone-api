const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  userController.createUserController
);

module.exports = router;
