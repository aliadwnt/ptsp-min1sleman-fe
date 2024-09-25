import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/layanan'; 

export const fetchDaftarPelayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching DaftarPelayanan:', error);
        throw error; 
    }
};

// Buat DaftarPelayanan baru
export const createDaftarPelayanan = async (DaftarPelayanan) => {
    try {
        const response = await axios.post(API_URL, DaftarPelayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add DaftarPelayanan:', error);
        throw error; 
    }
};

export const updateDaftarPelayanan = async (id, DaftarPelayanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, DaftarPelayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating DaftarPelayanan:', error);
        throw error; 
    }
};

export const deleteDaftarPelayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting DaftarPelayanan:', error);
        throw error; 
    }
};