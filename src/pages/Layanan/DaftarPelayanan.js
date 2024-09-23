import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchLayanan,
  createLayanan,
  updateLayanan,
  deleteLayanan,
} from "../../services/daftarPelayananService";
import "../../App.css";

const DaftarPelayanan = () => {
  const [dataPelayanan, setDataPelayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLayanan, setCurrentLayanan] = useState(null);

  useEffect(() => {
    document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Pelayanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchLayanan(); // Use the imported fetchLayanan method
      setDataPelayanan(response); // Simpan data ke state
    } catch (error) {
      console.error("Error fetching layanan:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Update state to trigger filtering
    const filteredData = dataPelayanan.filter((item) =>
      String(item.no_reg || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.nama_pelayanan || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.perihal || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.kelengkapan || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.status || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataPelayanan(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deleteLayanan(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentLayanan(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { no_reg, nama_pelayanan, perihal, kelengkapan, status } = e.target.elements;

    const layanan = {
      no_reg: no_reg.value,
      nama_pelayanan: nama_pelayanan.value,
      perihal: perihal.value,
      kelengkapan: kelengkapan.value,
      status: status.value,
    };
    try {
        if (currentLayanan) {
            await updateLayanan(currentLayanan.id, layanan);
            setMessage("Data berhasil diupdate");
        } else {
            const response = await createLayanan(layanan);
            console.log("Response from API:", response); // Tambahkan log di sini
            setMessage("Data berhasil ditambahkan");
        }
    } catch (error) {
        console.error("Failed to save data:", error);
        setMessage("Failed to save data");
    }
  };    
  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentLayanan(null); // Reset currentLayanan when closing the modal
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div className="bodyadmin">
          <div className="texttitle">Daftar Layanan Publik</div>

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
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Registrasi</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Layanan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Perihal</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kelengkapan</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataPelayanan.length > 0 ? (
                        dataPelayanan.map((item, index) => {
                          let statusIcon;
                          switch (item.status) {
                            case "Baru":
                              statusIcon = <i className="fas fa-file text-green-600"></i>;
                              break;
                            case "Proses":
                              statusIcon = <i className="fas fa-check-circle text-blue-600"></i>;
                              break;
                            case "Selesai":
                              statusIcon = <i className="fas fa-clock text-red-600"></i>;
                              break;
                            case "Ambil":
                              statusIcon = <i className="fas fa-user-check text-yellow-500"></i>;
                              break;
                            default:
                              statusIcon = null;
                          }

                          return (
                            <tr key={item.id}>
                              <td className="px-1 py-1 text-xs font-medium text-center text-gray-900  dark:text-white">{index + 1}</td>
                              <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.no_reg}</td>
                              <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.nama_pelayanan}</td>
                              <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.perihal}</td>
                              <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.kelengkapan}</td>
                              <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">{item.status}</td>
                              
                              <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button onClick={() => { setCurrentLayanan(item); setModalOpen(true); }} className="text-green-600 hover:text-green-900">
                                  <i className="fas fa-edit"></i> {/* Ikon Edit */}
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                  <i className="fas fa-trash"></i> {/* Ikon Delete */}
                                </button>
                              </td>
                            </tr>
                          );
                        })
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
                <h2 className="text-xl font-semibold mb-4">{currentLayanan ? "Edit Layanan" : "Tambah Layanan"}</h2>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="no_reg" defaultValue={currentLayanan?.no_reg || ""} placeholder="Nomor Registrasi" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="nama_pelayanan" defaultValue={currentLayanan?.nama_pelayanan || ""} placeholder="Nama Layanan" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <textarea name="perihal" defaultValue={currentLayanan?.perihal || ""} placeholder="Perihal" required className="block w-full p-2 border border-gray-300 rounded mb-4"></textarea>
                  <input type="text" name="kelengkapan" defaultValue={currentLayanan?.kelengkapan || ""} placeholder="Kelengkapan" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <input type="text" name="status" defaultValue={currentLayanan?.status || ""} placeholder="Status" required className="block w-full p-2 border border-gray-300 rounded mb-4" />
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={handleModalClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{currentLayanan ? "Update" : "Tambah"}</button>
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
