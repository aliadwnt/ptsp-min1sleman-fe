import axios from 'axios';

const API_URL = '/api_s/lacak-berkas';

export const fetchLacakBerkas = async (no_reg) => {
    if (!no_reg) {
        throw new Error('Nomor registrasi tidak boleh kosong');
    }
    try {
        const response = await axios.get(`${API_URL}/${no_reg}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching lacak berkas:', error);
        throw error; 
    }
};
export const fetchLoadArsip = async (no_reg) => {
    if (!no_reg) {
        throw new Error('Nomor registrasi tidak boleh kosong');
    }
    try {
        const response = await axios.get(`${API_URL}/load-arsip/?no_reg=${no_reg}`);
        console.log('Fetched arsip:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching arsip:', error.response?.data || error.message);
        throw error;
    }
};