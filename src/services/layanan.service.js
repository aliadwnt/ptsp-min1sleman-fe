import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/layanan'; 

export const fetchLayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching layanan:', error);
        throw error; 
    }
};

// Buat layanan baru
export const createLayanan = async (layanan) => {
    try {
        const response = await axios.post(API_URL, layanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add layanan:', error);
        throw error; 
    }
};

export const updateLayanan = async (id, layanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, layanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating layanan:', error);
        throw error; 
    }
};

export const deleteLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting layanan:', error);
        throw error; 
    }
};
