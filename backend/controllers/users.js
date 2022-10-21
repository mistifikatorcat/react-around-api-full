require('dotenv').config();
const User = require('../models/user');
const { badId, badURL, notFound, serverError, alreadyExists, unauthorized } = require('../consts/consts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const findUserWithId = (req, res, action, next) =>
  action.orFail(() => {
    throw new Error('No users found by this id');
  })
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(badId(res));
    } if (err.name === 'ValidationError') {
      next(badURL(res));
    } if (err.status === 404) {
      next(notFound(res));
    }
    next(serverError(res));
});

const getCurrentUser = (req, res, next) => {
  findUserWithId(req, res, User.findById(req.user._id), next);
}

const getUser = (req, res, next) => {
  findUserWithId(req, res, User.findById(req.params._id), next);
}

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => req.status(500).send({ message: 'Internal server error' }));
};


const createUser = (req, res) => {
  const { name, avatar, about, email, password } = req.body;
  User.findOne({ email })
  .then((user) => {
    if (user) {
      alreadyExists(res);
    }
    return bcrypt.hash(password, 10);
  })
  .then((hash) =>
  User.create({ name, avatar, about, email, password: hash })
  )
  .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        badURL(res);
      }
      serverError(res);
    });
};

const updateProfile = (req, res, next) => {
  const {name, about} = req.body;
  const {_id} = req.user;
  findUserWithId( req, res,
    User.findByIdAndUpdate(
      _id, {name, about}, {new: true, runValidators: true}
    ), next);
};

const updateProfilePicture = (req, res, next) => {
  const {avatar} = req.body;
  const {_id} = req.user;
  findUserWithId( req, res,
    User.findByIdAndUpdate(
      _id, {avatar}, {new: true, runValidators: true}
    ), next);
};


const login = (req, res) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id}, JWT_SECRET, { expiresIn: '7d'})
    res.send({data: user.toJSON(), token})
  })
  .catch((err) => {
    console.log(err);
    unauthorized(err);
  })
}

module.exports = {
  createUser, getUser, getCurrentUser, getAllUsers, updateProfile, updateProfilePicture, login
};
