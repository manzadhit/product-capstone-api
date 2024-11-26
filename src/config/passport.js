// passport.js
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { userService } = require("../services");
const config = require("../config/config");

// Konfigurasi untuk Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Konfigurasi untuk JWT (Json Web Token)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const jwtVerify = async (payload, done) => {
  const user = await userService.getUserById(payload.id);

  if (user) return done(null, user);
  return done(null, false);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// Menggunakan JWT strategy
passport.use(jwtStrategy);

module.exports = passport;
