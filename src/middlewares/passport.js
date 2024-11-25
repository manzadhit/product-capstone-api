const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Google Profile:', profile); // Debugging
  
          // Cari user berdasarkan Google ID
          let user = await User.findUserByGoogleId(profile.id);
  
          // Jika tidak ditemukan, buat user baru dengan role "user"
          if (!user) {
            console.log('Creating new user...');
            user = await User.createUser({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos?.[0]?.value || null,
            });
          } else {
            console.log('User already exists:', user);
          }
  
          return done(null, user);
        } catch (err) {
          console.error('Error during Google authentication:', err);
          return done(err, null);
        }
      }
    )
  );
  
  
  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user); // Debug serialize
    done(null, user);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findUserByGoogleId(id);
      console.log('Deserializing user:', user); // Debug deserialize
      done(null, user);
    } catch (err) {
      console.error('Error during deserialization:', err);
      done(err, null);
    }
  });
  

module.exports = passport;
