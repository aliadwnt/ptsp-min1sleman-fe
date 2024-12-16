import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutPengguna, getUserById } from "../services/daftarPenggunaService";
import {
  FaUser,
  FaRegEdit,
  FaUserCog,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const UserDropdown = ({ userRole: propUserRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const isActive = (path) =>
    location.pathname === path
      ? "bg-green-600 text-white"
      : "bg-white text-gray-800 hover:bg-green-500 hover:text-white";

  const handleLogout = async () => {
    try {
      await logoutPengguna();
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal logout:", error.message);
      alert("Terjadi kesalahan saat logout. Silakan coba lagi.");
    }
  };

  const confirmLogout = () => {
    setShowModal(false);
    handleLogout();
  };

  const handleShowModal = () => {
    setIsOpen(false);
    setShowModal(true);
  };

  useEffect(() => {
    const storedRole = propUserRole || localStorage.getItem("userRole");
    setUserRole(storedRole);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token not found. Redirecting to login.");
          localStorage.removeItem("userRole");

          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { userId, exp } = decodedToken;
        const currentTime = Math.floor(Date.now() / 1000);

        // Periksa apakah token telah kedaluwarsa
        if (exp < currentTime) {
          console.warn("Token expired. Redirecting to login.");
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          return;
        }
        const data = await getUserById(userId);
        if (data) {
          setFormData(data);
        } else {
          console.warn("User data not found. Clearing formData.");
          setFormData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setFormData(null);
      }
    };

    fetchData();
  }, [propUserRole]);

  return (
    <div className="relative">
      {formData ? (
        <>
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2 text-gray-700"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
            </svg>

            {formData.name}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-2 px-3">
                <div className="px-4 py-3 bg-green-50 rounded-lg">
                  <div className="text-base font-semibold text-green-700">
                    Hi, {formData.name}!
                  </div>
                  <div
                    className="text-xs font-medium text-green-600 truncate"
                    style={{
                      fontSize: "clamp(9px, 1vw, 12px)",
                      maxWidth: "200px",
                    }}
                  >
                    {formData.email}
                  </div>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                {userRole === "user" && (
                  <button
                    className={`mb-2 block w-full px-4 py-2 text-sm font-medium rounded-lg shadow-md transition duration-300 ${isActive(
                      "/edit-user"
                    )}`}
                    onClick={() => navigate("/edit-user")}
                    style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
                  >
                    <FaRegEdit className="w-5 h-5 inline-block mr-2" /> Edit
                    Profile
                  </button>
                )}
                {(userRole === "admin" ||
                  userRole === "superadmin" ||
                  userRole === "kepala madrasah" ||
                  userRole === "staff") && (
                  <>
                    <button
                      className={`mb-2 block w-full px-4 py-2 text-sm font-medium rounded-lg shadow-md transition duration-300 ${isActive(
                        "/dashboard"
                      )}`}
                      onClick={() => {
                        if (userRole === "admin" || userRole === "superadmin") {
                          navigate("/dashboard");
                        } else if (
                          userRole === "staff" ||
                          userRole === "kepala madrasah"
                        ) {
                          navigate("/dashboard-staff");
                        }
                      }}
                      style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
                    >
                      <FaTachometerAlt className="w-5 h-5 inline-block mr-2" />{" "}
                      Dashboard
                    </button>

                    {(userRole === "superadmin" ||
                      userRole === "admin" ||
                      userRole === "staff" ||
                      userRole === "kepala madrasah") && (
                      <button
                        className={`mb-2 block w-full px-4 py-2 text-sm font-medium rounded-lg shadow-md transition duration-300 ${isActive(
                          "/profile/edit"
                        )}`}
                        onClick={() => navigate("/profile/edit")}
                        style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
                      >
                        <FaRegEdit className="w-5 h-5 inline-block mr-2" /> Edit
                        Profile
                      </button>
                    )}
                    {/* <button
                      className={`mb-2 block w-full px-4 py-2 text-sm font-medium rounded-lg shadow-md transition duration-300 ${isActive(
                        "/user/settings"
                      )}`}
                      onClick={() => navigate("/user/settings")}
                      style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
                    >
                      <FaUserCog className="w-5 h-5 inline-block mr-2" />{" "}
                      Settings
                    </button> */}
                  </>
                )}
                <button
                  className="block w-full px-4 py-2 p-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={handleShowModal}
                  style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
                >
                  <FaSignOutAlt className="w-5 h-5 inline-block mr-2" /> Logout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
        >
          LOGIN
        </Link>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Konfirmasi Logout
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Apakah Anda yakin ingin logout?
            </p>
            <div className="flex justify-between gap-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105"
                onClick={() => setShowModal(false)}
              >
                Tidak
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
                onClick={confirmLogout}
              >
                Ya, Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
