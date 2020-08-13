const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getUser);

router.post('/register', usersController.registerUser);

router.post('/login', usersController.loginUser);


module.exports = router;