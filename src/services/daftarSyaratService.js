import axios from "axios";

const API_URL = "/api_s/daftar-syarat";

export const fetchDaftarSyarat = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Syarat Layanan:", error);
    throw error;
  }
};


export const updateDaftarSyarat = async (DaftarSyarat) => {
  try {
    console.log("Data yang akan diupdate:", DaftarSyarat); // Debug data sebelum dikirim

    const response = await axios.put(`${API_URL}/update`, DaftarSyarat, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Updated Syarat Layanan:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating Syarat Layanan:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteDaftarSyarat = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    console.log("Deleted Syarat Layanan:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting Syarat Layanan:", error);
    throw error;
  }
};

export const searchDaftarSyarat = async (selectedUnit, searchTerm) => {
  try {
    const response = await axios.get(
      `${API_URL}/search?searchTerm=${searchTerm}&selectedUnit=${selectedUnit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error search Syarat Layanan:", error);
    throw error;
  }
};

export const fetchDaftarSyaratById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/edit/${id}`);
    console.log("Deleted Syarat Layanan:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error get edit daftar syarat:", error);
    throw error;
  }
};