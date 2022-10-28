const router = require('express').Router();
const {validateCard, validateObjectId} = require('../middleware/validation');
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middleware/auth');



router.get('/cards', auth, getAllCards);
router.post('/cards', auth, validateCard, createCard);
router.delete('/cards/:cardId', auth, validateObjectId, deleteCard);
router.put('/cards/:cardId/likes', auth, validateObjectId, likeCard);
router.delete('/cards/:cardId/likes', auth, validateObjectId, dislikeCard);

module.exports = router;
