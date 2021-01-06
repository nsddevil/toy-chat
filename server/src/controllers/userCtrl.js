const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { signupValidation, signinValidation } = require('../utils/validations');

const userCtrl = {
  signup: async (req, res, next) => {
    const { name, email, password } = req.body;
    const result = signupValidation({ name, email, password });
    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }
    try {
      const exUser = await User.findOne({ email }).exec();
      if (exUser)
        return res.status(403).json({ error: '이미 사용중인 이메일입니다.' });
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.json({ message: '회원가입을 축하합니다. 로그인화면으로 이동' });
    } catch (error) {
      next(error);
    }
  },
  signin: async (req, res, next) => {
    const result = signinValidation(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: info.message });

      req.login(user, { session: false }, (err) => {
        if (err) return next(err);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        const rfToken = jwt.sign({ _id: user._id }, process.env.RWT_SECRET, {
          expiresIn: '7d',
        });
        res.cookie('rfToken', rfToken, {
          httpOnly: true,
          path: '/api/user/rftoken',
        });

        const temp = user.toJSON();
        delete temp.password;
        return res.json({
          token,
          user: temp,
        });
      });
    })(req, res, next);
  },
  rfToken: (req, res, next) => {
    try {
      const rfToken = req.cookies.rfToken;
      if (!rfToken)
        return res
          .status(404)
          .json({ error: '토큰정보가 없습니다. 로그인이 필요합니다.' });
      const decoded = jwt.verify(rfToken, process.env.RWT_SECRET);
      const token = jwt.sign({ _id: decoded._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  },
  logout: (req, res, next) => {
    try {
      res.clearCookie('rfToken', { path: '/api/user/rftoken' });
      return res.json({ message: 'logout success' });
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select('-password').exec();
      if (!user)
        return res.status(404).json({ error: '유저 정보가 없습니다.' });
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userCtrl;
