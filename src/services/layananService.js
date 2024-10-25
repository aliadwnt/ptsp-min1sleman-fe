import axios from 'axios';

const API_URL = '/api_s/layanan'; 

export const createDaftarPelayanan = async (DaftarPelayanan) => {
    try {
        const response = await axios.post(`${API_URL}/create-layanan`, DaftarPelayanan, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Created DaftarPelayanan:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Failed to add DaftarPelayanan:', error);
        throw error; 
    }
};

export const exportpdf = async (htmlContent, noReg) => {
    try {
        const response = await axios.post(`${API_URL}/exportPdf`, {
            html: htmlContent, 
            no_reg: noReg, 
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'blob', 
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `document-${noReg}.pdf`); 
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
};

// export const previewPdf = async () => {
//     try {

//     }
// };
