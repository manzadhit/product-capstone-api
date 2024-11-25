const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../middlewares/passport'); // Pastikan Passport di-load di sini

const router = express.Router();

// Fungsi untuk menghasilkan token JWT
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  return jwt.sign(
    {
      id: user.googleId, // ID pengguna dari Google
      email: user.email,
    },
    process.env.JWT_SECRET, // Kunci rahasia untuk JWT
    { expiresIn: '1h' } // Token berlaku selama 1 jam
  );
};

// Endpoint untuk memulai login dengan Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback setelah login
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('User from req.user:', req.user); // Tambahkan log ini untuk debug
  
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication failed. No user found.' });
      }
  
      const token = generateToken(req.user);
  
      res.json({
        message: 'Login successful',
        user: {
          googleId: req.user.googleId,
          username: req.user.name,
          email: req.user.email,
          avatar: req.user.avatar,
          createdAt: req.user.createdAt || new Date().toISOString(),
        },
        token,
      });
    }
  );

// Tambahkan handler untuk login gagal (opsional)
router.get('/login', (req, res) => {
  res.status(401).json({ message: 'Login failed. Please try again.' });
});

module.exports = router;
