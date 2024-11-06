import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchSuratMasuk,
  createSuratMasuk,
  updateSuratMasuk,
  deleteSuratMasuk,
} from "../../services/suratMasukService";
import "../../App.css";

const SuratMasuk = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSuratMasuk, setCurrentSuratMasuk] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Surat Masuk`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchSuratMasuk();
      setDataSuratMasuk(response);
    } catch (error) {
      console.error("Error fetching Surat Masuk:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value; 
    setSearchTerm(value);
  
    if (!value) {
      setDataSuratMasuk(dataSuratMasuk); 
    } else {
      const filteredData = dataSuratMasuk.filter((item) =>
        String(item.no_agenda || "").toLowerCase().includes(value.toLowerCase()) ||
        String(item.no_surat || "").toLowerCase().includes(value.toLowerCase()) ||
        String(item.tanggal_surat || "").toLowerCase().includes(value.toLowerCase()) ||
        String(item.pengirim || "").toLowerCase().includes(value.toLowerCase()) ||
        String(item.penerima || "").toLowerCase().includes(value.toLowerCase()) 
      );
      setDataSuratMasuk(filteredData);  
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteSuratMasuk(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentSuratMasuk(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const {
      no_agenda,
      no_surat,
      tanggal_surat,
      pengirim,
      penerima,
      disposisi,
      surat,
      lampiran,
    } = e.target.elements;

    formData.append("no_agenda", no_agenda.value);
    formData.append("no_surat", no_surat.value);
    formData.append("tanggal_surat", tanggal_surat.value);
    formData.append("pengirim", pengirim.value);
    formData.append("penerima", penerima.value);
    formData.append("disposisi", disposisi.value);
    formData.append("surat", surat.value);

    if (lampiran.files.length > 0) {
      formData.append("lampiran", lampiran.files[0]);
    }

    try {
      if (currentSuratMasuk) {
        await updateSuratMasuk(currentSuratMasuk.id, formData);
        setMessage("Data berhasil diupdate");
      } else {
        await createSuratMasuk(formData);
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
    setCurrentSuratMasuk(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
  <div className="min-h-screen w-full bg-gray-100 flex flex-col m-0 p-0 relative">
      {/* Sidebar */}
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
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">Daftar Surat Masuk</div>

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
            <form
              onSubmit={handleSearch}
              className="flex flex-grow justify-center"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
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
                <i className="fas fa-plus mr-1"></i>Tambah
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
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          No Agenda
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          No Surat
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Tanggal Surat
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Pengirim
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Penerima
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Disposisi
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Surat
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Lampiran
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataSuratMasuk.length > 0 ? (
                        dataSuratMasuk.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-1 py-1 text-xs font-medium text-center text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.no_agenda}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.no_surat}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.tanggal_surat}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.pengirim}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.penerima}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.disposisi}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.surat}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.lampiran}
                            </td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => {
                                  setCurrentSuratMasuk(item);
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
                            colSpan="10"
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
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-50">
                <h2 className="text-xl font-semibold mb-4">
                  {currentSuratMasuk
                    ? "Edit Surat Masuk"
                    : "Tambah Surat Masuk"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="no_agenda"
                    defaultValue={currentSuratMasuk?.no_agenda || ""}
                    placeholder="No Agenda"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="no_surat"
                    defaultValue={currentSuratMasuk?.no_surat || ""}
                    placeholder="No Surat"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="date"
                    name="tanggal_surat"
                    defaultValue={currentSuratMasuk?.tanggal_surat || ""}
                    placeholder="Tanggal Surat"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="pengirim"
                    defaultValue={currentSuratMasuk?.pengirim || ""}
                    placeholder="Pengirim"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="penerima"
                    defaultValue={currentSuratMasuk?.penerima || ""}
                    placeholder="Penerima"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="disposisi"
                    defaultValue={currentSuratMasuk?.disposisi || ""}
                    placeholder="Disposisi"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="surat"
                    defaultValue={currentSuratMasuk?.surat || ""}
                    placeholder="Surat"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="file"
                    name="lampiran"
                    accept=".pdf,.doc,.docx,.jpg,.png"
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
                      {currentSuratMasuk ? "Update" : "Tambah"}
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

export default SuratMasuk;
