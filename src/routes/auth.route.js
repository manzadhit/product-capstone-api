const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validation");
const { authValidation } = require("../validations");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Rute register
router.post("/register", validate(authValidation.register), authController.register);

// Rute login
router.post("/login", validate(authValidation.login), authController.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      // Generate token JWT untuk user
      const token = jwt.sign(
        {
          id: req.user.googleId,
          email: req.user.email,
          name: req.user.displayName,
        },
        config.jwt.secret,
        { expiresIn: "1h" }
      );

      const user = req.user;

      // Kirim token JWT sebagai respons
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
);


module.exports = router;
