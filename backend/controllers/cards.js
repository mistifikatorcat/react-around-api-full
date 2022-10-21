const Card = require('../models/card');
const { badId, notFound, serverError, badURL } = require('../consts/consts');

const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => serverError);
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
        next(badURL(res));
      }
      next(serverError(res));
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('Card is not found');
      error.status = 404;
      throw error;
    })
    .then(() => res.status(200).send({ message: 'Card is deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        badId(res);
      } if (err.status === 404) {
        notFound(res);
      }
      serverError(res);
    });
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
    .catch((err) => {
      if (err.name === 'CastError') {
        badId(res);
      } if (err.status === 404) {
        notFound(res);
      }
      serverError(res);
    });
};

const likeCard = (req, res) => updateLikes(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLikes(req, res, '$pull');

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
