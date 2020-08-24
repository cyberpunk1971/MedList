    const express = require('express');

    const { check } = require('express-validator');

    const usersController = require('../controllers/users-controller');
    const checkAuth = require('../middleware/auth');

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
                .isLength({ min: 8, max: 72 })
        ],
        usersController.registerUser);

    router.post('/login', usersController.loginUser);

    router.use(checkAuth); //When placed before the register and login 
    // this causes registration to fail, why? 


    module.exports = router;


