import axios from 'axios';

const API_URL = '/api_s/layanan'; 

export const createDaftarPelayanan = async (DaftarPelayanan) => {
    try {
        const response = await axios.post(`${API_URL}/create-layanan`, DaftarPelayanan, {
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