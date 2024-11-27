const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticateJwt } = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validation");
const { userValidation } = require("../validations");

router
  .route("/")
  .post(
    authenticateJwt,
    checkRole("admin"),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(authenticateJwt, checkRole("admin"), userController.getAllUsers);

router
  .route("/:userId")
  .get(
    authenticateJwt,
    checkRole("user"),
    validate(userValidation.getUser),
    userController.getUserById
  )
  .put(
    authenticateJwt,
    checkRole("user"),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    authenticateJwt,
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

router.put(
  "/:userId/bmi",
  authenticateJwt,
  checkRole("user"),
  validate(userValidation.calculateBMI),
  userController.calculateBMI
);

module.exports = router;
