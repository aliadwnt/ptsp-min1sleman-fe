import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import {
  fetchNotification,
  markNotificationAsRead,
} from "../../../services/notificationService";
import "../../../App.css";

const Notifications = () => {
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
      {/* Sidebar */}
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
        <div>
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">Daftar Notifikasi</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Notifikasi
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {Notifications.length > 0 ? (
                        Notifications.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-sm text-center">
                              {index + 1}
                            </td>
                            <td className="px-6 py-2 text-sm text-center">
                              {new Date(item.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-2 text-center">
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
                                    {item.message.perihal ||
                                      "Tidak ada perihal"}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {timeAgo(item.created_at)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-2 text-center">
                              <td>
                                <button
                                  onClick={() => {
                                    console.log("Item yang diklik:", item);
                                    handleMarkAsRead(item);
                                  }}
                                >
                                  <i
                                    className={`fa fa-eye ${
                                      item.isRead
                                        ? "text-gray-400"
                                        : "text-green-600"
                                    }`}
                                  ></i>
                                </button>
                              </td>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider"
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
    </div>
  );
};

export default Notifications;
