const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	user: {
		type: Object,
		required: true
	}
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
