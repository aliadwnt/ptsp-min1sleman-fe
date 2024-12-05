import axios from "axios";

const API_URL = "/api_s/settings";

export const fetchSettings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching daftar settings", error);
    throw error;
  }
};

export const createSettings = async (data) => {
    const token = localStorage.getItem("token")
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating daftar settings", error);
    throw error;
  }
};

export const updateSettings = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating daftar settings", error);
    throw error;
  }
};

export const deleteSettings = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting daftar settings", error);
    throw error;
  }
};
