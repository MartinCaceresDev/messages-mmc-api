const express = require('express');
const { getChats, postChat, messagesAreSeen, getUnreadMessages } = require('../controllers/chatsController');

const chatsRouter = express.Router();
chatsRouter.use(express.json());

chatsRouter.route('/')
  .get(getUnreadMessages)
  .post(postChat)

chatsRouter.route('/:id')
  .get(getChats)
  .patch(messagesAreSeen);

module.exports = chatsRouter;