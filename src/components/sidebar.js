import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { fetchSettings } from "../services/settingsService";
import DEFAULT_LOGO_URL from "../images/logo_min_1 copy.png";

const Sidebar = (isOpen) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [logo, setLogo] = useState(DEFAULT_LOGO_URL);
  const userRole = localStorage.getItem("userRole");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "block pl-3 pr-4 py-2 text-green-800 font-semibold bg-green-100 rounded-lg hover:shadow-md"
      : "block pl-3 pr-4 py-2 text-gray-500 hover:bg-green-100 hover:text-gray-700 rounded-lg";
  };

  const toggleDropdown = () => {
    setOpenDropdown((prev) => (prev === "surat" ? null : "surat"));
  };

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
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex select-none">
      <button
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={
              isSidebarOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            }
          />
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-white`}
        aria-label="Sidebar"
      >
        <Link
          to="/"
          className="sidebar-header block p-4 shadow-md"
          style={{ backgroundColor: "#16A34A" }}
        >
          <img src={logo} alt="App Logo" className="h-14 mx-auto" />
          <div>
            <p className="font-family text-center font-bold text-white">
              PTSP MIN 1 SLEMAN
            </p>
          </div>
        </Link>

        <div
          className="px-3 py-3 overflow-y-auto h-full bg-green-50 border-gray-300"
          style={{ maxHeight: "calc(100vh - 56px)" }}
        >
          {(userRole === "admin" || userRole === "superadmin") && (
            <>
              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Home</b>
              </div>
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
              </Link>
              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Kelola Pelayanan</b>
              </div>
              <Link
                to="/layanan/daftar-pelayanan"
                className={getLinkClass("/layanan/daftar-pelayanan")}
              >
                <i className="fas fa-list mr-2"></i> Daftar Pelayanan
              </Link>
              <Link
                to="/layanan/arsip-layanan"
                className={getLinkClass("/layanan/arsip-layanan")}
              >
                <i className="fas fa-archive mr-2"></i> Arsip Pelayanan
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("surat")}
                onMouseLeave={() => setOpenDropdown(null)}
                ref={dropdownRef}
              >
                <div className="block pl-3 pr-4 py-2 text-gray-500 hover:bg-green-100 w-full text-left cursor-pointer">
                  <i className="fas fa-envelope mr-2"></i> Surat Menyurat
                </div>
                <div
                  className={`${
                    openDropdown === "surat" || window.innerWidth < 640
                      ? "block"
                      : "hidden"
                  } ml-4 space-y-2`}
                >
                  <Link
                    to="/surat/surat-masuk"
                    className={getLinkClass("/surat/surat-masuk")}
                  >
                    <i className="fas fa-inbox mr-2"></i> Surat Masuk
                  </Link>
                  <Link
                    to="/surat/surat-keluar"
                    className={getLinkClass("/surat/surat-keluar")}
                  >
                    <i className="fas fa-paper-plane mr-2"></i> Surat Keluar
                  </Link>
                </div>
              </div>

              {/* Menu untuk admin */}
              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Kelola Disposisi</b>
              </div>
              <Link
                to="/disposisi/master-disposisi"
                className={getLinkClass("/disposisi/master-disposisi")}
              >
                <i className="fas fa-folder-open mr-2"></i> Master Disposisi
              </Link>
              <Link
                to="/disposisi/daftar-disposisi"
                className={getLinkClass("/disposisi/daftar-disposisi")}
              >
                <i className="fas fa-list mr-2"></i> Daftar Disposisi
              </Link>

              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Kelola Pengguna</b>
              </div>
              <Link to="/user/users" className={getLinkClass("/user/users")}>
                <i className="fas fa-users mr-2"></i> Daftar Pengguna
              </Link>
              <Link
                to="/user/users/daftar-peran"
                className={getLinkClass("/user/users/daftar-peran")}
              >
                <i className="fas fa-user-tag mr-2"></i> Daftar Peran
              </Link>
              <Link
                to="/user/unit-pengolah"
                className={getLinkClass("/user/unit-pengolah")}
              >
                <i className="fas fa-sitemap mr-2"></i> Unit Pengolah
              </Link>

              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Kelola Master Layanan</b>
              </div>
              <Link
                to="/layanan/jenis-layanan"
                className={getLinkClass("/layanan/jenis-layanan")}
              >
                <i className="fas fa-tags mr-2"></i> Jenis Layanan
              </Link>
              <Link
                to="/layanan/daftar-layanan"
                className={getLinkClass("/layanan/daftar-layanan")}
              >
                <i className="fas fa-cogs mr-2"></i> Daftar Layanan
              </Link>
              <Link
                to="/layanan/output-layanan"
                className={getLinkClass("/layanan/output-layanan")}
              >
                <i className="fas fa-file-alt mr-2"></i> Output Layanan
              </Link>

              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Kelola Master Syarat</b>
              </div>
              <Link
                to="/layanan/master-syarat"
                className={getLinkClass("/layanan/master-syarat")}
              >
                <i className="fas fa-check-circle mr-2"></i> Master Syarat
              </Link>
              <Link
                to="/layanan/daftar-syarat"
                className={getLinkClass("/layanan/daftar-syarat")}
              >
                <i className="fas fa-list-alt mr-2"></i> Daftar Syarat
              </Link>
            </>
          )}

          {/* Menu untuk staff dan kepala madrasah */}
          {(userRole === "staff" || userRole === "kepala madrasah") && (
            <>
              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Home</b>
              </div>
              <Link
                to="/dashboard-staff"
                className={getLinkClass("/dashboard-staff")}
              >
                <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("surat")}
                onMouseLeave={() => setOpenDropdown(null)}
                ref={dropdownRef}
              >
                <div className="block pl-3 pr-4 py-2 text-gray-500 hover:bg-green-100 w-full text-left cursor-pointer">
                  <i className="fas fa-envelope mr-2"></i> Surat Menyurat
                </div>
                <div
                  className={`${
                    openDropdown === "surat" || window.innerWidth < 640
                      ? "block"
                      : "hidden"
                  } ml-4 space-y-2`}
                >
                  <Link
                    to="/surat/surat-masuk"
                    className={getLinkClass("/surat/surat-masuk")}
                  >
                    <i className="fas fa-inbox mr-2"></i> Surat Masuk
                  </Link>
                  <Link
                    to="/surat/surat-keluar"
                    className={getLinkClass("/surat/surat-keluar")}
                  >
                    <i className="fas fa-paper-plane mr-2"></i> Surat Keluar
                  </Link>
                </div>
              </div>
              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Kelola Disposisi</b>
              </div>
              <Link
                to="/disposisi/daftar-disposisi"
                className={getLinkClass("/disposisi/daftar-disposisi")}
              >
                <i className="fas fa-list mr-2"></i> Daftar Disposisi
              </Link>
            </>
          )}

          {/* Settings untuk admin */}
          {(userRole === "admin" ||
            userRole === "superadmin" ||
            userRole === "staff" ||
            userRole === "kepala madrasah") && (
            <div className="sidebar-content pb-10">
              <div className="block w-full pl-3 pr-4 py-3 text-gray-600">
                <b>Settings</b>
              </div>
              <Link
                to="/settings/daftar-settings"
                className={getLinkClass("/settings")}
              >
                <i className="fas fa-cog mr-2"></i> Settings
              </Link>
            </div>
          )}

          <div className="mt-5"></div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
