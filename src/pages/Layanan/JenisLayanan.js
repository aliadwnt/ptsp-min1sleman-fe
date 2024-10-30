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

const JenisLayanan = () => {
  const [dataJenisLayanan, setDataJenisLayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJenisLayanan, setCurrentJenisLayanan] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Jenis Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchJenisLayanan();
      setDataJenisLayanan(response);
    } catch (error) {
      console.error("Error fetching Jenis Layanan:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataJenisLayanan.filter((item) =>
      String(item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setDataJenisLayanan(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteJenisLayanan(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
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
    try {
      if (currentJenisLayanan) {
        await updateJenisLayanan(currentJenisLayanan.id, JenisLayanan);
        setMessage("Data berhasil diupdate");
      } else {
        await createJenisLayanan(JenisLayanan);
        setMessage("Data berhasil ditambahkan");
      }
      fetchData();
      setModalOpen(false); // Close modal
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentJenisLayanan(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex relative min-h-screen">
      {/* Sidebar */}
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
          <h1 className="text-2xl font-semibold mb-4">Daftar Jenis Layanan</h1>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Sukses: </span>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-3/4 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />

              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus mr-2"></i>
                <span className="hidden md:inline">Tambah</span>
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full border border-gray-200 rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Layanan
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataJenisLayanan.length > 0 ? (
                    dataJenisLayanan.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-2 py-3 text-xs text-center text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-2 py-3 text-xs text-center text-gray-900">
                          {item.name}
                        </td>
                        <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
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
                    ))
                  ) : (
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
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4">
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
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      {currentJenisLayanan ? "Update" : "Simpan"}
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
