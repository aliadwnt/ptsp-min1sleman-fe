import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/daftar-disposisi'; 

export const fetchDaftarDisposisi = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching daftar disposisi:', error);
        throw error; 
    }
};

// Buat Daftar Disposisi baru
export const createDaftarDisposisi = async (DaftarDisposisi) => {
    try {
        const response = await axios.post(API_URL, DaftarDisposisi, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Daftar Disposisi:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Daftar Disposisi:', error);
        throw error; 
    }
};

export const updateDaftarDisposisi = async (id, DaftarDisposisi) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, DaftarDisposisi, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Daftar Disposisi:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Daftar Disposisi:', error);
        throw error; 
    }
};

export const deleteDaftarDisposisi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Daftar Disposisi:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Daftar Disposisi:', error);
        throw error; 
    }
};
