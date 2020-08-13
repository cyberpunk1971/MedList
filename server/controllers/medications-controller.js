const {v4:uuidv4} = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_MEDS = [
    {
        id: 'm1',
        name: 'tylenol',
        gname: 'acetaminophen',
        dose: '350mg',
        route: 'oral',
        frequency: 'as needed',
        fdaid: 'm1234',
        creator: 'u1'
    }
];

const getMedById = (req, res, next) => {
    const medId = req.params.mid;

    const med = DUMMY_MEDS.find(m => {
        return m.id === medId;
    });

    if (!med) {
        throw new HttpError('Could not find a medication for the provided ID.', 404)
    } 

    res.json({med})
}

const getMedsByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const meds = DUMMY_MEDS.filter(m => {
        return m.creator === userId;
    });

    if (!meds || meds.length === 0) {
        return next(new HttpError('Could not find medications for the provided user ID.', 404));
    }
    
    res.json({meds})
}

const createMed = (req, res, next) => {
    const { name, gname, form, dose, route, frequency, fdaid, creator} = req.body;
    const createdMed = {
        id:uuidv4(),
        name,
        gname,
        form,
        dose,
        route,
        frequency,
        fdaid,
        creator
    };
    DUMMY_MEDS.push(createdMed);
    res.status(201).json({med: createdMed})
};

const editMed = (req, res, next) => {
    const { name, gname, form, dose, route, frequency } = req.body;
    const medId = req.params.mid;

    const editedMed = {...DUMMY_MEDS.find(m => m.id === medId)};
    const medIndex = DUMMY_MEDS.findIndex(m => m.id === medId);
    editedMed.name = name;
    editedMed.gname = gname;
    editedMed.form = form;
    editedMed.dose = dose;
    editedMed.route = route;
    editedMed.frequency = frequency;

    DUMMY_MEDS[medIndex] = editedMed;

    res.status(200).json({med: editedMed});
};

const deleteMed = (req, res, next) => {
    const medId = req.params.mid;
    DUMMY_MEDS = DUMMY_MEDS.filter(m => m.id !== medId);
    res.status(200).json({message: 'Medication deleted.'});
};

exports.getMedById = getMedById;
exports.getMedsByUserId = getMedsByUserId;
exports.createMed = createMed;
exports.editMed = editMed;
exports.deleteMed = deleteMed;