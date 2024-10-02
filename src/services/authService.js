import axios from 'axios';

const API_URL = 'http://localhost:5000/api_s/users'; 

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
