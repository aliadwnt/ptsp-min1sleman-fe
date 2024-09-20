import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/unit-pengolah'; 

export const fetchUnitPengolah = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Syarat Layanan:', error);
        throw error; 
    }
};

// Buat Syarat Layanan baru
export const createUnitPengolah = async (UnitPengolah) => {
    try {
        const response = await axios.post(API_URL, UnitPengolah, {
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

export const updateUnitPengolah = async (id, UnitPengolah) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, UnitPengolah, {
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

export const deleteUnitPengolah = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Syarat Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Syarat Layanan:', error);
        throw error; 
    }
};