const Card = require('../models/card');
const { badURL } = require('../consts/consts');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
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
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        (badURL(res));
      }
    })
    .catch(next);
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('Card is not found');
      error.status = 404;
      throw error;
    })
    .then(() => res.send({ data: card }))
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
      const error = new Error('Card is not found');
      error.status = 404;
      throw error;
    })
    .then(() => res.status(200).send({ message: 'Card is updated' }))
    .catch(next);
};

const likeCard = (req, res) => updateLikes(req, res, {$addToSet: {} });

const dislikeCard = (req, res) => updateLikes(req, res, {$pull: {} });

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
