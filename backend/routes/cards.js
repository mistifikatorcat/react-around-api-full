const router = require('express').Router();
const {celebrate, Joi} = require('celebrate');
const {validateUrl, validateAuth} = require('../middleware/validation');
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');



const newCardValidtn = Joi.object.keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().custom(validateUrl)
});



const objectIdValidtn = Joi.object.keys({
  cardId: Joi.string().required().custom((value, helpers) => {
    if (objectIdValidtn.isValid(value)) {
      return value;
    }
    return helpers.message('Invalid id');
  })
});

router.get('/cards', validateAuth, getAllCards);
router.post('/cards',
celebrate({
  body: newCardValidtn
  }), validateAuth, createCard);
router.delete('/cards/:cardId',
celebrate({
  body: objectIdValidtn
  }), validateAuth, deleteCard);
router.put('/cards/:cardId/likes',
celebrate({
  body: objectIdValidtn
  }), validateAuth, likeCard);
router.delete('/cards/:cardId/likes',
celebrate({
  body: objectIdValidtn
  }), validateAuth, dislikeCard);

module.exports = router;
