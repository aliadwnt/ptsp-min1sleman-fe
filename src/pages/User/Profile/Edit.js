import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import UpdateProfile from "./partials/update-profile";
import UpdatePassword from "./partials/update-password";
import DeleteAccount from "./partials/delete-account";
import "../../../App.css";
import Favicon from "../../../components/Favicon";
import { UserIcon } from "@heroicons/react/24/solid";

const Profile = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Edit Profile`;
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="select-none min-h-screen bg-gray-50 pb-0 m-0 flex relative">
      <Favicon />
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
            <div className="flex items-center border-b border-gray-300 pb-4 mb-6">
              <UserIcon className="w-8 h-8 text-gray-800 mr-3" />
              <h1 className="text-xl font-semibold text-gray-800">Edit Profile</h1>
            </div>
            <UpdateProfile />
            <UpdatePassword />
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
