import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import {
  fetchNotification,
  markNotificationAsRead,
} from "../../../services/notificationService";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import Favicon from "../../../components/Favicon";

const Notifications = () => {
  const navigate = useNavigate();
  const [Notifications, setNotifications] = useState([]);
  const [message] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchNotification();
      console.log("Fetched notifications:", response);

      const sortedNotifications = response.notifications.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (notification) => {
    if (!notification || !notification.id) {
      console.error("Notification is invalid:", notification);
      return;
    }

    try {
      const result = await markNotificationAsRead(notification.id);
      console.log(result.message);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notification.id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} hari yang lalu`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} jam yang lalu`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} menit yang lalu`;
    return `${seconds} detik yang lalu`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col m-0 p-0 relative">
      <Favicon />
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />{" "}
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        <div className="p-4">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fas fa-bell white-bell mr-2"></i>
            Daftar Notifikasi
          </div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notifikasi
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Notifications.length > 0 ? (
                      Notifications.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {(() => {
                              const date = new Date(item.created_at);
                              const today = new Date();
                              const yesterday = new Date(today);
                              yesterday.setDate(today.getDate() - 1);

                              // Check if the date is today, yesterday, or another day
                              if (
                                date.toDateString() === today.toDateString()
                              ) {
                                return `Today, ${date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}`;
                              } else if (
                                date.toDateString() === yesterday.toDateString()
                              ) {
                                return `Yesterday, ${date.toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}`;
                              } else {
                                return (
                                  date.toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }) +
                                  ", " +
                                  date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                );
                              }
                            })()}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.message.type === "disposisi" ? (
                              <div>
                                <strong className="text-sm text-gray-700">
                                  {item.message.message ||
                                    "Tidak ada pesan disposisi"}
                                  :
                                </strong>
                                <p className="text-sm text-gray-700">
                                  {item.message.disposisi ||
                                    "Tidak ada informasi"}
                                </p>
                                <p className="text-sm text-gray-700">
                                  {item.message.diteruskan ||
                                    "Tidak ada informasi"}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {timeAgo(item.created_at)}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <strong className="text-sm text-gray-700">
                                  {item.message.message ||
                                    "Tidak ada pesan layanan"}
                                  :
                                </strong>
                                <p className="text-sm text-gray-700">
                                  <strong>No Surat:</strong>{" "}
                                  {item.message.no_surat ||
                                    "Tidak ada nomor surat"}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <strong>Perihal:</strong>{" "}
                                  {item.message.perihal || "Tidak ada perihal"}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {timeAgo(item.created_at)}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <div className="flex items-center space-x-4 justify-center">
                              <button
                                onClick={() => {
                                  console.log("Item yang diklik:", item);
                                  handleMarkAsRead(item);
                                }}
                                className="flex items-center space-x-2"
                              >
                                <i
                                  className={`fa fa-eye ${
                                    item.isRead
                                      ? "text-gray-400"
                                      : "text-green-600"
                                  }`}
                                ></i>
                                <span
                                  className={
                                    item.isRead
                                      ? "text-gray-400"
                                      : "text-green-600"
                                  }
                                >
                                  {item.isRead ? "Viewed" : "Mark as Viewed"}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
