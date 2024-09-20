import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/master-disposisi'; 

export const fetchMasterDisposisi = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Master disposisi:', error);
        throw error; 
    }
};

// Buat Master Disposisi baru
export const createMasterDisposisi = async (MasterDisposisi) => {
    try {
        const response = await axios.post(API_URL, MasterDisposisi, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Master Disposisi:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Master Disposisi:', error);
        throw error; 
    }
};

export const updateMasterDisposisi = async (id, MasterDisposisi) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, MasterDisposisi, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Master Disposisi:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Master Disposisi:', error);
        throw error; 
    }
};

export const deleteMasterDisposisi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Master Disposisi:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Master Disposisi:', error);
        throw error; 
    }
};
