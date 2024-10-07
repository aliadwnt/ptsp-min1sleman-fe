import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/unit-pengolah'; 

export const fetchUnitPengolah = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Syarat Layanan:', error);
        throw error; 
    }
};

export const createUnitPengolah = async (UnitPengolah) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(API_URL, UnitPengolah, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Created Unit Pengolah:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Unit Pengolah:', error);
        throw error; 
    }
};

export const updateUnitPengolah = async (id, UnitPengolah) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(`${API_URL}/${id}`, UnitPengolah, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Updated Unit Pengolah:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Unit Pengolah:', error);
        throw error; 
    }
};

export const deleteUnitPengolah = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Deleted Unit Pengolah:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Unit Pengolah:', error);
        throw error; 
    }
};
