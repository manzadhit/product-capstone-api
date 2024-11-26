const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validation");
const { authValidation } = require("../validations");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Rute register
router.post("/register", validate(authValidation.register), authController.register);

// Rute login
router.post("/login", validate(authValidation.login), authController.login);

// Rute untuk memulai login dengan Google
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

// Callback setelah login dengan Google berhasil
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      try {
        // Generate token JWT untuk user
        const token = jwt.sign(
          {
            id: req.user.googleId,
            email: req.user.email,
            name: req.user.displayName,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        // Kirim token JWT sebagai respons
        res.status(200).json({ token });
      } catch (error) {
        // Gunakan objek error untuk memberikan informasi lebih detail
        res.status(500).json({ error: error.message || "Internal Server Error" });
      }
    }
  );
  

module.exports = router;
