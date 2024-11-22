const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validation");
const { authValidation } = require("../validations");

router.post("/register", validate(authValidation.register),authController.register);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
