const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const {Medication} = require('../models/medication');
const {User} = require('../models/user');

// const getMeds = async (req, res, next) => {
//     let meds;
    
//     try {
//         meds = Medication.find({}, '-password');
//     } catch (err) {
//         const error = new HttpError(
//             'Cannot retrieve medications',
//             500
//         );
//         return next(error);
//     }
//     res.json({meds: meds.map(med => med.toObject({ getters: true }) )})
// };

const getMedById = async (req, res, next) => {
    const medId = req.params.mid;

    let med;
    try {
         med = await Medication.findById(medId);
    } catch (err) {
        const error = new HttpError(
            'Could not find medication', 500
        );
        
        return next(error);
    }

    if (!med) {
        const error = new HttpError(
            'Could not find a medication for the provided ID.',
             404
        );
        return next(error);
    } 

    res.json({med: med.toObject({getters: true}) });
};

const getMedsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let meds;
    try {
         meds = await Medication.find({creator: userId});
    } catch (err) {
        const error = new HttpError(
            'Could not find medications with that ID.',
            500
        );
        return next(error);
    }

   

    if (!meds || meds.length === 0) {
        return next(new HttpError('Could not find medications for the provided user ID.', 404));
    }
    
    res.json({meds: meds.map(meds => meds.toObject({getters: true}))})
}

const createMed = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Name field cannot be empty', 422);
    }
    const {
        name,
        gname,
        form,
        dose, 
        route, 
        frequency,
        fdaid, 
        creator
    } = req.body;

    const createdMed = new Medication({
        name,
        gname,
        form, 
        dose,
        route,
        frequency,
        fdaid,
        creator
    }); 

    let user;

    try {
        user = await User.findById(creator);
        
        } catch (err) {
            const error = new HttpError(
                'Could not add medication',
                500
            );
            console.error(error);
            return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for that ID, 404');
        return next (error);
    }

    console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdMed.save({session: sess});
        user.medications.push(createdMed);
        await user.save({session: sess});
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError(
            'Could not create medication.', 500
        );
        return next(error);
    }

    res.status(201).json({med: createdMed})
};

const editMed = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid input, please check your request', 422
        );
    }
    const { name, gname, form, dose, route, frequency } = req.body;
    const medId = req.params.mid;

    let med;
    try {
        med = await Medication.findById(medId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not edit medication',
            500
        );
        return next(error);
    }
    
    med.name = name;
    med.gname = gname;
    med.form = form;
    med.dose = dose;
    med.route = route;
    med.frequency = frequency;

    try {
        await med.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not edit medication',
            500
        );
        return next(error);
    }

    res.status(200).json({med: med.toObject({ getters: true }) });
};

const deleteMed = async (req, res, next) => {
    const medId = req.params.mid;

    let med;
    try {
       med = await Medication.findById(medId).populate('creator');
    } catch (err) {
        const error = new HttpError(
            'Could not find that medication.',
            500
        );
        return next(error);
    }

    if (!med) {
        const error = new HttpError('Could not find medication for that ID', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await med.remove({session: sess});
        med.creator.medications.pull(med);
        await med.creator.save({session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Could not delete that medication',
            500
        );
        return next(error);
    }
    res.status(200).json({message: 'Medication deleted.'});
};

//exports.getMeds = getMeds;
exports.getMedById = getMedById;
exports.getMedsByUserId = getMedsByUserId;
exports.createMed = createMed;
exports.editMed = editMed;
exports.deleteMed = deleteMed;