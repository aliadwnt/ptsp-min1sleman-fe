import axios from 'axios';

const API_URL = '/api_s/users'; 

export const register = async (DaftarPengguna) => {
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

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('is_admin', response.data.user.is_admin);
        }

        return response.data;
    } catch (error) {
        throw new Error('Login failed, please check your credentials.');
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('is_admin');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const authService = {
    login,
    logout,
    isAuthenticated,
};

export default authService;
