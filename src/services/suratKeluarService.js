import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/surat-keluar'; 

export const fetchSuratKeluar = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Surat Keluar:', error);
        throw error; 
    }
};

export const createSuratKeluar = async (SuratKeluar) => {
    try {
        const response = await axios.post(API_URL, SuratKeluar, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Surat Keluar:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Surat Keluar:', error);
        throw error; 
    }
};

export const updateSuratKeluar = async (id, SuratKeluar) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, SuratKeluar, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Surat Keluar:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Surat Keluar:', error);
        throw error; 
    }
};

export const deleteSuratKeluar = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Surat Keluar:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Surat Keluar:', error);
        throw error; 
    }
};