import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchDaftarLayanan,
  createDaftarLayanan,
  updateDaftarLayanan,
  deleteDaftarLayanan,
} from "../../services/daftarLayananService";
import "../../App.css";

const DaftarLayanan = () => {
  const [dataDaftarLayanan, setDataDaftarLayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarLayanan, setCurrentDaftarLayanan] = useState(null);

  useEffect(() => {
    document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Daftar Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarLayanan();
      setDataDaftarLayanan(response);
    } catch (error) {
      console.error("Error fetching Daftar Layanan:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataDaftarLayanan.filter((item) =>
      String(item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataDaftarLayanan(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteDaftarLayanan(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentDaftarLayanan(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
         unit, 
         name, 
         jenis, 
         output, 
         duration 
        } = e.target.elements;

    const DaftarLayanan = {
      unit: unit.value,
      name: name.value,
      jenis: jenis.value,
      output: output.value,
      duration: duration.value
    };
    try {
      if (currentDaftarLayanan) {
        await updateDaftarLayanan(currentDaftarLayanan.id, DaftarLayanan);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarLayanan(DaftarLayanan);
        setMessage("Data berhasil ditambahkan");
      }
      fetchData(); // Refresh data setelah tambah atau update
      setModalOpen(false); // Tutup modal
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarLayanan(null);
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div className="bodyadmin">
          <div className="texttitle">Daftar Layanan</div>

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
      className="w-2/3 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search..."
      required
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
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Pengolah</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Layanan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Layanan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Output Layanan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi Layanan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarLayanan.length > 0 ? (
                        dataDaftarLayanan.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-1 py-1 text-xs font-medium text-center text-gray-900 dark:text-white">{index + 1}</td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.name}</td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.jenis}</td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.output}</td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.duration}</td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
  <button onClick={() => { setCurrentDaftarLayanan(item); setModalOpen(true); }} className="text-green-600 hover:text-green-900">
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
                          <td colSpan="7" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No data available</td>
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
                <h2 className="text-xl font-semibold mb-4">{currentDaftarLayanan ? "Edit Daftar Layanan" : "Tambah Daftar Layanan"}</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="unit" defaultValue={currentDaftarLayanan?.unit || ""} placeholder="Unit" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="name" defaultValue={currentDaftarLayanan?.name || ""} placeholder="Name" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="jenis" defaultValue={currentDaftarLayanan?.jenis || ""} placeholder="Jenis" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="output" defaultValue={currentDaftarLayanan?.output || ""} placeholder="Output" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="duration" defaultValue={currentDaftarLayanan?.duration || ""} placeholder="Duration" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={handleModalClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{currentDaftarLayanan ? "Update" : "Tambah"}</button>
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

export default DaftarLayanan;
