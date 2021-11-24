import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/user.js';
import passport from 'passport';
import { validPassword, genPassword } from '../utils/passwordUtils.js';

function strategy(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false);
        if (validPassword(password, user.hash, user.salt))
          return done(null, user);
        else return done(null, false);
      } catch (error) {
        throw error;
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id);
      const userInfo = {
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
      };
      cb(null, userInfo);
    } catch (error) {
      cb(error, false);
    }
  });
}

export default strategy;
