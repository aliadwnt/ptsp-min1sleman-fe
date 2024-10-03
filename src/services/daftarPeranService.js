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

export const loginPengguna = async ({ email, password }) => { 
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Login:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to login:', error);
        throw new Error(error.response?.data?.message || 'Failed to login user'); 
    }
};

export const createDaftarPeran = async (DaftarPeran) => {
    try {
        const response = await axios.post(`${API_URL}/register`, DaftarPeran, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created pengguna:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add pengguna:', error);
        throw new Error(error.response?.data?.message || 'Failed to register user'); // Provide a more descriptive error message
    }
};


export const updateDaftarPeran = async (id, DaftarPeran) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, DaftarPeran, {
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

export const getUserData = async () => {
    // Simulasi pengambilan data dari API atau database
    return {
        name: "User Name",
        email: "user.name@example.com",
        hasVerifiedEmail: false
    };
};

export const updateUserData = async (userData) => {
    // Simulasi API call untuk memperbarui data pengguna
    console.log("Data pengguna diperbarui:", userData);
    return true; // Simulasi respons sukses
};

export const sendEmailVerification = async () => {
    // Simulasi pengiriman email verifikasi
    console.log("Verifikasi email dikirim");
    return true; // Simulasi respons sukses
};
