import axios from "axios";

const API_URL = "http://localhost:3000/api_s/upload";

export const uploadSingle = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); 

    const response = await axios.post(`${API_URL}/single`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("File uploaded successfully:", response.data);
    
    return response.data.data.Location; 
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error; 
  }
};
