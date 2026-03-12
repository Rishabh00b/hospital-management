import React, { useState, useEffect } from 'react';

const PatientForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        age: '',
        gender: '',
        disease: '',
        doctorAssigned: '',
        roomNumber: '',
        patientType: 'Outpatient',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="patient-form" onSubmit={handleSubmit}>
            <h3>{initialData ? 'Edit Patient' : 'Add New Patient'}</h3>
            <div className="form-grid">
                <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input name="disease" placeholder="Disease/Diagnosis" value={formData.disease} onChange={handleChange} required />
                <input name="doctorAssigned" placeholder="Doctor Assigned" value={formData.doctorAssigned} onChange={handleChange} required />
                <input name="roomNumber" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} />
                <select name="patientType" value={formData.patientType} onChange={handleChange}>
                    <option value="Inpatient">Inpatient</option>
                    <option value="Outpatient">Outpatient</option>
                </select>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-primary">{initialData ? 'Update' : 'Add'}</button>
                {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
};

export default PatientForm;
