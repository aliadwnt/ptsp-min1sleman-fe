import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserDropdown = ({ formData, userRole, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      {formData ? (
        <>
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
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
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div className="px-4 py-2 bg-gray-100 rounded-t-md">
                  <div className="text-base font-medium text-gray-800">
                    {formData.name}
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {formData.email}
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>
                {userRole === "0" && (
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => navigate("/edit-user")}
                  >
                    Edit Profile
                  </button>
                )}
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
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          LOGIN
        </Link>
      )}
    </div>
  );
};

export default UserDropdown;
