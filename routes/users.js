const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const {verify, verifyAdmin} = require('../auth');

// 1) Register User
router.post('/register', userControllers.registerUser);

// 2) Login User
router.post('/login', userControllers.loginUser);

// 3) Get All Users
router.get('/', verify, verifyAdmin, userControllers.getAllUsers);

// 4) Get Specific Logged In User
router.get('/details', verify, userControllers.getUserDetails);


module.exports = router;