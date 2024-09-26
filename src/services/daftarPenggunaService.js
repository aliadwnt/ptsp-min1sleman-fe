import axios from 'axios';

const API_URL = 'http://localhost:3000/api_s/users'; 

export const fetchDaftarPengguna = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching daftar pengguna:', error);
        throw error; 
    }
};

// Buat Pengguna baru
export const createDaftarPengguna = async (DaftarPengguna) => {
    try {
        const response = await axios.post(API_URL, DaftarPengguna, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created pengguna:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add pengguna:', error);
        throw error; 
    }
};

export const updateDaftarPengguna = async (id, DaftarPengguna) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, DaftarPengguna, {
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

export const deleteDaftarPengguna = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted pengguna:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting pengguna:', error);
        throw error; 
    }
};

// daftarPenggunaService.js
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
