import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { fetchDaftarPelayanan } from "../../services/daftarPelayananService";
import "../../App.css";

const DaftarDisposisi = () => {
  const [dataDaftarDisposisi, setDataDaftarDisposisi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarDisposisi, setCurrentDaftarDisposisi] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Disposisi`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPelayanan();
      setDataDaftarDisposisi(response);
      setFilteredData(response); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching Daftar Disposisi:", error);
      setMessage("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  
    const filteredData = dataDaftarDisposisi.filter((item) => {
      return (
        String(item.no_surat || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.pengirim || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.tgl || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.perihal || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.penerima || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.diteruskan || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.waktu || "").toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    });
  
    setFilteredData(filteredData);
  };  

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarDisposisi(null);
  };

  const handleDetail = (no_reg) => {
    setCurrentDaftarDisposisi(null);
    setModalOpen(true);
    navigate(`/disposisi/detail-disposisi/${no_reg}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
<div className="min-h-screen w-full bg-gray-100 flex flex-col m-0 p-0 relative">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}>
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "lg:ml-64" : "ml-0"} pl-4 lg:pl-64`}>
        <Header />
        <main>
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">Daftar Disposisi</div>

          {message && (
            <div className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <form onSubmit={handleSearch} className="flex flex-grow justify-center">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-5/6 md:w-5/6 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search..."
                    required
                  />
                  <button
                    type="submit"
                    className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="flex justify-center">
  <div className="w-full max-w-full p-1"> 
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <table className="min-w-full  divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-200">
          <tr>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">No</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">No Surat</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Pengirim</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Tgl Surat</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Perihal</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Penerima</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Diteruskan Kepada</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Waktu Disposisi</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Catatan</th>
            <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-xs font-medium text-center text-gray-900 dark:text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.no_surat}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.nama_pengirim}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.tgl}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.perihal}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.nama_pemohon}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.diteruskan_kepada}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.waktu}</td>
                <td className="px-6 py-4 text-xs text-center text-gray-900 dark:text-gray-900">{item.catatan}</td>
                <td className="text-center flex items-center justify-center px-4 py-4 whitespace-nowrap text-xs font-medium space-x-2">
                  <button onClick={() => handleDetail(item.no_reg)} className="focus:outline-none" style={{ background: "none", border: "none", padding: 0 }}>
                    <i className="fa fa-eye text-green-600 hover:text-green-900"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider"
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
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DaftarDisposisi;
