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
      // Panggil API untuk menandai semua notifikasi sebagai sudah dibaca
      const unreadNotifications = notifications.filter((notif) => !notif.isRead);
      const promises = unreadNotifications.map((notif) =>
        markNotificationAsRead(notif.id)
      );
  
      await Promise.all(promises);
  
      // Update state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => ({ ...notif, isRead: true }))
      );
      console.log("Semua notifikasi telah ditandai sebagai sudah dibaca.");
    } catch (error) {
      console.error("Gagal menandai semua notifikasi sebagai sudah dibaca:", error);
    }
  };
  

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} tahun yang lalu`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} bulan yang lalu`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} hari yang lalu`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} jam yang lalu`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} menit yang lalu`;
    return `${seconds} detik yang lalu`;
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col relative">
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
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <i className="fas fa-list mr-2"></i> Daftar Notifikasi
                  </h2>
                  <button
                    onClick={handleMarkAllAsRead}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-transform duration-300 shadow-lg transform ${
                      notifications.some((notif) => !notif.isRead)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    } ${notifications.some((notif) => !notif.isRead) && "hover:scale-105"}`}
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
                        {/* Icon */}
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
                            className={`mt-1 flex items-center space-x-2 w-full sm:w-auto md:w-auto ${
                              item.isRead
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-green-600 hover:text-blue-800"
                            }`}
                          >
                            <i
                              className={`fa fa-info-circle ${
                                item.isRead ? "text-gray-500" : "text-green-600"
                              }`}
                            ></i>
                            <span
                              className={
                                item.isRead ? "text-gray-500" : "text-green-600"
                              }
                            >
                              View Detail Disposisi
                            </span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 text-sm">
                      Tidak ada notifikasi.
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
