const router = require('express').Router();

const {validateAuth, validateUserBody} = require('../middleware/validation');
const auth = require('../middleware/auth');

const { createUser, login} = require('../controllers/users');
const userRoute = require('./users');
const cardRoute = require('./cards');
const notARoute = require('./notARoute');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuth, login);

router.use(auth);

router.use('/users', userRoute);
router.use('/cards', cardRoute);
//router.use('/', notARoute);

module.exports = router;

