import axios from 'axios';

const API_URL = '/api_s/lacak-permohonan';

export const fetchLacakPermohonan = async (no_reg) => {
    try {
        const response = await axios.get(`${API_URL}?no_reg=${no_reg}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error; 
    }
};

export const fetchLacakPermohonanById = async (id) => {
    try {
        const response = await axios.get(`/api_s/lacak-permohonan/${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Data Permohonan By Id:', error);
        throw error; 
    }
};