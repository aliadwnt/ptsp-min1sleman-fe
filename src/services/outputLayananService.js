import axios from 'axios';

const API_URL = '/api_s/output-layanan'; 

export const fetchOutputLayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching output layanan:', error);
        throw error; 
    }
};

export const createOutputLayanan = async (outputLayanan) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(API_URL, outputLayanan, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Created output layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add output layanan:', error);
        throw error; 
    }
};

export const updateOutputLayanan = async (id, outputLayanan) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await axios.put(`${API_URL}/${id}`, outputLayanan, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log('Updated output layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating output layanan:', error);
        throw error; 
    }
};

export const deleteOutputLayanan = async (id) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log('Deleted output layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting output layanan:', error);
        throw error; 
    }
};