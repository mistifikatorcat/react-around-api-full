const NotFound = require('../errors/NotFound');

const notARoute = (res, req, next) => {
  next(new NotFound('Page does not exist'));
};

module.exports = {
  notARoute
};