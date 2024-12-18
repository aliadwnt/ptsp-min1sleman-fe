import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Favicon from "../../../components/Favicon";
import {
  fetchNotification,
  markNotificationAsRead,
} from "../../../services/notificationService";
import { useNavigate, useParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";

const Notifications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const userRole = localStorage.getItem("userRole");
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

  const handleDetail = (no_reg, id_sm) => {
    if (no_reg) {
      console.log("no_reg:", no_reg, "id_sm:", id_sm);
      navigate(`/disposisi/detail-pelayanan/${no_reg}`);
    } else if (id_sm) {
      navigate(`/disposisi/detail-disposisi/${id_sm}`);
    }
  };

  const extractIdSm = (message) => {
    const match = message.match(/Disposisi #(\d+)/);
    return match ? match[1] : null;
  };

  const extractNoReg = (message) => {
    const match = message.match(/Layanan #(\d+)/);
    console.log("extractNoReg match:", match); // Debugging output
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
  const filteredNotifications = notifications.filter((notification) => {
    if (notification.message.type === "disposisi") {
      return userRole === "staff" || userRole === "kepala madrasah";
    }
    if (notification.message.type === "pelayanan") {
      return userRole === "admin" || userRole === "superadmin";
    }
    return false;
  });

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = "";

    if (hours > 0) {
      timeString += `${hours} hour${hours > 1 ? "s" : ""} `;
    }

    if (minutes > 0) {
      timeString += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    }

    if (remainingSeconds > 0) {
      timeString += `${remainingSeconds} second${
        remainingSeconds > 1 ? "s" : ""
      }`;
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
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <i className="fas fa-list mr-2"></i> Daftar Notifikasi
                  </h2>
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
                    >
                      <i className="fas fa-sync-alt text-xs"></i>
                    </button>
                    <button
                      onClick={handleMarkAllAsRead}
                      className={`flex items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-transform duration-300 shadow-md transform ${
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
                <div className="space-y-6">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-6 rounded-lg shadow-lg flex items-center space-x-6 transition-all duration-300 ease-in-out transform ${
                          item.isRead
                            ? "bg-gray-50 border border-gray-300"
                            : "bg-white border-l-4 border-green-600"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <span
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                              item.isRead ? "bg-gray-400" : "bg-green-500"
                            }`}
                          >
                            <i
                              className={`fas ${
                                item.isRead ? "fa-check" : "fa-bell"
                              } text-lg`}
                            ></i>
                          </span>
                        </div>

                        <div className="flex-1">
                          {item.message.type === "disposisi" ? (
                            <div>
                              <span>
                                {item.message.message.startsWith(
                                  "Disposisi"
                                ) ? (
                                  <>
                                    <span className="bg-green-700 text-white px-2 py-1 text-xs font-bold rounded-full uppercase">
                                      Disposisi
                                    </span>
                                    {extractIdSm(item.message.message) && (
                                      <span className="text-gray-600 ml-2 text-sm font-bold">
                                        #{extractIdSm(item.message.message)}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span>
                                    {item.message.message ||
                                      "Tidak ada pesan disposisi"}
                                  </span>
                                )}
                              </span>
                              <p className="text-gray-600 text-xs mb-2 mt-2 flex items-center">
                                <DocumentIcon className="h-4 w-4 text-gray-700 mr-2" />
                                <span className="font-semibold text-gray-800">
                                  Disposisi:
                                </span>
                                <span className="text-gray-700 ml-1">
                                  {item.message.disposisi ||
                                    "Tidak ada informasi disposisi"}
                                </span>
                              </p>
                              <p className="text-gray-600 text-xs mb-2 flex items-center">
                                <DocumentIcon className="h-4 w-4 text-gray-700 mr-2" />
                                <span className="font-semibold text-gray-800">
                                  Tindakan:
                                </span>
                                <span className="text-gray-700 ml-1">
                                  {item.message.tindakan ||
                                    "Tidak ada informasi diteruskan"}
                                </span>
                              </p>
                              <span className="text-xs text-gray-500 flex items-center">
                                <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                                {timeAgo(item.created_at)}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span>
                                {item.message.message.startsWith("Layanan") ? (
                                  <>
                                    <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full uppercase">
                                      Layanan
                                    </span>
                                    {extractNoReg(item.message.message) && (
                                      <span className="text-gray-800 ml-2 text-sm font-bold">
                                        #{extractNoReg(item.message.message)}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="bg-green-500 text-white px-4 py-1 text-sm font-bold rounded-full">
                                    {item.message.message ||
                                      "Tidak ada pesan layanan"}
                                  </span>
                                )}
                              </span>
                              <p className="text-gray-600 text-xs mb-2 mt-2 flex items-center">
                                <DocumentIcon className="h-4 w-4 text-gray-700 mr-2" />
                                <span className="font-semibold text-gray-800">
                                  Nomor Surat :
                                </span>
                                <span className="text-gray-700 ml-1">
                                  {item.message.no_surat ||
                                    "Tidak ada nomor surat"}
                                </span>
                              </p>
                              <p className="text-gray-600 text-xs mb-2 flex items-center">
                                <DocumentIcon className="h-4 w-4 text-gray-700 mr-2" />
                                <span className="font-semibold text-gray-800">
                                  Perihal :
                                </span>
                                <span className="text-gray-700 ml-1">
                                  {item.message.perihal || "Tidak ada perihal"}
                                </span>
                              </p>
                              <span className="text-xs text-gray-500 flex items-center">
                                <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                                {timeAgo(item.created_at)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end space-y-3">
                          <button
                            onClick={() => handleMarkAsRead(item)}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-transform duration-300 shadow-md transform w-full ${
                              item.isRead
                                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
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
                              const idSm = extractIdSm(item.message.message);
                              const noReg = extractNoReg(item.message.message);
                              if (noReg || idSm) {
                                handleDetail(noReg, idSm);
                              }
                            }}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-transform duration-300 shadow-md transform w-full ${
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
                            <span>Detail</span>
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
