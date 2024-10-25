import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import UpdateProfile from "./partials/update-profile";
import UpdatePassword from "./partials/update-password";
import DeleteAccount from "./partials/delete-account";
import "../../../App.css";

const DaftarPelayanan = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Edit Profile`;
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bodyadmin flex relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />{" "}
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        <div className="bodyadmin">
          <div className="texttitle">Profile</div>
          <div>
            <form></form>
          </div>
          <UpdateProfile />
          <UpdatePassword />
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default DaftarPelayanan;
