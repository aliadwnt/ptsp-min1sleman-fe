import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchDaftarSyarat,
  createDaftarSyarat,
  updateDaftarSyarat,
  deleteDaftarSyarat,
} from "../../services/daftarSyaratService";
import { fetchUnitPengolah } from "../../services/unitPengolahService";
import "../../App.css";

const DaftarSyarat = () => {
  const [dataDaftarSyarat, setDataDaftarSyarat] = useState([]);
  const [unitPengolahOptions, setUnitPengolahOptions] = useState([]); // Ubah nama state menjadi unitPengolahOptions
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarSyarat, setCurrentDaftarSyarat] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const fetchData = async () => {
  try {
    const [syaratData, unitPengolahData] = await Promise.all([
      fetchDaftarSyarat(),
      fetchUnitPengolah(),
    ]);
    console.log(unitPengolahData); // Cek data yang diterima
    setDataDaftarSyarat(syaratData);
    setUnitPengolahOptions(unitPengolahData);
  } catch (error) {
    setError("Error fetching data: " + error.message);
    console.error("Error:", error);
  }
};

  useEffect(() => {
    document.title = "PTSP MAN 1 YOGYAKARTA - Daftar Syarat";
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      unit: formData.get("unit"),
      name: formData.get("name"),
      syarat_layanan: formData.get("syarat_layanan"),
    };

    try {
      if (currentDaftarSyarat) {
        await updateDaftarSyarat(currentDaftarSyarat.id, data);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarSyarat(data);
        setMessage("Data berhasil ditambahkan");
      }
      fetchData(); // Refresh data
      handleModalClose(); // Close modal
    } catch (error) {
      console.error("Error:", error);
      setError("Error submitting data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDaftarSyarat(id);
      setMessage("Data berhasil dihapus");
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error:", error);
      setError("Error deleting data: " + error.message);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarSyarat(null);
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div className="bodyadmin">
          <div className="texttitle">Daftar Syarat</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="flex items-center justify-between space-x-2 mb-4">
            <form onSubmit={handleSearch} className="flex flex-grow justify-center">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-2/5 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              <select
                name="unit" 
                className="w-2/5 p-2 pl-4 text-sm border text-gray-400 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Unit Pengolah</option>
                {unitPengolahOptions.length > 0 ? (
                  unitPengolahOptions.map((unit, index) => (
                    <option key={index} value={unit.name}>
                      {unit.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading unit...
                  </option>
                )}
              </select>
            </form>
          </div>

          {/* Table for displaying data */}
          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit Pengolah
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Syarat Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarSyarat.length > 0 ? (
                        dataDaftarSyarat.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-1 py-1 text-xs font-medium text-center text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.unit}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.name}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.syarat_layanan}
                            </td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => {
                                  setCurrentDaftarSyarat(item);
                                  setModalOpen(true);
                                }}
                                className="focus:outline-none"
                                style={{ background: "none", border: "none", padding: 0 }}
                              >
                                <i className="fas fa-edit text-green-600"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="focus:outline-none"
                                style={{ background: "none", border: "none", padding: 0 }}
                              >
                                <i className="fas fa-trash-alt text-red-600"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-gray-600">
                            Tidak ada data yang tersedia
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
    </div>
  );
};

export default DaftarSyarat;
