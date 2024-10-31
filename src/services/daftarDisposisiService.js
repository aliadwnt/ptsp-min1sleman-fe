import axios from "axios";

const API_URL = "/api_s/daftar-disposisi";

export const fetchDaftarDisposisi = async (no_reg) => {
  try {
    const response = await axios.get(`${API_URL}/${no_reg}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daftar disposisi:", error);
    throw error;
  }
};

export const updateDaftarDisposisi = async (no_reg, diteruskan, disposisi,keterangan) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}`,
      {
        no_reg: no_reg,
        diteruskan,
        disposisi: disposisi,
        keterangan
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Updated Daftar Disposisi:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Daftar Disposisi:", error);
    throw error;
  }
};

