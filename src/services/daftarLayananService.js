import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/daftar-layanan'; 

export const fetchDaftarLayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Daftar Layanan:', error);
        throw error; 
    }
};

// Buat Daftar Layanan baru
export const createDaftarLayanan = async (DaftarLayanan) => {
    try {
        const response = await axios.post(API_URL, DaftarLayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Daftar Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Daftar Layanan:', error);
        throw error; 
    }
};

export const updateDaftarLayanan = async (id, DaftarLayanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, DaftarLayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Daftar Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Daftar Layanan:', error);
        throw error; 
    }
};

export const deleteDaftarLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Daftar Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Daftar Layanan:', error);
        throw error; 
    }
};