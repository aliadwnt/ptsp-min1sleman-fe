import axios from 'axios';

const API_URL = '/api_s/layanan'; 

export const fetchDaftarPelayanan = async (DaftarLayanan) => {
    try {
        const response = await axios.get(`${API_URL}`, DaftarLayanan); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Daftar Pelayanan:', error);
        throw error; 
    }
};

export const fetchDaftarPelayananById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching Daftar Pelayanan By Id:', error);
        throw error; 
    }
};

export const createDaftarPelayanan = async (DaftarPelayanan) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await axios.post(API_URL, DaftarPelayanan, {
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

export const fetchNomorRegistrasi = async (no_reg) => {
    try {
      const response = await axios.get(API_URL, {
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


export const deleteDaftarPelayanan = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-layanan/${id}`);
        console.log('Deleted DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error deleting DaftarPelayanan:', error);
        throw error; 
    }
};