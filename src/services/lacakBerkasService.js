import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/lacak-berkas';

export const fetchLacakBerkas = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Fetched Data Berkas:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data berkas:', error);
        throw error;
    }
};


export const fetchLoadArsip = async (no_reg) => {
    try {
        const response = await axios.get(`${API_URL}/load-arsip/?no_reg=${no_reg}`);
        console.log('Fetched arsip:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching arsip:', error);
        throw error;
    }
};
