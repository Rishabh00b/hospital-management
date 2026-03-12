const mongoose = require('mongoose');

const patientSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age must be positive'],
        },
        gender: {
            type: String,
        },
        disease: {
            type: String,
            required: [true, 'Disease/Diagnosis is required'],
        },
        doctorAssigned: {
            type: String,
            required: [true, 'Doctor assigned is required'],
        },
        admissionDate: {
            type: Date,
            default: Date.now,
        },
        roomNumber: {
            type: String,
        },
        patientType: {
            type: String,
            enum: ['Inpatient', 'Outpatient'],
        },
        status: {
            type: String,
            default: 'Admitted',
        },
    },
    {
        timestamps: true,
    }
);

// Virtual for patientId if needed, but Mongoose _id is unique. 
// We can use a pre-save hook to generate a shorter ID if required by the user's specific "auto generated" request.
// For now, let's stick to Mongoose default _id or a simple counter.

module.exports = mongoose.model('Patient', patientSchema);
