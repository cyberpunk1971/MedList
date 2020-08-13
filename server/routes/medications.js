const express = require('express');

const medControllers = require('../controllers/medications-controller');

const router = express.Router();

router.get('/:mid', medControllers.getMedById);

router.get('/user/:uid', medControllers.getMedsByUserId);

router.post('/', medControllers.createMed);

router.patch('/:mid', medControllers.editMed);

router.delete('/:mid', medControllers.deleteMed);

module.exports = router;