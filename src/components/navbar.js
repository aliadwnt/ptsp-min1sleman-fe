import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DEFAULT_LOGO_URL from "../images/logo_min_1 copy.png";
import "../App.css";
import { logoutPengguna, getUserById } from "../services/daftarPenggunaService";
import { fetchSettings } from "../services/settingsService";
import NavigationMenu from "./NavigationMenu";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [logo, setLogo] = useState(DEFAULT_LOGO_URL);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { userId, exp } = decodedToken;

        if (Date.now() / 3000 > exp) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          navigate("/");
          return;
        }

        try {
          const data = await getUserById(userId);
          setFormData(data);
          setIsLoggedIn(true);
          setUserRole(localStorage.getItem("userRole"));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetchSettings();

        if (Array.isArray(response)) {
          const logoSetting = response.find((item) => item.key === "app_logo");

          if (logoSetting && logoSetting.value) {
            setLogo(logoSetting.value);
          }
        }
      } catch (error) {
        console.error("Gagal memuat logo:", error);
      }
    };
    fetchLogo();
  }, []);

  const handleLogout = async () => {
    await logoutPengguna();
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const menuPaths = [
    { path: "/", label: "Beranda" },
    { path: "/layanan", label: "Layanan" },
    { path: "/visi-misi", label: "Visi & Misi" },
    { path: "/lacak-berkas", label: "Lacak Berkas" },
    { path: "/zona-integritas", label: "Zona Integritas" },
  ];

  const filteredMenuPaths = !isLoggedIn
    ? menuPaths.filter(({ path }) =>
        ["/", "/visi-misi", "/zona-integritas"].includes(path)
      )
    : menuPaths;

  return (
    <nav className="bg-green-700 shadow-lg select-none">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="App Logo" className="w-12 h-12 rounded-full" />
          <h1 className="text-lg font-bold text-white">PTSP MIN 1 SLEMAN</h1>
        </div>

        <div className="relative flex items-center">
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* Menu Mobile */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-80 md:hidden flex justify-end">
              <div
                className={`relative top-0 right-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                  menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className=" right-4 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:text-red-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <i className="fa fa-times text-lg"></i>
                </button>

                <div className="p-6">
                  {/* Logo */}
                  <div className="flex items-center space-x-3 mb-6">
                    <img
                      src={logo}
                      alt="PTSP Logo"
                      className="w-10 h-10 rounded-full"
                    />
                    <h1 className="text-lg font-bold text-gray-800">
                      PTSP MIN 1 SLEMAN
                    </h1>
                  </div>
                  {/* Navigation Menu */}
                  <NavigationMenu menuPaths={filteredMenuPaths} isMobile />
                  {/* User Dropdown */}
                  <div className="mt-6">
                    <UserDropdown
                      formData={formData}
                      userRole={userRole}
                      handleLogout={handleLogout}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Desktop */}
          <div className="hidden md:flex md:items-center space-x-8">
            <NavigationMenu menuPaths={filteredMenuPaths} />
            <UserDropdown
              formData={formData}
              userRole={userRole}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
