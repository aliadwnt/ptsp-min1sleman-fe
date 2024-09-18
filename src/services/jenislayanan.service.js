import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/jenis-layanan'; 

export const fetchJenisLayanan = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Fetched layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching layanan:', error);
        throw error;
    }
};

export const createJenisLayanan = async (layanan) => {
    try {
        const response = await axios.post(API_URL, layanan, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Created layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error creating layanan:', error);
        throw error;
    }
};

export const updateJenisLayanan = async (id, layanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, layanan, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Updated layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error updating layanan:', error);
        throw error;
    }
};

export const deleteJenisLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted layanan:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting layanan:', error);
        throw error;
    }
};
 