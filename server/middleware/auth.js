require('dotenv').config();
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
         
    if (!token) {
        throw new Error('Authentication failed!')
    }
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed.', 401);
        console.log(error);
        return next(error);
    }
};