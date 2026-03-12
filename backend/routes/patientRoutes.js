const express = require('express');
const router = express.Router();
const {
    registerPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatients,
} = require('../controllers/patientController');

router.get('/search', searchPatients); // Must be before /:id
router.route('/').get(getPatients).post(registerPatient);
router.route('/:id').get(getPatientById).put(updatePatient).delete(deletePatient);

module.exports = router;
