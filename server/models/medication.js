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
    }
});

const Medication = mongoose.model('Medication', MedSchema);
module.exports = { Medication };

