import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo_min_1 copy.png";
import "../App.css";
import { logoutPengguna, getUserById } from "../services/daftarPenggunaService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { userId, exp } = decodedToken;

        const currentTime = Date.now() / 1000;
        if (exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        try {
          const data = await getUserById(userId);
          setFormData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent closing sidebar
    setIsOpen((prev) => !prev);
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const renderMenuItems = (isMobile = false) => {
    const menuPaths = [
      { path: "/", label: "Beranda" },
      { path: "/layanan", label: "Layanan" },
      { path: "/visi-misi", label: "Visi & Misi" },
      { path: "/lacak-berkas", label: "Lacak Berkas" },
      { path: "/zona-integritas", label: "Zona Integritas" },
    ];

    return menuPaths.map(({ path, label }, index) => (
      <li key={index}>
        <Link
          to={path}
          className={`flex flex-col gap-2 my-2 font-poppins transition-colors duration-300 ease-in-out ${
            location.pathname === path
              ? isMobile
                ? "text-blue-600 font-bold"
                : "text-white font-bold"
              : isMobile
              ? "text-gray-800 cursor-pointer hover:text-blue-500"
              : "text-white hover:text-blue-600"
          }`}
        >
          {label}
        </Link>
      </li>
    ));
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="PTSP Logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-lg font-bold text-white">PTSP MIN 1 SLEMAN</h1>
        </div>

        <div className="relative flex items-center">
          <button className="md:hidden p-2 text-white" onClick={toggleMenu}>
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
          {/* Sidebar for mobile */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-50 bg-gray-800 bg-opacity-80 md:hidden"
              onClick={toggleMenu}
            >
              <div className="absolute top-0 right-0 w-3/4 h-screen bg-white shadow-lg transition transform duration-300 ease-in-out">
                <button className="absolute top-4 right-4" onClick={toggleMenu}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <ul className="flex flex-col space-y-4 mt-20 px-4">
                  {renderMenuItems(true)}
                </ul>{" "}
                {/* Mobile menu items */}
                <div className="border-t border-gray-200 my-4"></div>
                <div className="px-2 py-2">
                  <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-expanded={isOpen}
                  >
                    {formData ? formData.name : "Login"}
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
                    <div className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transition duration-150 ease-in-out">
                      <div className="py-1" role="menu">
                        {formData ? (
                          <>
                            <div className="px-4 py-2 bg-gray-100 rounded-t-md">
                              <div className="text-base font-medium text-gray-800">
                                {formData.name}
                              </div>
                              <div className="text-sm font-medium text-gray-500">
                                {formData.email}
                              </div>
                            </div>
                            <div className="border-t border-gray-200"></div>
                            {/* Tampilkan tombol ini hanya jika userRole adalah 1 atau 2 */}
                            {(userRole === "1" || userRole === "2") && (
                              <>
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                  onClick={() => navigate("/dashboard")}
                                >
                                  Dashboard
                                </button>
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                  onClick={() => navigate("/user/settings")}
                                >
                                  Settings
                                </button>
                                <button
                                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                  onClick={() => navigate("/profile/edit")}
                                >
                                  Profile
                                </button>
                              </>
                            )}
                            <button
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </>
                        ) : (
                          <Link
                            to="/login"
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Desktop view */}
          <ul className="hidden md:flex space-x-5">{renderMenuItems()}</ul>{" "}
          {/* Desktop menu items */}
          {/* User dropdown in desktop view */}
          <div className="hidden md:inline-block relative ml-4">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              {formData ? formData.name : "Login"}
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
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  {formData ? (
                    <>
                      <div className="px-4 py-2 bg-gray-100 rounded-t-md">
                        <div className="text-base font-medium text-gray-800">
                          {formData.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {formData.email}
                        </div>
                      </div>
                      <div className="border-t border-gray-200"></div>
                      {/* Tampilkan tombol ini hanya jika userRole adalah 1 atau 2 */}
                      {(userRole === "1" || userRole === "2") && (
                        <>
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            onClick={() => navigate("/dashboard")}
                          >
                            Dashboard
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            onClick={() => navigate("/user/settings")}
                          >
                            Settings
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            onClick={() => navigate("/profile/edit")}
                          >
                            Profile
                          </button>
                        </>
                      )}
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
