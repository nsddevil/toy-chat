const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const userCtrl = {
  signup: async (req, res, next) => {
    const { name, email, password } = req.body;
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(3).required(),
    });

    const result = schema.validate({ name, email, password });
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    }
    try {
      const exUser = await User.findOne({ email }).exec();
      if (exUser)
        return res.status(403).json({ message: '이미 사용중인 이메일입니다.' });
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.json({ message: 'signup success' });
    } catch (error) {
      next(error);
    }
  },
  signin: async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });

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

        return res.json({ token });
      });
    })(req, res, next);
  },
  rfToken: (req, res, next) => {
    try {
      const rfToken = req.cookies.rfToken;
      if (!rfToken)
        return res
          .status(404)
          .json({ message: 'you are not have reflashToken, need signin' });
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
        return res.status(404).json({ message: '유저 정보가 없습니다.' });
      res.json({ user });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userCtrl;
