const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {validateUrl, validateAuth, validateUserId} = require('../middleware/validation');
const {
  getUser, getAllUsers, updateProfile, updateProfilePicture,
} = require('../controllers/users');


const updAvatarValidtn = Joi.object.keys({
  avatar: Joi.string().required().custom(validateUrl)
});

const updProfileInfoValidtn = Joi.object.keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30)
});

router.get('/users', validateAuth, getAllUsers);
router.get('/users/:userId', validateAuth, validateUserId, getUser);
//router.post('/users', createUser);
router.patch('/users/me', validateAuth, updProfileInfoValidtn, updateProfile);
router.patch('/users/me/avatar', validateAuth, updAvatarValidtn, updateProfilePicture);

module.exports = router;
