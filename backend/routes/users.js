const router = require('express').Router();
const {validateProfile, validateProfilePic, validateObjectId} = require('../middleware/validation');
const {
  getUser, getCurrentUser, getAllUsers, updateProfile, updateProfilePicture,
} = require('../controllers/users');


router.get('/users', getAllUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateObjectId, getUser);
//router.post('/users', createUser);
router.patch('/users/me', validateProfile, updateProfile);
router.patch('/users/me/avatar', validateProfilePic, updateProfilePicture);

module.exports = router;
