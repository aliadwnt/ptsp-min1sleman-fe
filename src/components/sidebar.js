import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo-kemenag.png";
import "../App.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "block pl-3 pr-4 py-2 text-gray-900 bg-gray-100 dark:bg-gray-100 dark:text-gray-700"
      : "block pl-3 pr-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200";
  };

  const toggleDropdown = () => {
    setOpenDropdown((prev) => (prev === "surat" ? null : "surat"));
  };

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
    <div className="flex">
      <button
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-white dark:bg-gray-200`}
        aria-label="Sidebar"
      >
        <Link to="/" className="sidebar-header block p-4">
          <img src={logo} alt="Logo" className="h-14 mx-auto" />
          <p
            className="text-center font-bold text-white dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            PTSP MIN 1 SLEMAN
          </p>
        </Link>

        <div
          className="overflow-y-auto h-full bg-white border-gray-300"
          style={{ maxHeight: "calc(100vh - 56px)" }}
        >
          <div>
            <div className="block w-full pl-3 pr-4 py-3 text-gray-300"><b>Home</b></div>
            <Link to="/dashboard" className={getLinkClass("/dashboard")}>
              <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
            </Link>
          </div>

          {/* Kelola Pelayanan Section */}
          <div>
            <div className="block w-full pl-3 pr-4 py-3 text-gray-300"><b>Kelola Pelayanan</b></div>
            <Link to="/layanan/daftar-pelayanan" className={getLinkClass("/layanan/daftar-pelayanan")}>
              <i className="fas fa-list mr-2"></i> Daftar Pelayanan
            </Link>
            <Link to="/layanan/arsip-layanan" className={getLinkClass("/layanan/arsip-layanan")}>
              <i className="fas fa-archive mr-2"></i> Arsip Pelayanan
            </Link>

            {/* Dropdown for Surat Menyurat */}
            <div
              onClick={toggleDropdown}
              className={`block pl-3 pr-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-00 w-full text-left cursor-pointer`}
              ref={dropdownRef}
            >
              <i className="fas fa-envelope mr-2"></i> Surat Menyurat
              {openDropdown === "surat" && (
                <div className="ml-4">
                  <Link to="/surat/surat-masuk" className={getLinkClass("/surat/surat-masuk")}>
                    <i className="fas fa-inbox mr-2"></i> Surat Masuk
                  </Link>
                  <Link to="/surat/surat-keluar" className={getLinkClass("/surat/surat-keluar")}>
                    <i className="fas fa-paper-plane mr-2"></i> Surat Keluar
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Kelola Disposisi Section */}
          <div>
            <div className="block w-full pl-3 pr-4 py-3 text-gray-300"><b>Kelola Disposisi</b></div>
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
          </div>

          {/* Kelola Pengguna Section */}
          <div>
            <div className="block w-full pl-3 pr-4 py-3 text-gray-300">
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
          </div>

          {/* Kelola Master Layanan Section */}
          <div>
            <div className="block w-full pl-3 pr-4 py-3 text-gray-300">
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
              <i className="fas fa-th-list mr-2"></i> Daftar Layanan
            </Link>
            <Link
              to="/layanan/output-layanan"
              className={getLinkClass("/layanan/output-layanan")}
            >
              <i className="fas fa-file-alt mr-2"></i> Output Layanan
            </Link>
          </div>

          {/* Kelola Master Syarat Section */}
          <div>
            <div className="block w-full pl-3 pr-4 py-3 text-gray-300">
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
          </div>
          <div className="mt-10">
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
