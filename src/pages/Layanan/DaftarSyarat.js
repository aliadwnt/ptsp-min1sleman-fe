import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchMasterSyarat
} from "../../services/masterSyaratService";
import { 
  createDaftarSyarat,
  updateDaftarSyarat,
  deleteDaftarSyarat 
} from "../../services/daftarSyaratService"
import { fetchUnitPengolah } from "../../services/unitPengolahService";
import { fetchJenisLayanan } from "../../services/jenisLayananService";
import "../../App.css";

const DaftarSyarat = () => {
  const [dataDaftarSyarat, setDataDaftarSyarat] = useState([]);
  const [unitPengolahOptions, setUnitPengolahOptions] = useState([]);
  const [jenisLayananOptions, setJenisLayananOptions] = useState([]);
  const [masterSyaratOptions, setMasterSyaratOptions] = useState([]); // New state for Master Syarat
  const [selectedSyaratLayanan, setSelectedSyaratLayanan] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(""); // New state for selected unit
  const [selectedJenisLayanan, setSelectedJenisLayanan] = useState(""); // New state for selected jenis layanan
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarSyarat, setCurrentDaftarSyarat] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [syaratData, unitPengolahData, jenisLayananData, masterSyaratData] = await Promise.all([
        fetchMasterSyarat(),
        fetchUnitPengolah(),
        fetchJenisLayanan(),
        fetchMasterSyarat(), // Make sure you have this service
      ]);
      setDataDaftarSyarat(syaratData);
      setUnitPengolahOptions(unitPengolahData);
      setJenisLayananOptions(jenisLayananData);
      setMasterSyaratOptions(masterSyaratData); // Set master syarat data
    } catch (error) {
      setError("Error fetching data: " + error.message);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Daftar Syarat";
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      unit: selectedUnit, // Use selectedUnit
      name: formData.get("name"),
      syarat_layanan: selectedSyaratLayanan, // Using selectedSyaratLayanan
      jenis_layanan: selectedJenisLayanan, // Use selectedJenisLayanan
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
    setSelectedSyaratLayanan([]); // Reset selectedSyaratLayanan on modal close
    setSelectedUnit(""); // Reset selectedUnit
    setSelectedJenisLayanan(""); // Reset selectedJenisLayanan
  };

  const handleSyaratChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSyaratLayanan([...selectedSyaratLayanan, value]);
    } else {
      setSelectedSyaratLayanan(selectedSyaratLayanan.filter((item) => item !== value));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic if needed
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
              <span className="font-medium">Sukses: </span>
              {message}
            </div>
          )}

          {error && (
            <div
              className="p-4 m-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error: </span>
              {error}
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
                onChange={(e) => setSelectedSyaratLayanan(e.target.value)} // Update selected Syarat on change
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
  {item.syarat_layanan && Array.isArray(item.syarat_layanan) ? item.syarat_layanan.join(", ") : "Tidak ada syarat"}
</td>

                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                                onClick={() => handleSubmit(item.id)}
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
                          <td colSpan="5" className="px-6 py-4 text-center">
                            Tidak ada data.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-lg font-bold mb-4">{currentDaftarSyarat ? "Edit Syarat" : "Tambah Syarat"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Unit Pengolah</label>
          <select
  value={selectedUnit}
  onChange={(e) => setSelectedUnit(e.target.value)}
  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
>
  <option value="">Pilih Unit Pengolah</option>
  {unitPengolahOptions && unitPengolahOptions.length > 0 && unitPengolahOptions.map((unit) => (
    <option key={unit.id} value={unit.name}>
      {unit.name}
    </option>
  ))}
</select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jenis Layanan</label>
          <select
            value={selectedJenisLayanan}
            onChange={(e) => setSelectedJenisLayanan(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Pilih Jenis Layanan</option>
            {jenisLayananOptions.map((jenis) => (
              <option key={jenis.id} value={jenis.name}>
                {jenis.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Syarat Layanan</label>
          <select
            multiple
            value={selectedSyaratLayanan}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              setSelectedSyaratLayanan(options);
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            {masterSyaratOptions.map((syarat) => (
              <option key={syarat.id} value={syarat.name}>
                {syarat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tabel Master Layanan yang Dipilih */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-700">Master Layanan Dipilih</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Master Layanan</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {selectedSyaratLayanan.map((syarat, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{syarat}</td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newSelectedSyarat = selectedSyaratLayanan.filter((item) => item !== syarat);
                        setSelectedSyaratLayanan(newSelectedSyarat);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleModalClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Tutup
          </button>
          <button
            type="submit"
            className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Simpan
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

export default DaftarSyarat;
