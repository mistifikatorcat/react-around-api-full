require('dotenv').config();
const User = require('../models/user');
const { badId, badURL, notFound, serverError, alreadyExists, unauthorized } = require('../consts/consts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => req.status(500).send({ message: 'Internal server error' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('User is not found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        badId(res);
      }

      if (err.status === 404) {
        notFound(res);
      }

      serverError(res);
    });
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

const updateData = (req, res) => {
  const id = req.user._id;
  const { body } = req;
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('User with such id is not found');
      error.status = 404;

      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        badId(res);
      } if (err.name === 'ValidationError') {
        badURL(res);
      } if (err.status === 404) {
        notFound(res);
      }
      serverError(res);
    });
};

const updateProfilePicture = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: 'Avatar cant be empty' });
  }

  return updateData(req, res);
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: 'Information cant be empty' });
  }

  return updateData(req, res);
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
  createUser, getUser, getAllUsers, updateProfile, updateProfilePicture, login
};
