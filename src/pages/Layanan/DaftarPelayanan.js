import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchDaftarPelayanan,
  createDaftarPelayanan,
  updateDaftarPelayanan,
  deleteDaftarPelayanan,
} from "../../services/daftarPelayananService";
import "../../App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DaftarPelayanan = () => {
  const [dataDaftarPelayanan, setDataDaftarPelayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPelayanan, setCurrentDaftarPelayanan] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Pelayanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPelayanan();
      setDataDaftarPelayanan(response);
    } catch (error) {
      console.error("Error fetching Daftar Layanan:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataDaftarPelayanan.filter((item) =>
    String(item.no_reg || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.nama_pelayanan || "").toLowerCase().includes(searchTerm.toLowerCase())||
    String(item.perihal || "").toLowerCase().includes(searchTerm.toLowerCase())||
    String(item.kelengkapan || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.status || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataDaftarPelayanan(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteDaftarPelayanan(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentDaftarPelayanan(null);
    setModalOpen(true);
    navigate('/create-daftar-pelayanan');
  };

  const handleDocument = (id) => {
    console.log(`Menampilkan dokumen untuk item dengan id ${id}`);
    // 
  };
  
  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`${'http://localhost:3000/api_s/layanan'}/${id}/download`, {
        responseType: 'blob', 
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file_${id}.pdf`); 
      document.body.appendChild(link);
      link.click();
  
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
         no_reg, 
         nama_pelayanan, 
         perihal, 
         kelengkapan, 
         status
        } = e.target.elements;

    const DaftarPelayanan = {
      no_reg: no_reg.value,
      nama_pelayanan: nama_pelayanan.value,
      perihal: perihal.value,
      kelengkapan: kelengkapan.value,
      status: status.value
    };
    try {
      if (currentDaftarPelayanan) {
        await updateDaftarPelayanan(currentDaftarPelayanan.id, DaftarPelayanan);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarPelayanan(DaftarPelayanan);
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
    setCurrentDaftarPelayanan(null);
  };

  return (
    <div className="bodyadmin flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div>
          <div className="texttitle">Daftar Pelayanan</div>

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
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Registrasi</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Layanan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Perihal</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kelengkapan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarPelayanan.length > 0 ? (
                        dataDaftarPelayanan.map((item, index) => (
                          <tr key={item.id}>
                              <td className="px-6 py-3 text-xs font-medium text-center text-gray-900  dark:text-white">{index + 1}</td>
                              <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.no_reg}</td>
                              <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.nama_pelayanan}</td>
                              <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.perihal}</td>
                              <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.kelengkapan}</td>
                              <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.status}</td>
                              <td className="text-center">
  <div className="flex justify-center space-x-2">
  <div className="flex justify-center space-x-2">
  <button
    onClick={() => handleDocument(item.id)}
    className="focus:outline-none"
    style={{ background: 'none', border: 'none', padding: 0 }}
  >
    <i className="fas fa-file-alt text-blue-600 hover:text-blue-900"></i>
  </button>
  <button
    onClick={() => handleDownload(item.id)}
    className="focus:outline-none"
    style={{ background: 'none', border: 'none', padding: 0 }}
  >
    <i className="fas fa-download text-yellow-600 hover:text-yellow-900"></i>
  </button>
  <button
      onClick={() => navigate(`/update-daftar-pelayanan/${item.id}`)}
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
</div>
  </div>
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
                <h2 className="text-xl font-semibold mb-4">{currentDaftarPelayanan ? "Edit Daftar Pelayanan" : "Tambah Daftar Pelayanan"}</h2>
                <form onSubmit={handleSubmit}>
                <input type="text" name="no_reg" defaultValue={currentDaftarPelayanan?.no_reg || ""} placeholder="Nomor Registrasi" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="nama_pelayanan" defaultValue={currentDaftarPelayanan?.nama_pelayanan || ""} placeholder="Nama Pelayanan" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <textarea name="perihal" defaultValue={currentDaftarPelayanan?.perihal || ""} placeholder="Perihal" required className="block w-full p-2 border border-gray-300 rounded mb-4"></textarea>
                  <input type="text" name="kelengkapan" defaultValue={currentDaftarPelayanan?.kelengkapan || ""} placeholder="Kelengkapan" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="status" defaultValue={currentDaftarPelayanan?.status || ""} placeholder="Status" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={handleModalClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{currentDaftarPelayanan ? "Update" : "Tambah"}</button>
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

export default DaftarPelayanan;
