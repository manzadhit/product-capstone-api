const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router
  .route("/")
  .post(authenticateJwt, checkRole("admin"), userController.createUser)
  .get(authenticateJwt, checkRole("admin"), userController.getAllUsers);

router
  .route("/:userId")
  .get(authenticateJwt, checkRole("user"), userController.getUserById)
  .put(authenticateJwt, checkRole("user"), userController.updateUser)
  .delete(authenticateJwt, userController.deleteUser);

module.exports = router;
