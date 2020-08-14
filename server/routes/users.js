const express = require('express');

const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getUser);

router.post('/register', 
[
    check('username')
    .not()
    .isEmpty(),
    check('password')
    .not()
    .isEmpty(),
    check('email')
    .not()
    .isEmpty()
], 
usersController.registerUser);

router.post('/login', 
[
    check('username')
    .not()
    .isEmpty(),
    check('password')
    .isLength({min: 8, max: 72})
    .not()
    .isEmpty()
],
usersController.loginUser);


module.exports = router;