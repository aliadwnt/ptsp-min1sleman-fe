import axios from 'axios';

const API_URL = '/api_s/layanan'; 

// Fetch all daftar pelayanan
export const fetchDaftarPelayanan = async (DaftarLayanan) => {
    try {
        const response = await axios.get(`${API_URL}`, DaftarLayanan); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Daftar Pelayanan:', error);
        throw error; 
    }
};

// Fetch daftar pelayanan by ID
export const fetchDaftarPelayananById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Daftar Pelayanan By Id:', error);
        throw error; 
    }
};

// Create daftar pelayanan
export const createDaftarPelayanan = async (DaftarPelayanan) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/create-layanan`, DaftarPelayanan, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Created DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add DaftarPelayanan:', error);
        throw error; 
    }
};

// Fetch nomor registrasi
export const fetchNomorRegistrasi = async (no_reg) => {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          no_reg,
        },
      });
      if (response.data.length > 0) {
        return response.data[0].no_reg; 
      }
      throw new Error('Nomor registrasi tidak ditemukan.');
    } catch (error) {
      console.error("Error fetching nomor registrasi:", error);
      throw error; 
    }
  };

// Update daftar pelayanan
export const updateDaftarPelayanan = async (id, DaftarPelayanan) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/${id}`, DaftarPelayanan, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Updated DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating DaftarPelayanan:', error);
        throw error; 
    }
};

// Delete daftar pelayanan
export const deleteDaftarPelayanan = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Deleted DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting DaftarPelayanan:', error);
        throw error; 
    }
};

// Preview PDF
export const previewPdf = async (no_reg) => {
    try {
        const response = await axios.get(`${API_URL}/preview/${no_reg}`);
        return response.data; 
    } catch (error) {
        console.error('Error previewing PDF:', error);
        throw error; 
    }
};

// Export to PDF
export const exportPdf = async (DaftarPelayanan) => {
    try {
        const response = await axios.post(`${API_URL}/exportPdf`, DaftarPelayanan);
        console.log('Exported PDF:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error exporting PDF:', error);
        throw error; 
    }
};
