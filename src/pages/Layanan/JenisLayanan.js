import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchJenisLayanan,
  createJenisLayanan,
  updateJenisLayanan,
  deleteJenisLayanan,
} from "../../services/jenisLayananService";
import "../../App.css";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";

const JenisLayanan = () => {
  const [dataJenisLayanan, setDataJenisLayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJenisLayanan, setCurrentJenisLayanan] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataJenisLayanan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataJenisLayanan.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Jenis Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchJenisLayanan();
      setDataJenisLayanan(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Jenis Layanan:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataJenisLayanan(dataJenisLayanan);
    } else {
      const filteredData = dataJenisLayanan.filter((item) =>
        String(item.name || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );

      setDataJenisLayanan(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteJenisLayanan(id);
        setMessage({
          type: "success", // Menentukan tipe pesan sukses
          text: "Data berhasil dihapus",
        });
        setIsLoading(true);
        await fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage({
          type: "error", // Menentukan tipe pesan error
          text: "Gagal menghapus data",
        });
        setIsLoading(false);
      }
    }
  };

  const handleAdd = () => {
    setCurrentJenisLayanan(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = e.target.elements;

    const JenisLayanan = {
      name: name.value,
    };

    const isDuplicate = dataJenisLayanan.some(
      (item) =>
        item.name.toLowerCase() === JenisLayanan.name.toLowerCase() &&
        (!currentJenisLayanan || item.id !== currentJenisLayanan.id)
    );

    if (isDuplicate) {
      setMessage({
        text: "Nama layanan sudah ada. Silakan gunakan nama lain.",
        type: "error",
      });
      return;
    }

    try {
      if (currentJenisLayanan) {
        await updateJenisLayanan(currentJenisLayanan.id, JenisLayanan);
        setMessage({ text: "Data berhasil diupdate", type: "success" });
        setIsLoading(true);
      } else {
        await createJenisLayanan(JenisLayanan);
        setMessage({ text: "Data berhasil ditambahkan", type: "success" });
        setIsLoading(true);
      }
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage({ text: "Failed to save data", type: "error" });
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentJenisLayanan(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-0 m-0een m-0 flex relative">
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
        <div className="p-4">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fas fa-tags mr-2"></i> Daftar Jenis Layanan
          </div>

          {message && (
            <div
              className={`p-4 m-8 text-sm rounded-lg ${
                message.type === "success"
                  ? "text-green-800 bg-green-50"
                  : "text-red-800 bg-red-50"
              }`}
              role="alert"
            >
              <span className="font-medium">
                {message.type === "success" ? "Sukses: " : "Error: "}
              </span>
              {message.text}
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
                className="w-3/5 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />

              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                type="button" // Ensure this button doesn't submit the form
                onClick={handleAdd}
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus"></i>
                <span className="ml-1">Tambah</span>
              </button>
            </form>
          </div>

          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-4xl">
            <h2 className="text-l font-poppins font-semibold mb-6 text-gray-700 text-left">
              Daftar Jenis Layanan di MIN 1 SLEMAN
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Nama Layanan
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
                              setCurrentJenisLayanan(item);
                              setModalOpen(true);
                            }}
                            className="focus:outline-none"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                            }}
                          >
                            <i className="fas fa-edit text-green-600 hover:text-green-900"></i>
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
                      )) ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          No data available
                        </td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border mr-1 ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded border mr-1 ${
                        currentPage === index + 1
                          ? "bg-green-500 text-white hover:bg-green-700"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Next
                  </button>
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
                      currentJenisLayanan
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentJenisLayanan
                    ? "Edit Jenis Layanan"
                    : "Tambah Jenis Layanan"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentJenisLayanan?.name || ""}
                    placeholder="Nama Layanan"
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
                      className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      {currentJenisLayanan ? "Update" : "Tambah"}
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

export default JenisLayanan;
