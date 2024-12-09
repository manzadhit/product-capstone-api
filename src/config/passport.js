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

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  let user = await userService.findUserByEmail(email);

  if (!user) {
    user = await userService.createUser({
      username: profile.displayName,
      email,
      password: "",
    });

    return done(null, { user, redirect: true });
  }
  if (user) return done(null, user);
  return done(null, false);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOption, googleVerify);

module.exports = { jwtStrategy, googleStrategy };
