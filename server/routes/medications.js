const express = require('express');

const { check } = require('express-validator');

const medControllers = require('../controllers/medications-controller');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.get('/:mid', medControllers.getMedById);

router.get('/user/:uid', medControllers.getMedsByUserId);

//router.get('/', medControllers.getMeds);
router.use(checkAuth);

router.post('/',
 check('name')
.not()
.isEmpty(),
medControllers.createMed);
 
router.patch('/:mid', 
 check('name')
.not()
.isEmpty(), medControllers.editMed);

router.delete('/:mid', medControllers.deleteMed);

module.exports = router;