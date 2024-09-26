import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/layanan-arsip'; 

export const fetchArsipLayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching arsip layanan:', error);
        throw error; 
    }
};

export const createArsipLayanan = async (ArsipLayanan) => {
    try {
        const response = await axios.post(API_URL, ArsipLayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created arsip layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add arsip layanan:', error);
        throw error; 
    }
};

export const updateArsipLayanan = async (id, ArsipLayanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, ArsipLayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated arsip layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating arsip layanan:', error);
        throw error; 
    }
};

export const deleteArsipLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted arsip layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting arsip layanan:', error);
        throw error; 
    }
};
