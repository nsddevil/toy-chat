const jwt = require('jsonwebtoken');
const Joi = require('joi');

const middleware = {
  auth: (req, res, next) => {
    try {
      const token = req.get('authorization');
      if (!token)
        return res.status(401).json({ error: '로그인이 필요합니다.' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(419).json({
          error: '토큰기한 만료. 재로그인하십시요',
        });
      }
      next(error);
    }
  },
};

module.exports = middleware;
