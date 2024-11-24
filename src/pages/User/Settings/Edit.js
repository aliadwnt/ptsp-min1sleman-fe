import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import Favicon from "../../../components/Favicon";

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
 <div className="min-h-screen w-full bg-gray-50 flex flex-col m-0 p-0 relative">
      <Favicon />
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
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Change Language
              </h2>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">Update your browser language.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className={`text-sm p-2 rounded ${
                    statusMessage.includes("Changed")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSaving
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:outline-none"
                }`}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageForm;
