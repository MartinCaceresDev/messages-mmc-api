const UserModel = require('../models/userModel');

const getUsers = (req, res) => {
	UserModel.find()
		.then((users) => res.json(users))
		.catch((err) => res.json(err));
};

const addNewUser = async (req, res)=>{
	try {
		const user = req.body;
		const newUser = new UserModel(user);
		await newUser.save();
		res.json({
			message: 'User added to DB',
			user
		})
	} catch(err){
		res.json(err);
	}
};

module.exports = { getUsers, addNewUser };