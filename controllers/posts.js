const Post = require('../models/Post');
const {errorHandler} = require
('../auth');


// 1) Add Post
module.exports.addPost = (req,res) => {
	const {title, category, content} = req.body;
	const {id, firstName, lastName} = req.user;

	return Post.findOne({title,category,content})
	.then(result => {
		if(result){
			return res.status(409).json({
				message: "Post already exists."
			})
		}

		const newPost = new Post({
			userId: id,
			title,
			author: `${firstName} ${lastName}`, 
			category,
			content
		})

		return newPost.save()
		.then(savedPost => {
			return res.status(201).json({
				success: true,
				savedPost
			})
		})
		.catch(err => errorHandler(err,req,res));
	})
	.catch(err => errorHandler(err,req,res));
}

// 2) Get All Posts
module.exports.getAllPosts = (req,res) => {
	return Post.find()
	.then(result => {
		if(!result){
			return res.status(404).json({
				success:true,
				message: "No posts exists."
			})
		}

		return res.status(200).json({
			success: true,
			message: "All Posts retrieved.",
			result
		})
	})
	.catch(err => errorHandler(err,req,res));
}

// 3) Get Specific Post (Admin only)
module.exports.getSpecificPost = (req,res) => {
	const postId = req.params.postId;

	return Post.findById(postId)
	.then(result => {
		if(!result){
			return res.status(404).json({
				message: "No post found under this Id OR it must have been deleted."
			})
		}

		return res.status(200).json({
			success:true,
			message: "Specific Post retrieved",
			result
		})
	})
	.catch(err => errorHandler(err,req,res));
}

// 4) Get All Post by User
module.exports.getAllPostsByUser = (req,res) => {
	const userId = req.user.id;

	return Post.find({userId})
	.then(posts => {
		if (!posts){
			return res.status(404).json({
				message: "No posts made by this user."
			})
		}

		return res.status(200).json({
			success:true,
			message: "All posts by this user are retrieved successfully!",
			posts
		})
	})
	.catch(err => errorHandler(err,req,res));
}

// 5) Update Specific Post
module.exports.updateSpecificPost = (req,res) => {
	const {title, category, content} = req.body;
	const postId = req.params.postId;

	const updatedInfo = {
		title,
		category,
		content
	}

	return Post.findByIdAndUpdate(postId, updatedInfo, {new:true})
	.then(result => {
		if(!result){
			res.status(404).json({
				message:"Post cannot be updated because it does not exist."
			})
		}

		return res.status(200).json({
			success:true,
			message:"Post successfully updated!",
			result
		})
	})
	.catch(err => errorHandler(err,req,res));
}

// 6) Delete Specific Post
module.exports.deleteSpecificPost = (req,res) => {
	const postId = req.params.postId;

	return Post.findByIdAndDelete(postId)
	.then(result => {
		if(!result){
			return res.status(404).json({
				message: "Post already deleted or does not exist."
			})
		}

		return res.status(200).json({
		success:true,
		message: "Post deleted successfully!"
	})})
	.catch(err => errorHandler(err,req,res))
}

// ***ADD COMMENTS***

// 1) Add Comment on Specific Post
module.exports.addComment = (req, res) => {
	const postId = req.params.postId;
	const {id, firstName, lastName} = req.user;
	const {comment} = req.body;

	return Post.findById(postId)
	.then(post => {
		if(!post){
			return res.status(404).json({
				message: "Post does not exist"
			})
		}

		const commentExists = post.comments.some(existingComment => {
			return (existingComment.userId.toString() === id && existingComment.comment === comment)
		})

		if(commentExists){
			return res.status(409).json({
				message: "Comment already saved!"
			})
		}

		let newComment = {
			userId: id,
			firstName,
			lastName,
			comment
		}

		post.comments.push(newComment);

		return post.save()
		.then(updatedPostComments => {
			return res.status(200).json({
				message: "Comment added successfully!",
				newComment: updatedPostComments
			})
		})
		.catch(err => errorHandler(err,req,res));
	})
}

// 2) Get Comments by User Id
module.exports.getCommentsByUserId = (req,res) => {
	const userId = req.user.id;

	return Post.find({"comments.userId": userId}, {comments:1, title: 1})
	.then(posts => {
		const userComments = posts.flatMap(post => 
            post.comments
                .filter(comment => comment.userId.toString() === userId)
                .map(comment => ({
                    postId: post._id,
                    postTitle: post.title,
                    comment: {
                        commentId: comment._id,
                        userId: comment.userId,
                        firstName: comment.firstName,
                        lastName: comment.lastName,
                        comment: comment.comment
                    }
                }))
        );

		return res.status(200).json({
			success: true,
			message: "Comments by user are retrieved successfully!",
			comments: userComments
		})
	})
	.catch(err => errorHandler(err, req, res))
}