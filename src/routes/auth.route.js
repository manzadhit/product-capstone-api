const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validation");
const { authValidation } = require("../validations");
const passport = require("passport");

// Rute register
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

// Rute login
router.post("/login", validate(authValidation.login), authController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.callbackGoogle
);

module.exports = router;
