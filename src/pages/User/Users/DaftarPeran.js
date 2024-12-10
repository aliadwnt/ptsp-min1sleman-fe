import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import { fetchDaftarPengguna } from "../../../services/daftarPenggunaService";
import "../../../App.css";
import LoadingPage from "../../../components/loadingPage";
import Favicon from "../../../components/Favicon";

const DaftarPeran = () => {
  const [dataDaftarPeran, setdataDaftarPeran] = useState([]);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataDaftarPeran.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(dataDaftarPeran.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Peran`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPengguna();
      console.log("Data fetched:", response);
      setdataDaftarPeran(response);
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
      fetchData();
    } else {
      const filteredData = dataDaftarPeran.filter(
        (item) =>
          String(item.name || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.is_admin || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setdataDaftarPeran(filteredData);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="select-none min-h-screen w-full bg-gray-50 flex flex-col m-0 p-0 relative">
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
        <div className="p-4">
          <div>
            <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
              <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                  <i className="fas fa-user-tag mr-2"></i> Daftar Peran
                </div>
                <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2 w-full md:w-auto"
              >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 19a8 8 0 100-16 8 8 0 000 16zm-6-6h.01M16.39 16.39L21 21"
                  />
                </svg>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full md:w-48 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />  
                  <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                >
                  <i className="fas fa-sync-alt text-xs"></i>
                </button>
              </form>
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
              <div className="flex justify-center">
                <div className="w-full max-w-5xl">
                <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Total Daftar Peran : 
                    <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {dataDaftarPeran.length}
                    </text>
                    Data.
                  </text>
                  <div className="mt-2 overflow-x-auto border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            No
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Nama Pengguna
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Peran
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentData.length > 0 ? (
                          currentData.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                              <td className="w-12 px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {item.name}
                              </td>
                              <td className="max-w-xs truncate px-2 font-bold py-2 text-xs text-center text-gray-900 border border-gray-200">
                              {item.role === "superadmin" ? (
                                <span className="bg-blue-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  SUPER ADMIN
                                </span>
                              ) : item.role === "admin" ? (
                                <span className="bg-green-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  ADMIN
                                </span>
                              ) : item.role === "staff" ? (
                                <span className="bg-yellow-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  STAFF
                                </span>
                              ) : item.role === "kepala madrasah" ? (
                                <span className="bg-red-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  KEPALA MADRASAH
                                </span>
                              ) : (
                                <span className="bg-gray-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  USER
                                </span>
                              )}
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
                  <div className="flex justify-center mt-4 mb-6">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {currentPage > 1 && (
                        <div
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base"
                        >
                          <i className="fas fa-chevron-left text-sm md:text-lg"></i>
                        </div>
                      )}

                      {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber >= currentPage - 2 &&
                          pageNumber <= currentPage + 2
                        ) {
                          return (
                            <div
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`px-3 py-1 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base ${
                                currentPage === pageNumber
                                  ? "text-green-800 font-medium border-b-2 border-green-800"
                                  : "text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-gray-300"
                              }`}
                            >
                              {pageNumber}
                            </div>
                          );
                        }
                        return null;
                      })}

                      {currentPage < totalPages && (
                        <div
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base"
                        >
                          <i className="fas fa-chevron-right text-sm md:text-lg"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarPeran;
