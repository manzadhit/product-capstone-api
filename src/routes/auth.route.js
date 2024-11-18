const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.createUserController);
router.get("/", userController.getAllUsersController);
router.get("/:userId", userController.getUserByIdController);
router.put("/:userId", userController.updateUserController);
router.delete("/:userId", userController.deleteUserController);

module.exports = router;
