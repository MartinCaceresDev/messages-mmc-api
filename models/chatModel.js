const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
	time: {
		type: String,
		required: true,
	},
	messageId: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	from: {
		type: Object,
		required: true,
	},
	to: {
		type: Object,
		required: true,
	},
	room: {
		type: String,
		required: true
	},
	read: {
		type: Boolean,
		required: true,
	},
});

const ChatModel = mongoose.model('chats', ChatSchema);
module.exports = ChatModel;
