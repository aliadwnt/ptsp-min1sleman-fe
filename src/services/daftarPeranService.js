import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/users';

export const fetchDaftarPeran = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching daftar peran:', error);
        throw error;
    }
};

export const createDaftarPeran = async ({ name, is_admin }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, is_admin }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created pengguna:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to add pengguna:', error);
        throw new Error(error.response?.data?.message || 'Failed to register user');
    }
};

export const updateDaftarPeran = async (id, { name, is_admin }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { name, is_admin }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated pengguna:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating pengguna:', error);
        throw error;
    }
};

export const deleteDaftarPeran = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted pengguna:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting pengguna:', error);
        throw error;
    }
};
