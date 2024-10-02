import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/layanan'; 

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