import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchMasterSyarat,
  createMasterSyarat,
  updateMasterSyarat,
  deleteMasterSyarat,
} from "../../services/masterSyaratService";
import "../../App.css";

const MasterSyarat = () => {
  const [dataMasterSyarat, setDataMasterSyarat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMasterSyarat, setCurrentMasterSyarat] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Master Syarat Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchMasterSyarat();
      setDataMasterSyarat(response);
    } catch (error) {
      console.error("Error fetching Master Syarat:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataMasterSyarat.filter((item) =>
      String(item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setDataMasterSyarat(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteMasterSyarat(id);
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
    setCurrentMasterSyarat(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { name } = e.target.elements;

  const isDuplicate = dataMasterSyarat.some((item) => item.name.toLowerCase() === name.value.toLowerCase());

  if (isDuplicate) {
    setMessage("Master Syarat sudah tersedia, Masukkan master syarat yang belum tersedia.");
    setIsError(true); 
    return; 
  }

  const MasterSyarat = {
    name: name.value,
  };

  try {
    if (currentMasterSyarat) {
      await updateMasterSyarat(currentMasterSyarat.id, MasterSyarat);
      setMessage("Data berhasil diupdate");
      setIsError(false);
    } else {
      await createMasterSyarat(MasterSyarat);
      setMessage("Data berhasil ditambahkan");
      setIsError(false);
    }
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
    setCurrentMasterSyarat(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
<div className="min-h-screen w-full bg-gray-100 flex flex-col m-0 p-0 relative">
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
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">Daftar Master Syarat Layanan</div>

          {message && (
            <div
              className={`p-4 m-8 text-sm rounded-lg ${
                isError
                  ? "text-red-800 bg-red-50 dark:bg-red-50 dark:text-red-800"
                  : "text-green-800 bg-green-50 dark:bg-green-50 dark:text-green-800"
              }`}
              role="alert"
            >
              <span className="font-medium">{isError ? "Error" : "Sukses"} </span>
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
                <i className="fas fa-plus"></i>
                <span className="ml-1">Tambah</span>
              </button>
            </form>
          </div>

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-200">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                          Master Syarat
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataMasterSyarat.length > 0 ? (
                        dataMasterSyarat.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-2 py-3 text-xs font-medium text-center text-gray-900 dark:text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-2 py-3 text-xs text-center text-gray-900 dark:text-gray-900">
                              {item.name}
                            </td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => {
                                  setCurrentMasterSyarat(item);
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
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                  {currentMasterSyarat
                    ? "Edit Master Syarat"
                    : "Tambah Master Syarat"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentMasterSyarat?.name || ""}
                    placeholder="Nama Master Syarat"
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
                      {currentMasterSyarat ? "Update" : "Simpan"}
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

export default MasterSyarat;
