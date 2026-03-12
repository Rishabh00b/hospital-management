import React, { useState, useEffect } from 'react';
import { getPatients, createPatient, updatePatient, deletePatient, searchPatients } from '../services/api';
import PatientForm from '../components/PatientForm';
import PatientTable from '../components/PatientTable';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [editingPatient, setEditingPatient] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await getPatients();
            setPatients(res.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleAddPatient = async (data) => {
        try {
            await createPatient(data);
            fetchPatients();
            setShowForm(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding patient');
        }
    };

    const handleUpdatePatient = async (data) => {
        try {
            await updatePatient(editingPatient._id, data);
            fetchPatients();
            setEditingPatient(null);
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating patient');
        }
    };

    const handleDeletePatient = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await deletePatient(id);
                fetchPatients();
            } catch (error) {
                console.error('Error deleting patient:', error);
            }
        }
    };

    const handleSearch = async (term) => {
        if (!term) {
            fetchPatients();
            return;
        }
        try {
            // Searching by name or disease (simplified search in one query)
            const resByName = await searchPatients({ name: term });
            const resByDisease = await searchPatients({ disease: term });
            
            // Merge and de-duplicate
            const combined = [...resByName.data, ...resByDisease.data];
            const unique = combined.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);
            setPatients(unique);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Hospital Patient Management</h1>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Close Form' : 'Add Patient'}
                </button>
            </header>

            <main>
                <SearchBar onSearch={handleSearch} />
                
                {(showForm || editingPatient) && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <PatientForm 
                                onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient} 
                                initialData={editingPatient}
                                onCancel={() => {
                                    setEditingPatient(null);
                                    setShowForm(false);
                                }}
                            />
                        </div>
                    </div>
                )}

                <PatientTable 
                    patients={patients} 
                    onEdit={setEditingPatient} 
                    onDelete={handleDeletePatient} 
                />
            </main>
        </div>
    );
};

export default Dashboard;
