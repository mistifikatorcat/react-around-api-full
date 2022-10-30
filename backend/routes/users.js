const router = require('express').Router();
const {validateProfile, validateProfilePic, validateObjectId} = require('../middleware/validation');
const {
  getUser, getCurrentUser, getAllUsers, updateProfile, updateProfilePicture,
} = require('../controllers/users');
//const auth = require('../middleware/auth');


router.get('/', getAllUsers);
router.get('/me', auth, getCurrentUser);
router.get('/:userId', validateObjectId, getUser);
//router.post('/users', createUser);
router.patch('/me', auth, validateProfile, updateProfile);
router.patch('/me/avatar', auth, validateProfilePic, updateProfilePicture);

module.exports = router;
