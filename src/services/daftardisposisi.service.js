import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/daftar-disposisi'; 

export const fetchDaftarDisposisi = async () => {
    try {
        const response = await fetch('http://localhost:3000/api_s/daftar-disposisi');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error; // Re-throw the error for handling in the component
    }
};


export const createDaftarDisposisi = async (daftardisposisi) => {
    try {
        const response = await axios.post('http://localhost:3000/api_s/daftar-disposisi', daftardisposisi, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Created Daftar Disposisi:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating Daftar Disposisi:', error);
        throw error;
    }
};

export const updateDaftarDisposisi = async (id, daftardisposisi) => {
    try {
        const response = await axios.put(`${'http://localhost:3000/api_s/daftar-disposisi'}/${id}`, daftardisposisi, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Updated daftar disposisi:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating daftar disposisi:', error);
        throw error;
    }
};

export const deleteDaftarDisposisi = async (id) => {
    try {
        const response = await axios.delete(`${'http://localhost:3000/api_s/daftar-disposisi'}/${id}`);
        console.log('Deleted daftar disposisi:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting daftar disposisi:', error);
        throw error;
    }
};
