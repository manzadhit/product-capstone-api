const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

router
  .route("/:userId")
  .get(authenticateJwt, checkRole("user"), userController.getUserById)
  .put(authenticateJwt, checkRole("admin"), userController.updateUser)
  .delete(authenticateJwt, checkRole("admin"), userController.deleteUser);


module.exports = router;
