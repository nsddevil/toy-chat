const jwt = require('jsonwebtoken');

const middleware = {
  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token)
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = middleware;
