import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

import {
  fetchDaftarDisposisi,
  createDaftarDisposisi,
  updateDaftarDisposisi,
  deleteDaftarDisposisi,
} from "../../services/daftarDisposisiService";
import "../../App.css";

const DaftarDisposisi = () => {
  const [dataDaftarDisposisi, setDataDaftarDisposisi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarDisposisi, setCurrentDaftarDisposisi] = useState(null);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Disposisi`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarDisposisi();
      setDataDaftarDisposisi(response);
    } catch (error) {
      console.error("Error fetching Daftar Disposisi:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataDaftarDisposisi.filter((item) =>
    String(item.status || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.waktu || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.perihal || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.pengirim || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.penerima || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.dis_masuk|| "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.dis_keluar || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.diteruskan || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataDaftarDisposisi(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteDaftarDisposisi(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentDaftarDisposisi(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { 
        status, 
        waktu, 
        perihal,
        pengirim,
        penerima,
        dis_masuk,
        dis_keluar,
        diteruskan 
    } = e.target.elements;

    const DaftarDisposisi = {
      status: status.value,
      waktu: waktu.value,
      perihal:perihal.value,
      pengirim: pengirim.value,
      penerima: penerima.value,
      dis_masuk: dis_masuk.value,
      dis_keluar: dis_keluar.value,
      diteruskan: diteruskan.value,
    };

    try {
      if (currentDaftarDisposisi) {
        await updateDaftarDisposisi(currentDaftarDisposisi.id, DaftarDisposisi);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarDisposisi(DaftarDisposisi);
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
    setCurrentDaftarDisposisi(null);
  };

  return (
    <div className="bodyadmin flex overflow-x-auto">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div>
          <div className="texttitle">Daftar Disposisi</div>

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
          <div className="flex justify-center">
  <div className="w-full max-w-7xl"> {/* Berikan batasan lebar */}
    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <table className="min-w-full table-auto divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Masuk</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Perihal</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pengirim</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Penerima</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Disposisi Masuk</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Disposisi Keluar</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Diteruskan Kepada</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {dataDaftarDisposisi.length > 0 ? (
            dataDaftarDisposisi.map((item, index) => (
              <tr key={item.id}>
                <td className="px-6 py-3 text-xs font-medium text-center text-gray-900 dark:text-white">{index + 1}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.status}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.waktu}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.perihal}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.pengirim}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.penerima}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.dis_masuk}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.dis_keluar}</td>
                <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">{item.diteruskan}</td>
                <td className="text-center flex items-center justify-center px-2 py-2 whitespace-nowrap text-xs font-medium space-x-1">
                <button
    onClick={() => { setCurrentDaftarDisposisi(item); setModalOpen(true); }}
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
              <td colSpan="10" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-50">
              <h2 className="text-xl font-semibold mb-4">{currentDaftarDisposisi ? "Edit Daftar Disposisi" : "Tambah Daftar Disposisi"}</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="status" defaultValue={currentDaftarDisposisi?.status || ""} placeholder="Status" required className="block w-full p-2 border border-gray-300 rounded" />
                <input type="time"  name="waktu"  defaultValue={currentDaftarDisposisi?.waktu || ""}  placeholder="Waktu"  required  className="block w-full p-2 border border-gray-300 rounded"/>
                <input type="text" name="perihal" defaultValue={currentDaftarDisposisi?.perihal || ""} placeholder="Perihal" required className="block w-full p-2 border border-gray-300 rounded" />
                <input type="text" name="pengirim" defaultValue={currentDaftarDisposisi?.pengirim || ""} placeholder="Pengirim" required className="block w-full p-2 border border-gray-300 rounded" />
                <input type="text" name="penerima" defaultValue={currentDaftarDisposisi?.penerima || ""} placeholder="Penerima" required className="block w-full p-2 border border-gray-300 rounded" />
                <input type="text" name="dis_masuk" defaultValue={currentDaftarDisposisi?.dis_masuk || ""} placeholder="Disposisi Masuk" required className="block w-full p-2 border border-gray-300 rounded" />
                <input type="text" name="dis_keluar" defaultValue={currentDaftarDisposisi?.dis_keluar || ""} placeholder="Disposisi Keluar" required className="block w-full p-2 border border-gray-300 rounded" />
                <input type="text" name="diteruskan" defaultValue={currentDaftarDisposisi?.diteruskan || ""} placeholder="Diteruskan Kepada" required className="block w-full p-2 border border-gray-300 rounded" />
                <div className="flex justify-end col-span-2 space-x-2">
                  <button type="button" onClick={handleModalClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{currentDaftarDisposisi ? "Update" : "Tambah"}</button>
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

export default DaftarDisposisi;