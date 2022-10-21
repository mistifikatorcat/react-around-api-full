const router = require('express').Router();
const {validateCard, validateObjectId} = require('../middleware/validation');
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');



router.get('/cards', getAllCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:cardId', validateObjectId, deleteCard);
router.put('/cards/:cardId/likes', validateObjectId, likeCard);
router.delete('/cards/:cardId/likes', validateObjectId, dislikeCard);

module.exports = router;
