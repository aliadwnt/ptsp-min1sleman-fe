import axios from 'axios';

// Ganti ini dengan URL yang benar untuk backend Anda
const API_URL = 'http://localhost:3000/api_s/layanan'; // Pastikan ini sesuai dengan API backend Anda


// Ambil semua layanan
export const fetchLayanan = async () => {
    try {
        const response = await axios.get(API_URL); // Gunakan axios untuk konsistensi
        return response.data; // Kembalikan data langsung
    } catch (error) {
        console.error('Error fetching layanan:', error);
        throw error; // Lempar error untuk ditangani di komponen
    }
};

// Buat layanan baru
export const createLayanan = async (layanan) => {
    try {
        const response = await axios.post(API_URL, layanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created layanan:', response.data);
        return response.data; // Kembalikan data yang dibuat
    } catch (error) {
        console.error('Error creating layanan:', error);
        throw error; // Tangani error di komponen
    }
};

// Perbarui layanan yang ada
export const updateLayanan = async (id, layanan) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, layanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Updated layanan:', response.data); // Log data respons
        return response.data; // Kembalikan data yang diperbarui
    } catch (error) {
        console.error('Error updating layanan:', error);
        throw error; // Tangani error di komponen
    }
};

// Hapus layanan
export const deleteLayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log('Deleted layanan:', response.data); // Log data respons
        return response.data; // Kembalikan data respons
    } catch (error) {
        console.error('Error deleting layanan:', error);
        throw error; // Tangani error di komponen
    }
};
