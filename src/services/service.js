// services/service.js
const API_URL = 'http://localhost:5004/api/daftar-layanan'; // Adjust the URL if needed

export const fetchLayanan = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const createLayanan = async (layanan) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(layanan)
    });
    return await response.json();
};

export const updateLayanan = async (id, layanan) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(layanan)
    });
    return await response.json();
};

export const deleteLayanan = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
};
