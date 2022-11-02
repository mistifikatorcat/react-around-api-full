const router = require('express').Router();
const { validateProfile, validateProfilePic, validateObjectId } = require('../middleware/validation');
const {
  getUser, getCurrentUser, getAllUsers, updateProfile, updateProfilePicture,
} = require('../controllers/users');
// const auth = require('../middleware/auth');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:users/id', validateObjectId, getUser);
// router.post('/users', createUser);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateProfilePic, updateProfilePicture);

module.exports = router;
