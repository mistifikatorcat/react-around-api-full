const router = require('express').Router();
const NotFound = require('../errors/NotFound');

router.use('*',(res, req, next) => {
  next(new NotFound('Page does not exist'));
})

module.exports = {
  notARoute: router
};