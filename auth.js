const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create Access Token
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
}

// Verify User
module.exports.verify = (req,res,next) => {
	let token = req.headers.authorization;

	if(token === undefined){
		return res.status(404).json({
			message: "Failed. No token!"
		})
	}

	token = token.slice(7,token.length);

	// console.log(token);

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {

		if (err) {
			return res.status(403).json({
				auth: "Failed!",
				message: err.message
			})
		}

		console.log(decodedToken);
		req.user = decodedToken;
		next();
	})
}

// Verify Admin
module.exports.verifyAdmin = (req,res,next) => {
	const {isAdmin} = req.user;

	if(isAdmin){
		next();
	} else {
		return res.status(403).json({
			auth: "Failed!",
			message: "Action Forbidden!"
		})
	}
}

// Error Handling
module.exports.errorHandler = (err, req, res, next) => {
	console.error(err);

	const statusCode = err.status || 500;
	const errorMessage = err.message || `Internal Server Error`;

	return res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
}