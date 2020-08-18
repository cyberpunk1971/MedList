const express = require('express');

const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();

//router.get('/', usersController.getUser);

router.post('/register', 
[
    check('username')
        .not()
        .isEmpty(),
    check('email')
        .normalizeEmail()
        .isEmail(),
    check('password')
        .not()
        .isLength({min: 8, max: 72})
], 
usersController.registerUser);

router.post('/login', usersController.loginUser);


module.exports = router;