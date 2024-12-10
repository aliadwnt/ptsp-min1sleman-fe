import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Notifications from "./Notifications";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole"); 
    setUserRole(role);
    console.log("User Role from localStorage:", role); 
  }, []); 

  return (
    <header className="select-none sticky top-0 bg-green-600 w-full px-6 flex justify-between items-center text-white z-10" style={{ paddingTop: "1.75rem", paddingBottom: "1.92rem" }}>
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <button
        aria-controls="sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <div className="ml-auto flex items-center space-x-3">
        {(userRole === "admin" || userRole === "superadmin") && <Notifications />}
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
