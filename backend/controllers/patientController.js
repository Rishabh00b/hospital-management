const Patient = require('../models/Patient');

// @desc    Register a new patient
// @route   POST /patients
// @access  Public
const registerPatient = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, age, gender, disease, doctorAssigned, roomNumber, patientType } = req.body;

        if (!fullName || !email || !phoneNumber || !age || !disease || !doctorAssigned) {
            res.status(400);
            throw new Error('Please include all required fields');
        }

        const patientExists = await Patient.findOne({ email });

        if (patientExists) {
            res.status(400);
            throw new Error('Patient already exists');
        }

        const patient = await Patient.create({
            fullName,
            email,
            phoneNumber,
            age,
            gender,
            disease,
            doctorAssigned,
            roomNumber,
            patientType,
        });

        if (patient) {
            res.status(201).json(patient);
        } else {
            res.status(400);
            throw new Error('Invalid patient data');
        }
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Get all patients
// @route   GET /patients
// @access  Public
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get patient by ID
// @route   GET /patients/:id
// @access  Public
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            res.status(404);
            throw new Error('Patient not found');
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Update patient
// @route   PUT /patients/:id
// @access  Public
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            res.status(404);
            throw new Error('Patient not found');
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(res.statusCode || 500).json({ message: error.message });
    }
};

// @desc    Delete patient
// @route   DELETE /patients/:id
// @access  Public
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient removed' });
    } catch (error) {
        console.error('Delete Error:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Patient ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search patients
// @route   GET /patients/search
// @access  Public
const searchPatients = async (req, res) => {
    try {
        const { name, disease } = req.query;
        let query = {};

        if (name) {
            query.fullName = { $regex: name, $options: 'i' };
        }
        if (disease) {
            query.disease = { $regex: disease, $options: 'i' };
        }

        const patients = await Patient.find(query);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatients,
};
