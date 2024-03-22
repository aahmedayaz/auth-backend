const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      message: 'Authorization Denied, Token is not missing.',
      error: true,
      statusCode: 401,
      data: null
    });
  }

  try {
    // Extract payload from token
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload.user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Token is expired, login again.',
      error: true,
      statusCode: 401,
      data: null
    });
  }

}

module.exports = auth;