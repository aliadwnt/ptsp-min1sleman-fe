import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import {
  fetchDaftarPeran,
  createDaftarPeran,
  updateDaftarPeran,
  deleteDaftarPeran,
} from "../../../services/daftarPeranService";
import "../../../App.css";

const DaftarPeran = () => {
  const [dataDaftarPeran, setDataDaftarPeran] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPeran, setCurrentDaftarPeran] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Peran`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPeran();
      setDataDaftarPeran(response);
    } catch (error) {
      console.error("Error fetching Master Peran:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataDaftarPeran.filter((item) =>
      String(item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataDaftarPeran(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteDaftarPeran(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentDaftarPeran(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, is_admin } = e.target.elements;

    const daftarPeran = {
      name: name.value,
      is_admin: is_admin.value,
    };

    try {
      if (currentDaftarPeran) {
        await updateDaftarPeran(currentDaftarPeran.id, daftarPeran);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarPeran(daftarPeran);
        setMessage("Data berhasil ditambahkan");
      }
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarPeran(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="bodyadmin flex relative">
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
        <div className="bodyadmin">
          <div className="texttitle">Daftar Peran</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          <div className="flex items-center justify-center space-x-2 mb-4">
            <form onSubmit={handleSearch} className="flex flex-grow justify-center">
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
                <i className="fas fa-plus mr-2"></i>Tambah
              </button>
            </form>
          </div>

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengguna</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarPeran.length > 0 ? (
                        dataDaftarPeran.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-6 py-3 text-xs font-medium text-center text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.name}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.is_admin === 1 ? 'ADMIN' : 'USER'}
                            </td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => { setCurrentDaftarPeran(item); setModalOpen(true); }}
                                className="focus:outline-none"
                                style={{ background: 'none', border: 'none', padding: 0 }}
                              >
                                <i className="fas fa-edit text-green-600 hover:text-green-900"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="focus:outline-none"
                                style={{ background: 'none', border: 'none', padding: 0 }}
                              >
                                <i className="fas fa-trash text-red-600 hover:text-red-900"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                <h2 className="text-xl font-semibold mb-4">{currentDaftarPeran ? "Edit Daftar Peran" : "Tambah Daftar Peran"}</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentDaftarPeran?.name || ""}
                    placeholder="Name"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <select
                    name="is_admin"
                    defaultValue={currentDaftarPeran?.is_admin || ""}
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4 font-poppins"
                  >
                    <option value="">Pilih Peran</option>
                    <option value="1">Admin</option>
                    <option value="0">User</option>
                  </select>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {currentDaftarPeran ? "Update" : "Tambah"}
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

export default DaftarPeran;
