const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'The name is too short!'],
    maxLength: [30, 'The name is too long'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?:\/\/[^\s]+)/.test(v);
      },
      message: 'Please enter the valid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
