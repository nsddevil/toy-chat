const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ email }).exec();
          if (!exUser)
            return done(null, false, { message: '유저정보가 없습니다.' });
          const isMatch = await bcrypt.compare(password, exUser.password);
          if (!isMatch)
            return done(null, false, {
              message: '비밀번호가 일치하지않습니다.',
            });
          return done(null, exUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
