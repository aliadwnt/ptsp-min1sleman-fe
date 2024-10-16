import axios from 'axios';

const API_URL = '/api_s/layanan-arsip';

export const fetchArsipLayanan = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching arsip layanan:', error);
        throw error;
    }
};

export const saveArsipMasuk = async (arsipLayanan) => {
    try {
        const response = await axios.post(`${API_URL}/arsip-masuk`, arsipLayanan, {
            headers: {
                'Content-Type': arsipLayanan instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        });
        console.log('Created arsip layanan:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to add arsip layanan:', error);
        throw error;
    }
};

export const saveArsipKeluar = async (arsipLayanan) => {
    try {
        const response = await axios.post(`${API_URL}/arsip-keluar`, arsipLayanan, {
            headers: {
                'Content-Type': arsipLayanan instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        });
        console.log('Created arsip layanan:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to add arsip layanan:', error);
        throw error;
    }
};

export const fetchArsipMasukById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/arsip-masuk/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching arsip masuk:', error);
        throw error;
    }
};

export const fetchArsipKeluarById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/arsip-keluar/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching arsip keluar:', error);
        throw error;
    }
};

export const searchArsipLayanan = async (searchTerm) => {
    try {
        const response = await axios.get(`${API_URL}/search/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error searching arsip layanan:', error);
        throw error;
    }
};
