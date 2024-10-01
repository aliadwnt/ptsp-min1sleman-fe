import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/lacak-permohonan'; 

export const fetchLacakPermohononan = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Fetched jenis layanan:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching jenis layanan:', error);
        throw error;
    }
};
