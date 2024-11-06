import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchMasterDisposisi,
  createMasterDisposisi,
  updateMasterDisposisi,
  deleteMasterDisposisi,
} from "../../services/masterDisposisiService";
import "../../App.css";

const MasterDisposisi = () => {
  const [dataMasterDisposisi, setDataMasterDisposisi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); // New state for error tracking
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMasterDisposisi, setCurrentMasterDisposisi] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Master Disposisi`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchMasterDisposisi();
      setDataMasterDisposisi(response);
    } catch (error) {
      console.error("Error fetching Master Disposisi:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataMasterDisposisi(dataMasterDisposisi);
    } else {
      const filteredData = dataMasterDisposisi.filter((item) =>
        String(item.name || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setDataMasterDisposisi(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteMasterDisposisi(id);
        setMessage("Data berhasil dihapus");
        setIsError(false);
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
        setIsError(true);
      }
    }
  };

  const handleAdd = () => {
    setCurrentMasterDisposisi(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = e.target.elements;

    const MasterDisposisi = {
      name: name.value,
    };

    const isDuplicate = dataMasterDisposisi.some(
      (item) => item.name.toLowerCase() === MasterDisposisi.name.toLowerCase()
    );
    if (isDuplicate) {
      setMessage(
        "Master Disposisi Sudah tersedia, Masukkan Master Disposisi yang belum tersedia"
      );
      setIsError(true);
      return;
    }

    try {
      if (currentMasterDisposisi) {
        await updateMasterDisposisi(currentMasterDisposisi.id, MasterDisposisi);
        setMessage("Data berhasil diupdate");
      } else {
        await createMasterDisposisi(MasterDisposisi);
        setMessage("Data berhasil ditambahkan");
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
    setCurrentMasterDisposisi(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-0 m-0 flex relative">
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
          <div className="text-xl font-semibold mb-4">
            Daftar Master Disposisi
          </div>

          {message && (
            <div
              className={`p-4 m-2 text-sm ${
                isError
                  ? "text-red-800 bg-red-50"
                  : "text-green-800 bg-green-50"
              } rounded-lg`}
              role="alert"
            >
              <span className="font-medium">
                {isError ? "Error" : "Sukses"}:{" "}
              </span>
              {message}
            </div>
          )}

          <div className="flex items-center justify-center space-x-2 mb-4">
            <form
              onSubmit={handleSubmit}
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
                        Master Disposisi
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 font-bold uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataMasterDisposisi.length > 0 ? (
                      dataMasterDisposisi.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900 ">
                            {item.name}
                          </td>
                          <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setCurrentMasterDisposisi(item);
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
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500  uppercase tracking-wider"
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

          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                  {currentMasterDisposisi
                    ? "Edit Master Disposisi"
                    : "Tambah Master Disposisi"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentMasterDisposisi?.name || ""}
                    placeholder="Master Disposisi"
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
                      {currentMasterDisposisi ? "Update" : "Tambah"}
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

export default MasterDisposisi;
