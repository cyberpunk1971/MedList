const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


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
        required: true,
        minlength: 8,
        maxlength: 72
    },
    medications: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'Medication',
         unique: false,
         required: [true, 'No medication found']
        }
    ]
});

UserSchema.plugin(uniqueValidator);

// UserSchema.methods.serialize = function() {
//     return {
//       username: this.username || '',
//       email: this.email || '',
//       medications: this.medications || '',
//       id: this._id || ''
//     };
//   };

const User = mongoose.model('User', UserSchema);
module.exports = { User };