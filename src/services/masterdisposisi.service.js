import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/master-disposisi'; 

export const fetchMasterDisposisi = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Fetched Master Disposisi from API:', response.data); // Log response data
        return response.data; // Pastikan ini mengembalikan data yang benar
    } catch (error) {
        console.error('Error fetching Master Disposisi:', error);
        throw error;
    }
};



export const createMasterDisposisi = async (masterdisposisi) => {
    try {
        const response = await axios.post(API_URL, masterdisposisi, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Created Master Disposisi:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating Master Disposisi:', error);
        throw error;
    }
};

export const updateMasterDisposisi = async (id, masterdisposisi) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, masterdisposisi, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Updated master disposisi:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error updating master disposisi:', error);
        throw error;
    }
};

export const deleteMasterDisposisi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted lmaster disposisi:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error deleting master disposisi:', error);
        throw error;
    }
};
