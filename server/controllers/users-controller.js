const {v4:uuidv4} = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        username: "userone",
        email: "test@email.com",
        password: "thepassword"
    }
];

const getUser = (req, res, next) => {
    res.json({user: DUMMY_USERS});
};

const registerUser = (req, res, next) => {
    const { username, email, password } = req.body;

    const userExists = DUMMY_USERS.find(u => u.email === email);
    if (userExists) {
        throw new HttpError('That email is already registered', 422);
    }

    const newUser = {
        id: uuidv4(),
        username,
        email,
        password
    };
    DUMMY_USERS.push(newUser);

    res.status(200).json({user: newUser});
};

//How do I pull username out of the already registered user
//in this loginUser function?
const loginUser = (req, res, next) => {
    const {email, password} = req.body;
    //const greetUser = DUMMY_USERS.find(u => u.username === username);
    const loggedInUser = DUMMY_USERS.find(u => u.email === email);
    console.log(req.body.username);
    if (!loggedInUser || loggedInUser.password !== password) {
        throw new HttpError('Login failed', 401);
        
    } 
     res.json({message: `Welcome ${username}`});
    

    
};

exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;