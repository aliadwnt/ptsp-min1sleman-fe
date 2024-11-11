import axios from "axios";

const API_URL = "/api_s/users";
const API_URL_PENGGUNA = "/api_s/daftar-pengguna";

export const fetchDaftarPengguna = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("User data:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching daftar pengguna:", error);
    throw error;
  }
};

export const loginPengguna = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Login:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw new Error(error.response?.data?.message || "Failed to login user");
  }
};

export const logoutPengguna = async () => {
  const token = localStorage.getItem("token");
  console.log("Token digunakan:", token);
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response dari logout:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to logout:", error);
    throw new Error(error.response?.data?.message || "Failed to logout user");
  }
};

export const createDaftarPengguna = async (DaftarPengguna) => {
  try {
    const response = await axios.post(`${API_URL}/register`, DaftarPengguna, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Succesfully Created User:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add pengguna:", error);
    throw new Error(error.response?.data?.message || "Failed to register user");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data pengguna:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error data pengguna:", error);
    throw error;
  }
};

export const changePassword = async (DaftarPengguna) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_URL}/changepassword`,
      DaftarPengguna,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Succesfully Change Password:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Change Password :", error);
    throw error;
  }
};
export const deleteDaftarPengguna = async (userId, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_URL}/deleteuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { userId, ...data },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting pengguna:", error);
    throw error;
  }
};

export const updateUserData = async (userData) => {
  console.log("Data pengguna diperbarui:", userData);
  return true;
};

export const sendEmailVerification = async () => {
  console.log("Verifikasi email dikirim");
  return true;
};

export const updateDaftarPengguna = async (id, DaftarPengguna) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_URL_PENGGUNA}/${id}`, 
      DaftarPengguna,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Successfully Updated User:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
    } else {
      console.error("Error updating pengguna:", error.message);
    }
    throw error;
  }
};

export const deletePengguna = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_URL_PENGGUNA}/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Successfully deleted pengguna:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting pengguna:", error);
    throw error;
  }
};
