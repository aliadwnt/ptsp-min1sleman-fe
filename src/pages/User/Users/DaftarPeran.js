import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import { fetchDaftarPengguna } from "../../../services/daftarPenggunaService";
import "../../../App.css";
import LoadingPage from "../../../components/loadingPage";

const DaftarPeran = () => {
  const [dataDaftarPengguna, setDataDaftarPengguna] = useState([]);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Peran`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPengguna();
      console.log("Data fetched:", response);
      setDataDaftarPengguna(response);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching Daftar Pengguna:", error);
      setIsLoading(false); 
    }
  };

  if (isLoading) {
    return <LoadingPage />;
}

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataDaftarPengguna(dataDaftarPengguna);
    } else {
      const filteredData = dataDaftarPengguna.filter(
        (item) =>
          String(item.name || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.is_admin || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataDaftarPengguna(filteredData);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-0 m-0 flex relative">
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
        <div>
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2">
            Daftar Peran
          </div>

          {message && (
            <div
              className={`p-4 m-8 text-sm rounded-lg ${
                message.includes("berhasil")
                  ? "text-green-800 bg-green-50 "
                  : "text-red-800 bg-red-50"
              }`}
              role="alert"
            >
              <span className="font-medium">
                {message.includes("berhasil") ? "Sukses " : "Error "}
              </span>
              {message}
            </div>
          )}

          <div className="flex items-center justify-center space-x-2 mb-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-grow justify-center"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-3/4 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 font-bold uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 font-bold uppercase tracking-wider">
                        Nama Pengguna
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 font-bold uppercase tracking-wider">
                        Peran
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataDaftarPengguna.length > 0 ? (
                      dataDaftarPengguna.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-2 py-3 text-xs text-center text-gray-900 ">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900 ">
                            {item.name}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900 ">
                            {item.is_admin === 2
                              ? "SUPER ADMIN"
                              : item.is_admin === 1
                              ? "ADMIN"
                              : "USER"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarPeran;
