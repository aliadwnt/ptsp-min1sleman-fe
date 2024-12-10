import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotification } from "../services/notificationService";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const newNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const sortedNotifications = [...newNotifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotification();
        if (data.success) {
          if (Array.isArray(data.notifications)) {
            setNotifications(data.notifications);
          } else {
            console.error("Notifications is not an array.");
          }
        } else {
          console.error("Fetch error:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleShowAll = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    // Hitung jumlah jam, menit, dan detik
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let timeString = "";
    
    if (hours > 0) {
      timeString += `${hours}h `;
    }
  
    if (minutes > 0) {
      timeString += `${minutes}m `;
    }
  
    if (remainingSeconds > 0) {
      timeString += `${remainingSeconds}s`;
    }
  
    return `${timeString} ago`;
  };

  const handleNotificationClick = (notificationId) => {
    navigate(`/notification/detail/${notificationId}`);
  };

  return (
    <div className="relative">
        <button
          className="relative p-1 focus:outline-none"
          onClick={toggleModal}
          style={{ backgroundColor: "transparent" }}
        >
          <svg
            className="h-6 w-6 text-black-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {newNotifications.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "red",
                color: "white",
                fontSize: "0.625rem", 
                borderRadius: "9999px",
                height: "1rem", 
                width: "1rem", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {newNotifications.length}
            </span>
          )}
        </button>

      {isModalOpen && (
          <div
            className="notifications origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform scale-95"
            onClick={toggleModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-3 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-between p-2 bg-white rounded-lg shadow-lg ">
                <h2 className="text-s font-semibold text-gray-800 mb-3">
                  <span>Anda mendapatkan {newNotifications.length} notifikasi baru</span>
                </h2>
                
                <button
                  className="text-sm bg-green-600 text-center text-white hover:bg-green-700 p-2 rounded-md transition duration-200 ease-in-out"
                  onClick={() => {
                    navigate("/user/daftar-notifikasi");
                    console.log("Melihat semua notifikasi:", notifications);
                  }}
                >
                  Lihat Semua
                </button>
              </div>

              <hr className="w-full border-t-2 border-gray-400 my-2" />
              <div className="flex items-start">
                <ul className="mt-2">
                  {sortedNotifications.length > 0 ? (
                    (showAllNotifications
                      ? sortedNotifications
                      : sortedNotifications.slice(0, 1)
                    ).map((notification) => (
                      <li
                        key={notification.id}
                        className="text-lg font text-gray-700 mb-3 flex items-start"
                      >
                        <ExclamationCircleIcon className="h-10 w-10 text-yellow-500 mr-4 transform translate-y-2" />
                        <div>
                          <p className="text-s text-gray-700">
                            <strong> {notification.message.message}</strong>
                          </p>

                          {notification.message.no_surat && (
                            <>
                              <p className="text-sm text-gray-700">
                                <strong>No Surat:</strong> {notification.message.no_surat}
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong>Perihal:</strong> {notification.message.perihal}
                              </p>
                            </>
                          )}

                          {notification.message.type === "disposisi" && (
                            <>
                              <p className="text-sm text-gray-700">
                                <strong>Diteruskan:</strong> {notification.message.diteruskan}
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong>Disposisi:</strong> {notification.message.disposisi || "Tidak ada data"}
                              </p>
                            </>
                          )}
                          <p className="text-xs text-gray-500">
                            {timeAgo(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-m font-bold text-gray-700">
                      Tidak ada notifikasi baru.
                    </li>
                  )}
                </ul>
              </div>

              <hr className="w-full border-t-2 border-gray-400 my-2" />

              {newNotifications.length > 1 && (
                <div className="mt-4 flex justify-center">
                  <p
                    onClick={toggleShowAll}
                    className="text-sm font-semibold text-gray-800 underline hover:text-blue-600"
                  >
                    {showAllNotifications
                      ? "Sembunyikan"
                      : "Tampilkan Semua Notifikasi"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default NotificationMenu;
