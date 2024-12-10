import axios from "axios";

const API_URL = "/api_s/daftar-disposisi";

export const fetchDaftarDisposisi = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching daftar disposisi:", error);
    throw error;
  }
};

export const fetchDaftarDisposisiByNoReg = async (no_reg) => {
  try {
    const response = await axios.get(`${API_URL}/${no_reg}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daftar disposisi:", error);
    throw error;
  }
};
export const fetchDaftarDisposisiByIdSm = async (id_sm) => {
  try {
    const response = await axios.get(`${API_URL}/surat-masuk/${id_sm}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daftar disposisi:", error);
    throw error;
  }
};
// export const fetchDaftarDisposisiByIdPelayanan = async (id_pelayanan) => {
//   try {
//     const response = await axios.get(`${API_URL}/pelayanan/${id_pelayanan}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching daftar disposisi:", error);
//     throw error;
//   }
// };

export const updateDaftarDisposisi = async (
  id_sm,
  tindakan,
  disposisi,
  catatan
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}`,
      {
        id_sm: id_sm,
        tindakan,
        disposisi: disposisi,
        catatan,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("updating Daftar Disposisi:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Daftar Disposisi:", error);
    throw error;
  }
};

export const updateDaftarDisposisiPelayanan = async (
  no_reg,
  tindakan,
  disposisi,
  catatan
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}`,
      {
        no_reg: no_reg,
        tindakan,
        disposisi: disposisi,
        catatan,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("updating Daftar Disposisi:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Daftar Disposisi:", error);
    throw error;
  }
};
