import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Favicon from "../../../components/Favicon";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const LanguageForm = ({ onSubmit, successMessage, errorMessage }) => {
  const supportedLanguages = {
    en: "English",
    id: "Bahasa Indonesia",
  };

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Pengaturan`;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSubmit(selectedLanguage);
      setStatusMessage(successMessage);
    } catch (error) {
      setStatusMessage(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
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
        <div className="p-3 bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-8">
          <div className="mt-4 flex items-center gap-2">
            <GlobeAltIcon className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Change Language
              </h2>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 mt-2">Update your browser language.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label
                  htmlFor="language"
                  className="mt-2 block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="font-family block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  {Object.entries(supportedLanguages).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {statusMessage && (
                <div
                  className={`text-sm p-2 rounded flex items-center gap-2 ${
                    statusMessage.includes("Changed")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {statusMessage.includes("Changed") ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <XCircleIcon className="w-5 h-5" />
                  )}
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white flex items-center justify-center gap-2 ${
                  isSaving
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:outline-none"
                }`}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageForm;
