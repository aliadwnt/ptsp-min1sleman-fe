import axios from "axios";
const API_URL = "/api_s/notification";

export const fetchNotification = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification", error);
    throw error;
  }
};

export const addNotification = async (message, no_surat, perihal, disposisi, diteruskan) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        message,
        no_surat,
        perihal,
        disposisi,
        diteruskan,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Created notification:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add notification:", error);
    throw error;
  }

};
export const markNotificationAsRead = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/mark-as-read/${id}`, { isRead: true });
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error; 
  }
};