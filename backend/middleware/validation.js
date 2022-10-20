const validator = require('validator');
const {celebrate, Joi} = require('celebrate');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required.email(),
    password: Joi.string().required().min(8)
  })
});

const validateUserId = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required.email(),
    password: Joi.string().required().min(8)
  })
})

module.exports = validateURL, validateAuth, validateUserId;