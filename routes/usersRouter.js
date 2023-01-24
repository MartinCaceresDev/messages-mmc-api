const express = require('express');
const { getUsers, addNewUser } = require('../controllers/usersController');

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.route('/')
  .get(getUsers)
  .post(addNewUser);

module.exports = usersRouter;