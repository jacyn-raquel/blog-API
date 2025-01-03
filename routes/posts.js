const postControllers = require('../controllers/posts');
const express = require('express');
const router = express.Router();

const {verify, verifyAdmin} = require('../auth');

// **** REGULAR USERS ****
// 1) Add Post
router.post('/', verify, postControllers.addPost);

// 2) Get All Post by User
router.get('/allPostsByUser', verify, postControllers.getAllPostsByUser);

// 3) Update Specific Post
router.patch('/updatePost/:postId', verify, postControllers.updateSpecificPost)

// 4) Add Comment on Specific Post
router.post('/addComment/:postId', verify, postControllers.addComment);

// 5) Get Comments by User Id
router.get('/comments', verify, postControllers.getCommentsByUserId);

// 6) Get All Post
router.get('/allPosts', verify, postControllers.getAllPosts);


// **** ADMIN USERS ****

// 1) Get Specific Post
router.get('/:postId', verify, verifyAdmin, postControllers.getSpecificPost);

// 2) Delete Specific Post
router.delete('/:postId', verify, verifyAdmin, postControllers.deleteSpecificPost);

// 3) Remove Comment on Post
router.delete('/deleteComment/:commentId', verify, verifyAdmin, postControllers.deleteComment);


module.exports = router;