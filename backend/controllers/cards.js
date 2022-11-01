const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadReq = require('../errors/BadReq');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      console.log('getAllCards on cards controller')
      console.log(cards);
      res.status(200).send(cards);
    })
    .catch(err=>{console.log(err); next(err)});
};

const createCard = (req, res, next) => {
  console.log('here');
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({
      name,
      link,
      owner: _id,
  })
      .then((card) => {
          console.log(card);
          console.log('createCard on cards controller');

          res.status(201).send(card);
      })
      .catch((err) => {
          console.log(err);
          if (err.name === 'ValidationError') {
              next(new BadReq(err.message));
          }
      })
      .catch((err) => {
          console.log(err);
          next(err);
      });
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
        .then((card) => {
        console.log('deleteCard on cards controller')

          console.log(card);
          res.status(200).send(card);
        })
      }
    })
    .catch(err=>{console.log(err); next(err)});
};

const updateLikes = (req, res, operator, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  console.log(operator);
  Card.findByIdAndUpdate(
      cardId,
      { [operator]: { likes: _id } }, // add _id to the array if it's not there yet
      { new: true },
  )
      .orFail(() => {
          throw new NotFound('Card is not found');
      })
      .then((card) => res.status(200).send(card))
      .catch((err) => {
          console.log(err);
          next(err);
      });
};

const likeCard = (req, res, next) => updateLikes(req, res, '$addToSet', next);

const dislikeCard = (req, res, next) => updateLikes(req, res, '$pull', next);

module.exports = {
  createCard, deleteCard, getAllCards, likeCard, dislikeCard,
};
