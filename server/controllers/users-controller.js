const { validationResult } = require('express-validator');

const { User } = require('../models/user');

const HttpError = require('../models/http-error');


const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError('Name field cannot be empty', 422)
        );
    }
    const { 
        username,
        email, 
        password 
    } = req.body;

        let existingUser;
        try {
             existingUser = await User.findOne({ email: email })
        } catch (err) {
            const error = new HttpError(
                'Registration failed',
                500
            );
            return next(error);
        }

        if (existingUser) {
            const error = new HttpError(
                'User already exists, please login.',
                422
            );
            return next(error);
        }

        const newUser = new User({
            username,
            email,
            password,
        });

    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError(
            'Could not register new user', 500
        );
        return next(error);
    };
    
    res.status(200).json({user: newUser.toObject({ getters: true })
     });
};

//How do I pull username out of the already registered user
//in this loginUser function?
const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    
    let existingUser;

        try {
             existingUser = await User.findOne({ email: email })
        } catch (err) {
            const error = new HttpError(
                'Login failed',
                500
            );
            return next(error);
        }

        if (!existingUser || existingUser.password !== password) {
            const error = new HttpError(
                'Login failed',
                401
            );
            return next(error);
        }

        res.json({message: 'Login successful'});
    };

//exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;