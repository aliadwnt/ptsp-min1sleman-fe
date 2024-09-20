import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/jenis-layanan'; 

export const fetchJenisLayanan = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Fetched jenis layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching jenis layanan:', error);
        throw error;
    }
};

export const createJenisLayanan = async (JenisLayanan) => {
    try {
        const response = await axios.post(API_URL, JenisLayanan, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Created jenis layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error creating jenis layanan:', error);
        throw error;
    }
};

export const updateJenisLayanan = async (id, jenisLayanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, jenisLayanan, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Updated jenis layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error updating jenis layanan:', error);
        throw error;
    }
};

export const deleteJenisLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted jenis layanan:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting jenis layanan:', error);
        throw error;
    }
};
 