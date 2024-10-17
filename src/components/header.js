import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { logoutPengguna, getUserById } from "../services/daftarPenggunaService";
import {
  HomeIcon,
  CogIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const UserProfileMenu = () => {
  const [formData, setFormData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const { userId, exp } = decodedToken;
  
          const currentTime = Math.floor(Date.now() / 1000);
          if (exp < currentTime) {
            console.log("Token expired. Navigating to login...");
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
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    console.log("Logout clicked!");
    try {
      await logoutPengguna();
      localStorage.removeItem("token");
      console.log("Token removed and navigating to login...");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Determine the active path
  const isActive = (path) => (location.pathname === path ? "bg-green-400" : "");

  return (
    <header className="sticky top-0 bg-[#11ad00] w-full px-6 pt-8 pb-7 flex justify-between items-center text-white z-10">
      <div className="textheader"></div>
      <div className="relative inline-block text-left">
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
      </div>
    </header>
  );
};

export default UserProfileMenu;
