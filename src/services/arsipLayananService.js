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

export const saveArsipMasuk = async (ArsipLayanan) => {
    try {
        const response = await axios.post(`${API_URL}/arsip-masuk`, ArsipLayanan,  {
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
export const saveArsipKeluar = async (ArsipLayanan) => {
    try {
        const response = await axios.post(`${API_URL}/arsip-keluar`, ArsipLayanan,  {
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
