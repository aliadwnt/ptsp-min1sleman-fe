import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import {
  fetchDaftarPengguna,
  createDaftarPengguna,
  updateDaftarPengguna,
  deleteDaftarPengguna,
} from "../../../services/daftarPenggunaService";
import "../../../App.css";

const DaftarPengguna = () => {
  const [dataDaftarPengguna, setDataDaftarPengguna] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPengguna, setCurrentDaftarPengguna] = useState(null);

  useEffect(() => {
    document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Pengguna`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPengguna();
      setDataDaftarPengguna(response);
    } catch (error) {
      console.error("Error fetching Daftar Pengguna:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = dataDaftarPengguna.filter((item) =>
      String(item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataDaftarPengguna(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteDaftarPengguna(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentDaftarPengguna(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const { id, isAdmin } = e.target.elements;

    formData.append("id", id.value);
    formData.append("isAdmin", isAdmin.value);

    try {
      if (currentDaftarPengguna) {
        await updateDaftarPengguna(currentDaftarPengguna.id, formData);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarPengguna(formData);
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
    setCurrentDaftarPengguna(null);
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div className="bodyadmin">
          <div className="texttitle">Daftar Pengguna</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          <div className="flex items-center justify-between space-x-2 mb-4">
            <form onSubmit={handleSearch} className="flex flex-grow">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="ml-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
            <button
              onClick={handleAdd}
              className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
            >
              <i className="fas fa-plus mr-2"></i>Tambah
            </button>
          </div>

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No ID Pengguna</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarPengguna.length > 0 ? (
                        dataDaftarPengguna.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-1 py-1 text-xs font-medium text-center text-gray-900 dark:text-white">{index + 1}</td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.id}</td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.isAdmin}</td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button onClick={() => { setCurrentDaftarPengguna(item); setModalOpen(true); }} className="text-green-600 hover:text-green-900">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No data available</td>
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
              <div className="bg-white rounded-lg shadow-lg p-6 w-50">
                <h2 className="text-xl font-semibold mb-4">{currentDaftarPengguna ? "Edit Pengguna" : "Tambah Pengguna"}</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="id" defaultValue={currentDaftarPengguna?.id || ""} placeholder="id" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="isAdmin" defaultValue={currentDaftarPengguna?.isAdmin || ""} placeholder="isAdmin" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={handleModalClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{currentDaftarPengguna ? "Update" : "Tambah"}</button>
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

export default DaftarPengguna;
