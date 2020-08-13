const mongoose = require('mongoose');
const medSchema = require('./medication');


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    medications: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'Medication', unique: false, required: [true, 'No medication found']
        }
    ]
});

const User = mongoose.model('User', UserSchema);
module.exports = { User };