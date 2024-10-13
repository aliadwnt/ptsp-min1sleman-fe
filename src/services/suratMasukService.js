import axios from 'axios';

const API_URL = '/api_s/surat-masuk'; 

export const fetchSuratMasuk = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Surat Masuk:', error);
        throw error; 
    }
};

export const createSuratMasuk = async (SuratMasuk) => {
    try {
        const response = await axios.post(API_URL, SuratMasuk, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Surat Masuk:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add SuratMasuk:', error);
        throw error; 
    }
};

export const updateSuratMasuk = async (id, SuratMasuk) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, SuratMasuk, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Surat Masuk:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Surat Masuk:', error);
        throw error; 
    }
};

export const deleteSuratMasuk = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Surat Masuk:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Surat Masuk:', error);
        throw error; 
    }
};