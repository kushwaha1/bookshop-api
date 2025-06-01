const express = require('express');
const { registerUser, loginUser } = require('../controller/userController.js');
const router = express.Router();

router.post('/register', registerUser); // Task 6
router.post('/login', loginUser); // Task 7

module.exports = router;