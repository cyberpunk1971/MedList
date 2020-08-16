const mongoose = require('mongoose');

const MedSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    gname: {
        type: String,
        default: ''
    },
    form: {
        type: String,
        default: ''
    },
    dose: {
        type: String,
        default: ''
    },
    route: {
        type: String,
        default: ''
    },
    frequency: {
        type: String,
        default: ''
    },
    fdaid: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
        default: ''
    }
});

// MedSchema.methods.serialize = function() {
//     return {
//       name: this.name || '',
//       gname: this.gname || '',
//       form: this.form || '',
//       dose: this.dose || '',
//       route: this.route || '',
//       frequency: this.frequency || '',
//       fdaid: this.fdaid || '',
//       id: this._id || ''
  
//     };
//   };

const Medication = mongoose.model('Medication', MedSchema);
module.exports =  {Medication};

