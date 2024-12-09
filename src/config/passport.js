require("dotenv").config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { userService } = require("../services");
const config = require("../config/config");
const passport = require("passport");

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

    return done(null, user);
  }
  if (user) return done(null, user);
  return done(null, false);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy(googleOption, googleVerify);

// Serialisasi user ke dalam session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialisasi user dari session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = { jwtStrategy, googleStrategy };
