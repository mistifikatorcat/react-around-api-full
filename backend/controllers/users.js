require('dotenv').config();
const User = require('../models/user');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const BadReq = require('../errors/BadReq');
const NotFound = require('../errors/NotFound');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const findUserWithId = (req, res, action, next) =>
  action.orFail(() => {
    throw new NotFound('No users found by this id');
  })
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadReq(err.message));
    } if (err.name === 'ValidationError') {
      next(new BadReq(err.message));
    }
    next(err);
});

const getCurrentUser = (req, res, next) => {
  findUserWithId(req, res, User.findById(req.user._id), next);
}

const getUser = (req, res, next) => {
  findUserWithId(req, res, User.findById(req.params._id), next);
}

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};


const createUser = (req, res, next) => {
  const { name, avatar, about, email, password } = req.body;
  User.findOne({ email })
  .then((user) => {
    if (user) {
      throw new Conflict ('User already exists');
    }
    return bcrypt.hash(password, 10);
  })
  .then((hash) =>
  User.create({ name, avatar, about, email, password: hash })
  )
  .then(console.log('user created'))
  .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReq(err.message));
        console.log('something with validation')
      }
      else{
      next(err);
      console.log('controller worked, but threw an error');
    }
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


const login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id}, JWT_SECRET, { expiresIn: '7d'})
    res.send({data: user, token})
  })
  .catch((err) => {
    console.log(err);
    next(new Unauthorized('Incorrect login or password'));
  })
}

module.exports = {
  createUser, getUser, getCurrentUser, getAllUsers, updateProfile, updateProfilePicture, login
};
