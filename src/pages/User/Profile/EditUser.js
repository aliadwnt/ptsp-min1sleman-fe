import React, { useEffect } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Favicon from "../../../components/Favicon";
import "../../../index.css";
import UpdateProfile from "./partials/update-profile";
import UpdatePassword from "./partials/update-password";
import DeleteAccount from "./partials/delete-account";
import { UserIcon } from "@heroicons/react/24/solid";

const EditUser = () => {
  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Edit User";
  }, []);

  // Tambahkan logika untuk sidebar jika diperlukan
  const isSidebarOpen = false; 

  return (
    <div className="flex flex-col min-h-full">
      <Favicon />
      <Navbar />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto my-8">
          <div className="flex items-center border-b border-gray-300 pb-4 mb-6">
            <UserIcon className="w-8 h-8 text-gray-800 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">Edit Profile</h1>
          </div>
          <UpdateProfile />
          <UpdatePassword />
          <DeleteAccount />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditUser;
