import React from 'react';

const PatientTable = ({ patients, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Disease</th>
                        <th>Doctor</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.fullName}</td>
                            <td>{patient.age}</td>
                            <td>{patient.disease}</td>
                            <td>{patient.doctorAssigned}</td>
                            <td>{patient.patientType}</td>
                            <td><span className={`status ${patient.status.toLowerCase()}`}>{patient.status}</span></td>
                            <td className="actions">
                                <button className="btn-edit" onClick={() => onEdit(patient)}>Edit</button>
                                <button className="btn-delete" onClick={() => onDelete(patient._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {patients.length === 0 && <tr><td colSpan="7" style={{textAlign: 'center'}}>No patients found</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
