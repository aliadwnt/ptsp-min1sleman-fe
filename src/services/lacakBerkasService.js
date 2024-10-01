import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/lacak-berkas'; 
const API_URL_1 = 'http://localhost:3000/api_s/lacak-berkas/load-arsip/:no_reg';

export const fetchLacakBerkas = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Fetched lacak berkas:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching lacak berkas:', error);
        throw error;
    }
};

export const fetchLoadArsip = async () => {
    try {
        const response = await axios.get(API_URL_1);
        console.log('Fetched arsip:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching arsip:', error);
        throw error;
    }
};
