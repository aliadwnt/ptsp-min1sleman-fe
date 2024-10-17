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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const { userId, exp } = decodedToken; 

          const currentTime = Date.now() / 1000;
          if (exp < currentTime) {
            console.log("Token expired. Navigating to login...");
            localStorage.removeItem("token"); 
            navigate("/login"); 
            return; // Hentikan eksekusi lebih lanjut
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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("Logout clicked");
    try {
      await logoutPengguna();
      localStorage.removeItem("token");
      console.log("Token removed and navigating to login...");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="nav-des">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="PTSP Logo" className="w-12 h-12 rounded-full" />
          <p className="text-center font-bold">PTSP MIN 1 SLEMAN</p>
        </div>

        <div className="flex items-center space-x-4">
          <ul className="flex space-x-5">
            <li>
              <Link
                to="/"
                className={`txt ${location.pathname === "/" ? "active" : ""}`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/layanan"
                className={`txt ${location.pathname === "/layanan" ? "active" : ""}`}
              >
                Layanan
              </Link>
            </li>
            <li>
              <Link
                to="/visi-misi"
                className={`txt ${location.pathname === "/visi-misi" ? "active" : ""}`}
              >
                Visi Misi
              </Link>
            </li>
            <li>
              <Link
                to="/lacak-berkas"
                className={`txt ${location.pathname === "/lacak-berkas" ? "active" : ""}`}
              >
                Lacak Berkas
              </Link>
            </li>
            <li>
              <Link
                to="/zona-integritas"
                className={`txt ${location.pathname === "/zona-integritas" ? "active" : ""}`}
              >
                Zona Integritas
              </Link>
            </li>
          </ul>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {formData ? formData.name : "Login"}{" "}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {formData ? (
                    <>
                      <div className="px-4 py-2">
                        <div className="text-base font-medium text-gray-800">
                          {formData.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {formData.email}
                        </div>
                      </div>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/user/settings")}
                      >
                        Settings
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/profile/edit")}
                      >
                        Profile
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsOpen(false);
                      }}
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
