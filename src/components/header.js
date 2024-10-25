import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import Sidebar from "../components/sidebar";
import { logoutPengguna, getUserById } from "../services/daftarPenggunaService";
import { fetchNotification } from "../services/notificationService";
import {
  HomeIcon,
  CogIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const UserProfileMenu = () => {
  const [formData, setFormData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const newNotifications = notifications.filter(
    (notification) => !notification.isRead
  );
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const { userId, exp } = decodedToken;

          const currentTime = Math.floor(Date.now() / 1000);
          if (exp < currentTime) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          const data = await getUserById(userId);
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

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
  }, []);

  const toggleShowAll = () => {
    setShowAllNotifications(!showAllNotifications);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutPengguna();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const isActive = (path) => (location.pathname === path ? "bg-green-400" : "");
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <header className="sticky top-0 bg-[#11ad00] w-full px-6 pt-8 pb-6 flex justify-between items-center text-white z-10">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />{" "}
      </div>
      <button
        aria-controls="sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>
      <div className="textheader"></div>
      <div className="relative inline-block text-left">
        <div className="flex items-center space-x-3">
          {/* Ikon Notifikasi */}
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
                  fontSize: "0.625rem", // text-xs
                  borderRadius: "9999px",
                  height: "1rem", // h-4
                  width: "1rem", // w-4
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {newNotifications.length}
              </span>
            )}
          </button>

          {/* Dropdown untuk User Profile */}
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-200"
          >
            {formData ? formData.name : "Loading..."}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform scale-95">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {formData && (
                <>
                  <div className="mr-2 px-4 py-2">
                    <div className="text-base font-semibold text-gray-800">
                      {formData.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {formData.email}
                    </div>
                  </div>
                  <div className="border-t border-gray-200"></div>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 ${isActive(
                      "/dashboard"
                    )} transition duration-150 ease-in-out rounded-md`}
                    onClick={() => navigate("/")}
                  >
                    <HomeIcon className="h-5 w-5 mr-2" />
                    Home
                  </button>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 ${isActive(
                      "/user/settings"
                    )} transition duration-150 ease-in-out rounded-md`}
                    onClick={() => navigate("/user/settings")}
                  >
                    <CogIcon className="h-5 w-5 mr-2" />
                    Settings
                  </button>
                  <div className="border-t border-gray-200"></div>
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 ${isActive(
                      "/profile/edit"
                    )} transition duration-150 ease-in-out rounded-md`}
                    onClick={() => navigate("/profile/edit")}
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Profile
                  </button>
                  <div className="border-t border-gray-200"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-200 transition duration-150 ease-in-out rounded-md"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Modal for Notifications */}
        {isModalOpen && (
          <div
            className="notifications origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform scale-95"
            onClick={toggleModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Anda Memiliki {newNotifications.length} Notifikasi Baru
                </h2>
                <button
                  className="text-sm bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded-md transition duration-150 ease-in-out"
                  onClick={() => {
                    navigate("/user/daftar-notifikasi");
                    // Logika untuk melihat semua notifikasi
                    console.log("Melihat semua notifikasi:", notifications);
                  }}
                >
                  Lihat Semua
                </button>
              </div>

              <hr className="w-full border-t-2 border-gray-400 my-2" />

              <div className="flex items-start">
                <ul className="mt-2">
                  {newNotifications.length > 0 ? (
                    (showAllNotifications
                      ? newNotifications
                      : newNotifications.slice(0, 1)
                    ).map((notification) => (
                      <li
                        key={notification.id}
                        className="text-lg font text-gray-700 mb-3 flex items-start"
                      >
                        {" "}
                        <ExclamationCircleIcon className="h-10 w-10 text-yellow-500 mr-4 transform translate-y-2" />
                        <div>
                          <p className="text-sm text-gray-700">
                            {notification.message.message}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>No Surat:</strong>{" "}
                            {notification.message.no_surat}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Perihal:</strong>{" "}
                            {notification.message.perihal}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Tanggal Dibuat:</strong>{" "}
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-lg font-bold text-gray-700">
                      Tidak ada notifikasi baru.
                    </li>
                  )}
                </ul>
              </div>

              <hr className="w-full border-t-2 border-gray-400 my-2" />

              {/* Tombol Tampilkan Semua */}
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
    </header>
  );
};

export default UserProfileMenu;
