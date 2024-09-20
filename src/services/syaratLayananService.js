import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/syarat-layanan'; 

export const fetchSyaratLayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Syarat Layanan:', error);
        throw error; 
    }
};

// Buat Syarat Layanan baru
export const createSyaratLayanan = async (SyaratLayanan) => {
    try {
        const response = await axios.post(API_URL, SyaratLayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Syarat Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Syarat Layanan:', error);
        throw error; 
    }
};

export const updateSyaratLayanan = async (id, SyaratLayanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, SyaratLayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Syarat Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Syarat Layanan:', error);
        throw error; 
    }
};

export const deleteSyaratLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Syarat Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Syarat Layanan:', error);
        throw error; 
    }
};