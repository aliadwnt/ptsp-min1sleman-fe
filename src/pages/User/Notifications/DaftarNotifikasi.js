import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Favicon from "../../../components/Favicon";
import {
  fetchNotification,
  markNotificationAsRead,
} from "../../../services/notificationService";
import { useNavigate, useParams } from "react-router-dom";

const Notifications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await fetchNotification(id);
      const sortedNotifications = response.notifications.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (notification) => {
    try {
      await markNotificationAsRead(notification.id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notification.id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleDetail = (no_reg) => {
    console.log("Value of no_reg:", no_reg);
    if (!no_reg) {
      console.error("no_reg is undefined or null");
      return;
    }
    navigate(`/disposisi/detail-disposisi/${no_reg}`);
  };
  const extractNoReg = (message) => {
    const match = message.match(/#(\d+)/);
    return match ? match[1] : null;
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(
        (notif) => !notif.isRead
      );
      const promises = unreadNotifications.map((notif) =>
        markNotificationAsRead(notif.id)
      );

      await Promise.all(promises);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => ({ ...notif, isRead: true }))
      );
      console.log("Semua notifikasi telah ditandai sebagai sudah dibaca.");
    } catch (error) {
      console.error(
        "Gagal menandai semua notifikasi sebagai sudah dibaca:",
        error
      );
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let timeString = "";
  
    if (hours > 0) {
      timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
  
    if (minutes > 0) {
      timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
  
    if (remainingSeconds > 0) {
      timeString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
    }
  
    return `${timeString} ago`;
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="select-none min-h-screen w-full bg-gray-50 flex flex-col relative">
      <Favicon />
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        <div className="p-4">
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="bg-white shadow-lg rounded-lg px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <i className="fas fa-list mr-2"></i> Daftar Notifikasi
                  </h2>
                  <div className="flex space-x-2 mt-2">
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                    >
                      <i className="fas fa-sync-alt text-xs"></i>
                    </button>
                    <button
                      onClick={handleMarkAllAsRead}
                      className={`flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-transform duration-300 shadow-lg transform ${
                        notifications.some((notif) => !notif.isRead)
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-300 text-gray-400 cursor-not-allowed"
                      } ${
                        notifications.some((notif) => !notif.isRead) &&
                        "hover:scale-105"
                      }`}
                      disabled={!notifications.some((notif) => !notif.isRead)}
                    >
                      <i
                        className={`fas fa-check-circle ${
                          notifications.some((notif) => !notif.isRead)
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      ></i>
                      <span>Tandai Semua Sudah Dibaca</span>
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg shadow-md flex items-center space-x-4 transition-all duration-300 ${
                          item.isRead
                            ? "bg-gray-50 border border-gray-300"
                            : "bg-white border-l-4 border-green-500"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                              item.isRead ? "bg-gray-400" : "bg-green-500"
                            }`}
                          >
                            <i
                              className={`fas ${
                                item.isRead ? "fa-check" : "fa-bell"
                              } text-sm`}
                            ></i>
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {item.message.type === "disposisi" ? (
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm">
                                {item.message.message ||
                                  "Tidak ada pesan disposisi"}
                                :
                              </h4>
                              <p className="text-gray-500 text-xs mb-1">
                                {item.message.disposisi ||
                                  "Tidak ada informasi disposisi"}
                              </p>
                              <p className="text-gray-500 text-xs mb-1">
                                {item.message.diteruskan ||
                                  "Tidak ada informasi diteruskan"}
                              </p>
                              <span className="text-xs text-gray-500">
                                {timeAgo(item.created_at)}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm">
                                {item.message.message ||
                                  "Tidak ada pesan layanan"}
                              </h4>
                              <p className="text-gray-500 text-xs mb-1">
                                Nomor Surat :
                                {item.message.no_surat ||
                                  "Tidak ada nomor surat"}
                              </p>
                              <p className="text-gray-500 text-xs mb-1">
                                Perihal :
                                {item.message.perihal || "Tidak ada perihal"}
                              </p>
                              <span className="text-xs text-gray-500">
                                {timeAgo(item.created_at)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => handleMarkAsRead(item)}
                            className={`flex items-center justify-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-transform duration-300 shadow-md transform w-full ${
                              item.isRead
                                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-800"
                            }`}
                          >
                            <i
                              className={`fa fa-check-circle ${
                                item.isRead ? "text-gray-400" : "text-white"
                              }`}
                            ></i>
                            <span>Tandai Dibaca</span>
                          </button>

                          <button
                            onClick={() => {
                              const noReg = extractNoReg(item.message.message);
                              if (noReg) {
                                handleMarkAsRead(item);
                                handleDetail(noReg);
                              } else {
                                console.error(
                                  "No registration number found in message:",
                                  item.message.message
                                );
                              }
                            }}
                            className={`flex items-center justify-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-transform duration-300 shadow-md transform w-full ${
                              item.isRead
                                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-800"
                            }`}
                          >
                            <i
                              className={`fa fa-info-circle ${
                                item.isRead ? "text-gray-400" : "text-white"
                              }`}
                            ></i>
                            <span>Detail Disposisi</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No data available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
