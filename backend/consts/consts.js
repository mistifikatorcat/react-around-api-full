const badId = (res) => res.status(400).send({ message: 'Invalid ID' });
const badURL = (res) => res.status(400).send({  message: `${Object.values(err.errors)
  .map((error) => error.message)
  .join(', ')}`, });
const notFound = (res) => res.status(404).send({ message: 'Not found' });
const serverError = (res) => res.status(500).send({ message: 'Internal server error' });
const alreadyExists = (res) => res.status(409).send({ message: 'The user with this email already exists' });
const unauthorized = (res) => res.status(401).send({ message: 'Incorrect email and/or password' });
const authReq = (res) => res.status(401).send({ message: 'Authorization required' });
module.exports = ({ badId, notFound, serverError, badURL, alreadyExists, unauthorized, authReq });
