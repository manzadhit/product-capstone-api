require("dotenv").config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { userService } = require("../services");
const config = require("../config/config");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const jwtVerify = async (payload, done) => {
  const user = await userService.getUserById(payload.id);

  if (user) return done(null, user);
  return done(null, false);
};

const googleOption = {
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
};

const googleVerify = async (profile, done) => {
  let user = await userService.findUserByGoogleId(profile.id);

  // Jika tidak ditemukan, buat user baru dengan role "user"
  if (!user) {
    user = await user.createUser({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos?.[0]?.value || null,
    });
  }
  if (user) return done(null, user);
  return done(null, false);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOption, googleVerify);

module.exports = { jwtStrategy, googleStrategy };
