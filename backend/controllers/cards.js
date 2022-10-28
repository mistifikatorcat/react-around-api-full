const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadReq = require('../errors/BadReq');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, likes } = req.body;
  const { _id } = req.user;
  Card.create({
    name, link, likes, owner: _id,
  })
    .then((card) => {
      res.status(201).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReq(err.message));
      }
    })
    .catch(next);
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Card is not found');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next (new Forbidden("You can't delete someone else's card"))
      }
      else{
        Card.findByIdAndRemove(cardId)
        .then(({card}) => {
          res.status(200).send({ card})
        })
      }
    })
    .catch(next);
};

const updateLikes = (req, res, operator) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { [operator]: { likes: _id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Card is not found');
    })
    .then(() => res.status(200).send({ message: 'Card is updated' }))
    .catch(next);
};

const likeCard = (req, res) => updateLikes(req, res, {$addToSet: {} });

const dislikeCard = (req, res) => updateLikes(req, res, {$pull: {} });

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
