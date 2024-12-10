import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import {
  fetchUnitPengolah,
  createUnitPengolah,
  updateUnitPengolah,
  deleteUnitPengolah,
} from "../../../services/unitPengolahService";
import "../../../App.css";
import LoadingPage from "../../../components/loadingPage";
import Favicon from "../../../components/Favicon";

const UnitPengolah = () => {
  const [dataUnitPengolah, setDataUnitPengolah] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUnitPengolah, setCurrentUnitPengolah] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataUnitPengolah.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataUnitPengolah.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Unit Pengolah`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchUnitPengolah();
      setDataUnitPengolah(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Unit Pengolah:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataUnitPengolah(dataUnitPengolah);
    } else {
      const filteredData = dataUnitPengolah.filter((item) =>
        String(item.name || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setDataUnitPengolah(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteUnitPengolah(id);
        setMessage("Data berhasil dihapus");
        setIsError(false);
        setIsLoading(true);
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
        setIsError(true);
        setIsLoading(false);
      }
    }
  };

  const handleAdd = () => {
    setCurrentUnitPengolah(null);
    setModalOpen(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { name } = e.target.elements;

    const isDuplicate = dataUnitPengolah.some(
      (item) =>
        item.name.toLowerCase() === name.value.toLowerCase() &&
        currentUnitPengolah?.id !== item.id
    );

    if (isDuplicate) {
      setMessage(
        "Unit Pengolah sudah tersedia, Masukkan unit pengolah yang belum tersedia"
      ); // Error message for duplicates
      setIsError(true);
      return;
    }

    formData.append("name", name.value);

    try {
      if (currentUnitPengolah) {
        await updateUnitPengolah(currentUnitPengolah.id, formData);
        setMessage("Data berhasil diupdate");
        setIsLoading(true);
      } else {
        await createUnitPengolah(formData);
        setMessage("Data berhasil ditambahkan");
        setIsLoading(true);
      }
      setIsError(false);
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
      setIsError(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentUnitPengolah(null);
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
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        {message && (
          <div
            className={`flex justify-center items-center p-4 m-2 text-sm ${
              isError ? "text-red-800 bg-red-50" : "text-green-800 bg-green-50"
            } rounded-lg`}
            role="alert"
          >
            <span className="font-medium">
              {isError ? "Error" : "Sukses"}:{" "}
            </span>
            {message}
          </div>
        )}
        <div className="p-4">
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-sitemap mr-2"></i> Daftar Unit Pengolah
              </div>

              <form
                onSubmit={handleSearch}
                className="flex flex-grow justify-end space-x-2"
              >
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full md:w-64 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                  >
                    <i className="fas fa-sync-alt text-xs"></i>
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center bg-green-600 text-white rounded-lg py-1 px-3 hover:bg-green-700"
                  >
                    <i className="fas fa-plus text-xs"></i>
                    <span className="ml-1 text-sm">Tambah</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
              <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Total Daftar Unit Pengolah : 
                    <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {dataUnitPengolah.length}
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
                          Nama Unit Pengolah
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Aksi
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
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              <button
                                onClick={() => {
                                  setCurrentUnitPengolah(item);
                                  setModalOpen(true);
                                }}
                                className="text-green-600 hover:text-green-900"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="focus:outline-none"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <i className="fas fa-trash text-red-600 hover:text-red-900"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
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

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i
                    className={`mr-2 p-2 rounded-full text-white ${
                      currentUnitPengolah
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentUnitPengolah
                    ? "Edit Unit Pengolah"
                    : "Tambah Unit Pengolah"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentUnitPengolah?.name || ""}
                    placeholder="Masukkan nama unit pengolah"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {currentUnitPengolah ? "Update" : "Tambah"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitPengolah;
