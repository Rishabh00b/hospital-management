import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/patients`;

export const getPatients = async () => {
    return await axios.get(API_URL);
};

export const getPatientById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createPatient = async (patientData) => {
    return await axios.post(API_URL, patientData);
};

export const updatePatient = async (id, patientData) => {
    return await axios.put(`${API_URL}/${id}`, patientData);
};

export const deletePatient = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const searchPatients = async (query) => {
    const { name, disease } = query;
    let url = `${API_URL}/search?`;
    if (name) url += `name=${name}&`;
    if (disease) url += `disease=${disease}`;
    return await axios.get(url);
};
