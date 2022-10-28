const jwt = require('jsonwebtoken');
require('dotenv').config();
const Unauthorized = require('../errors/Unauthorized.js');

const {JWT_SECRET} = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith ('Bearer ')){
      return next(new Unauthorized('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch(err){
    return next(new Unauthorized('Authorization required'));

  }
  req.user = payload;
  return next();
};

module.exports = auth;