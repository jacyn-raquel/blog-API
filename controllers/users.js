const bcrypt = require('bcrypt');
const User = require('../models/User');
const {createAccessToken, errorHandler} = require('../auth');

// 1) Register User
module.exports.registerUser = (req, res) => {
	const {firstName, lastName, email, password} = req.body;

	if(!email.includes("@") || password.length < 8){
		return res.status(400).json({
			message: "Email input is invalid or password is below 8 characters!"
		})
	}

	if(!firstName || !lastName){
		return res.status(400).json({
			message: "First and Last names should be given."
		})
	}

	return User.findOne({firstName, lastName, email})
	.then(result => {
		if(result){
			return res.status(409).json({
				message: "User already exists in our system."
			})
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: bcrypt.hashSync(password, 10)
		});

		return newUser.save()
		.then(savedUser => {
			return res.status(201).json({
				message: "User Registered successfully!",
				user: savedUser
			})
		})
		.catch(err => errorHandler(err,req,res));
	})
	.catch(err => errorHandler(err,req,res));
}

// 2) Login User
module.exports.loginUser = (req,res) => {
	const {email, password} = req.body;

	if(!email.includes("@") || password.length < 8){
		return res.status(400).json({
			message: "Email input invalid!"
		})
	}

	return User.findOne({email:email})
	.then(result => {

		if(!result){
			return res.status(404).json({
				message: "User Account does not exist. Register first."
			})
		}

		const isPasswordCorrect = bcrypt.compareSync(password, result.password) ? res.status(200).json({
			message: "User Successfully logged in!",
			access: createAccessToken(result)
			}) : res.status(401).json({
				message: "Incorrect email or password!"
			});
	})
	.catch(error => errorHandler(error, req, res));
}

// 3) Get LoggedIn User Details
module.exports.getUserDetails = (req,res) => {
	const userId = req.user.id;

	return User.findById(userId)
	.then(result => {
		if(!result) {
			return res.status(404).json({
				message: "No account found."
			})
		}

		return res.status(200).json({
			success: true,
			result: result
		})
	})
	.catch(error => errorHandler(error, req, res))
}

// 4) Get All Users
module.exports.getAllUsers = (req,res) => {
	return User.find({isAdmin: false})
	.then(result => {
		if(result.length === 0){
			return res.status(404).json({
				message: "No regular user accounts found."
			})
		}

		return res.status(200).json({
			users: result
		})
	})
	.catch(err => errorHandler(err,req,res));
}