const router = require('express').Router();
const {validateProfile, validateProfilePic, validateObjectId} = require('../middleware/validation');
const {
  getUser, getCurrentUser, getAllUsers, updateProfile, updateProfilePicture,
} = require('../controllers/users');
const auth = require('../middleware/auth');


router.get('/users', getAllUsers);
router.get('/users/me', auth, getCurrentUser);
//router.get('/users/:userId', validateObjectId, getUser);
//router.post('/users', createUser);
router.patch('/users/me', auth, validateProfile, updateProfile);
router.patch('/users/me/avatar', validateProfilePic, updateProfilePicture);

module.exports = router;
