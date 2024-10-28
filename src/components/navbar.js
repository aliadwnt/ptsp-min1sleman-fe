import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo-kemenag.png";
import "../App.css";
import { logoutPengguna, getUserById } from "../services/daftarPenggunaService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleDropdown = () => setIsOpen((prev) => !prev);

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

  const renderMenuItems = () => {
    const menuPaths = ["/", "/layanan", "/visi-misi", "/lacak-berkas", "/zona-integritas"];
    return menuPaths.map((path, index) => (
      <li key={index}>
        <Link
          to={path}
          className={`txt transition-colors duration-300 ease-in-out ${
            location.pathname === path ? "text-white font-extrabold" : "text-white hover:text-blue-600"
          }`}
        >
          {path === "/" ? "Beranda" : path.replace("/", "").replace("-", " ")}
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* Sidebar for mobile */}
          {menuOpen && (
            <div className="absolute top-0 left-0 w-3/4 h-screen bg-white shadow-lg md:hidden z-50 transition transform duration-300 ease-in-out">
              <button className="absolute top-4 right-4" onClick={toggleMenu}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul className="flex flex-col space-y-4 mt-20 px-4">{renderMenuItems()}</ul>
            </div>
          )}

          <ul className="hidden md:flex space-x-5">{renderMenuItems()}</ul>

          <div className="relative inline-block text-left ml-4">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-expanded={isOpen}
            >
              {formData ? formData.name : "Login"}
              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transition duration-150 ease-in-out">
                <div className="py-1" role="menu">
                  {formData ? (
                    <>
                      <div className="px-4 py-2 bg-gray-100 rounded-t-md">
                        <div className="text-base font-medium text-gray-800">{formData.name}</div>
                        <div className="text-sm font-medium text-gray-500">{formData.email}</div>
                      </div>
                      <div className="border-t border-gray-200"></div>
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
                      <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={handleLogout}>
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
