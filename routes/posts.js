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


// **** ADMIN USERS ****
// 1) Get All Post
router.get('/allPosts', verify, verifyAdmin, postControllers.getAllPosts);

// 2) Get Specific Post
router.get('/:postId', verify, verifyAdmin, postControllers.getSpecificPost);

// 3) Delete Specific Post
router.delete('/:postId', verify, verifyAdmin, postControllers.deleteSpecificPost);


module.exports = router;