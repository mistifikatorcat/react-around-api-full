const jwt = require('jsonwebtoken');
const authReq = require('../consts/consts.js');

const {JWT_SECRET} = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith ('Bearer ')){
      return next(authReq);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch(err){
    return next(authReq);
  }
  req.user = payload;
  return next();
};

module.exports = auth;