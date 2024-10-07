import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/daftar-layanan'; 

export const fetchDaftarLayanan = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Daftar Layanan:', error);
        throw error; 
    }
};

export const createDaftarLayanan = async (DaftarLayanan) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await axios.post(API_URL, DaftarLayanan, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log('Created Daftar Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Daftar Layanan:', error);
        throw error; 
    }
};

export const updateDaftarLayanan = async (id, DaftarLayanan) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await axios.put(`${API_URL}/${id}`, DaftarLayanan, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log('Updated Daftar Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Daftar Layanan:', error);
        throw error; 
    }
};

export const deleteDaftarLayanan = async (id) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log('Deleted Daftar Layanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Daftar Layanan:', error);
        throw error; 
    }
};
