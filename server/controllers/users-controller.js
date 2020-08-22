require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const config = require('../config');


const { User } = require('../models/user');



const registerUser = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError('Invalid input', 422)
        );
    }
    const { 
        username,
        email, 
        password,
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

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
            const error = new HttpError(
                'Could not create user',
                500
            );
            return next(error);
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            medications: []
        });

    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError(
            'Could not register new user', 500
        );
        return next(error);
    };

    let token;
    try {
        token = jwt.sign({ userId: newUser.id, email: newUser.email }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });
    } catch (err) {
        const error = new HttpError(
            'Could not validate password, please try again.',
            500
        );
        console.log(error);
        return next(error);
    }
    
    res.status(201)
    .json({user: newUser.id, email: newUser.email, token: token
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

        if (!existingUser) {
            const error = new HttpError(
                'Login failed, bad password or user already exists.',
                401
            );
            return next(error);
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            const error = new HttpError(
                'Invalid password.',
                500
            );
            return next(error);
        }

        if (!isValidPassword) {
            const error = new HttpError(
                'Login failed, bad password or user already exists.',
                401
            );
            return next(error);
        }
        let token;
    try {
        token = jwt.sign({ 
             userId: existingUser.id,
             email: existingUser.email },
             config.JWT_SECRET,
             { expiresIn: config.JWT_EXPIRY }
            );
    } catch (err) {
        const error = new HttpError(
            'Could not validate password, please try again.',
            500
        );
        return next(error);
    }
        
        res.json({
            userId: existingUser.id,
            email: existingUser.email,
            token: token
        });
    };

//exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;