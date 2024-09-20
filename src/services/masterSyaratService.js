import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/master-syarat'; 

export const fetchMasterSyarat = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Master Syarat:', error);
        throw error; 
    }
};

// Buat Master Syarat baru
export const createMasterSyarat = async (MasterSyarat) => {
    try {
        const response = await axios.post(API_URL, MasterSyarat, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created Master Syarat:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add Master Syarat:', error);
        throw error; 
    }
};

export const updateMasterSyarat = async (id, MasterSyarat) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, MasterSyarat, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated Master Syarat:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating Master Syarat:', error);
        throw error; 
    }
};

export const deleteMasterSyarat = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted Master Syarat:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting Master Syarat:', error);
        throw error; 
    }
};
