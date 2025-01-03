const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true]
	},
	title: {
		type: String,
		required: [true, "Title is important and should be provided."]
	},
	category: {
		type: String,
		required: [true, "Category of the post should be given."]
	},
	content: {
		type: String,
		required: [true, "The content of the post should be provided."]
	},
	author: {
		type: String,
		required: [true, "The author must be shown to know what user made the post"]
	},
	image: {
       type: String,
       required: [false], // Image is optional
       validate: {
           validator: function(value) {
               // Optional validation for URL format
               return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(value);
           },
           message: props => `${props.value} is not a valid image URL.`
       }
    },
	datePostCreated: {
		type: Date,
		default: Date.now()
	},
	comments: [
	{
		postId:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		firstName: {
			type: String,
			required: [true]
		},
		lastName: {
			type: String,
			required: [true]
		},
		comment: {
			type: String,
			required: [true, "User's comment must be filled out."]
		}
	}
	]
})

module.exports = mongoose.model('Post', postSchema);