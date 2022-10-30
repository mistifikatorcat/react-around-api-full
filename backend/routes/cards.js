const router = require('express').Router();
const {validateCard, validateObjectId} = require('../middleware/validation');
const {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
} = require('../controllers/cards');
//const auth = require('../middleware/auth');



router.get('/', /*auth,*/ getAllCards);
router.post('/', /*auth,*/ validateCard, createCard);
router.delete('/:cardId', /*auth,*/ validateObjectId, deleteCard);
router.put('/:cardId/likes', /*auth,*/ validateObjectId, likeCard);
router.delete('/:cardId/likes', /*auth,*/ validateObjectId, dislikeCard);

module.exports = router;
