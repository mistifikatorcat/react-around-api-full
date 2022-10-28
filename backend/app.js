require('dotenv').config({ path: '../.env'});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const auth = require('./middleware/auth');
const handleCentralError = require('./middleware/handleCentralError');
const {requestLogger, errorLogger} = require('./middleware/logger');
const {limiter} = require('./middleware/limiter');
console.log(process.env.NODE_ENV);

const { PORT = 3001 } = process.env;
const { MONGODB_URI = 'mongodb://localhost:27017/aroundb'} = process.env;
const app = express();


mongoose.connect(MONGODB_URI);


const allowedOrigins = '*';
app.use(cors({ origin: allowedOrigins }));

app.use(requestLogger);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

//router.use(auth);
//app.use(handleCentralError);
app.use(errors());
app.use(errorLogger);
app.use(limiter);


/*app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // paste the _id of the test user created in the previous step
  };

  next();
});*/

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});


/*app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource was not found' });
});*/


app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
