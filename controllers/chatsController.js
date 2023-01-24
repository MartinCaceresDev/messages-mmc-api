const ChatModel = require("../models/chatModel");

const getChats = (req, res)=>{
  const { id } = req.params;
    ChatModel.find({ room: id })
      .then(messages=>res.json(messages))
      .catch(err=>res.json(err))
      
    };
    
  const getUnreadMessages = (req, res)=>{
    ChatModel.find({ read: false })
      .then(unreadMessages => res.json(unreadMessages))
      .catch(err => res.json(err))
  };

const postChat = async (req, res)=>{
  const message = req.body;
  const newMessage = new ChatModel(message);
  try {
    await newMessage.save();
    res.json({
      message: 'message saved in DB',
      content: message
    })
  } catch(err){
    res.json(err)
  }
};

const messagesAreSeen = async (req, res)=>{
  const { id } = req.params;
  const otherUser = req.body;
  try {
    await ChatModel.updateMany({ room: id, 'from.uid': otherUser.uid }, { $set: { read: true }})
    res.json({ message: 'chats marked as seen' })
  } catch(err){
    res.json(err)
  }
};

module.exports = { getChats, postChat, messagesAreSeen, getUnreadMessages }