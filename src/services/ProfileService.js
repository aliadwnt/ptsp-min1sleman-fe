import axios from 'axios';

const API_URL = '/api_s/users'; 

export const UpdateUser = async (email, password) => {
    try {
        const response = await axios.put(`${API_URL}/updateuser`, {
            email, 
            password,
        }); 
        return response.data; 
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error; 
    }
};

export const verifyemail = async (remember_token) => {
    try {
        const response = await axios.get(`${API_URL}/verifyemail/:token`, {
            remember_token
        }); 
        return response.data; 
    } catch (error) {
        console.error('Error get verify :', error);
        throw error; 
    }
};

export const UpdatePassword = async ({ password }) => { 
    try {
        const response = await axios.put(`${API_URL}/changepassword`, { password }, { 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Password updated successfully:', response.data);
        
        return response.data; 
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update password';
        console.error('Failed to update password:', errorMessage);

        throw new Error(errorMessage);
    }
};

export const DeleteAccount = async () => {
    try {
        const response = await axios.delete(`${API_URL}/deleteuser`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Deleting Account:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to delete account:', error.response?.data || error);
        throw new Error(error.response?.data?.message || 'Failed to delete account'); 
    }
};


