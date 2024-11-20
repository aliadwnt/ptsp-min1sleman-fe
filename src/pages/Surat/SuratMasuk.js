import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { uploadSingle } from "../../services/uploadService";
import {
  fetchSuratMasuk,
  createSuratMasuk,
  updateSuratMasuk,
  deleteSuratMasuk,
} from "../../services/suratMasukService";
import "../../App.css";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";

const SuratMasuk = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSuratMasuk, setCurrentSuratMasuk] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    no_agenda: "",
    no_surat: "",
    tgl_surat: "",
    perihal: "",
    pengirim: "",
    penerima: "",
    file_surat: "",
  });

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Surat Masuk`;
    fetchData();

    if (currentSuratMasuk) {
      setFormData({
        no_agenda: currentSuratMasuk.no_agenda || "",
        no_surat: currentSuratMasuk.no_surat || "",
        tgl_surat: currentSuratMasuk.tgl_surat || "",
        pengirim: currentSuratMasuk.pengirim || "",
        penerima: currentSuratMasuk.penerima || "",
        perihal: currentSuratMasuk.perihal || "",
        file_surat: currentSuratMasuk.file_surat || "",
      });
    }
  }, [currentSuratMasuk]);

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
      const filteredData = dataSuratMasuk.filter(
        (item) =>
          String(item.no_agenda || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.no_surat || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          // String(item.tanggal_surat || "")
          //   .toLowerCase()
          //   .includes(value.toLowerCase()) ||
          // String(item.pengirim || "")
          //   .toLowerCase()
          //   .includes(value.toLowerCase()) ||
          String(item.penerima || "")
            .toLowerCase()
            .includes(value.toLowerCase())
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
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    console.log(formData); // Log formData to check if all values are correct

    try {
      let uploadedFileUrl = "";
      if (formData.file_surat && formData.file_surat instanceof File) {
        uploadedFileUrl = await uploadSingle(formData.file_surat);
      }

      const dataToSend = {
        ...formData,
        file_surat: uploadedFileUrl || formData.file_surat,
      };

      if (currentSuratMasuk) {
        await updateSuratMasuk(currentSuratMasuk.id, dataToSend);
        setMessage("Data berhasil diupdate");
      } else {
        await createSuratMasuk(dataToSend);
        setMessage("Data berhasil ditambahkan");
      }

      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file_surat") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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
      <Favicon />
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
        <div className="p-4">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fas fa-inbox mr-2"></i>Daftar Surat Masuk
          </div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
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
                <i className="fas fa-plus mr-1"></i>Tambah
              </button>
            </form>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        No
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        No Agenda
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        No Surat
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        Tanggal Surat
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        Pengirim
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        Penerima
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        Perihal
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        Surat
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataSuratMasuk.length > 0 ? (
                      dataSuratMasuk.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                          <td className="w-12 px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {index + 1}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {item.no_agenda}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {item.no_surat}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {new Date(item.tgl_surat).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {item.pengirim}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {item.penerima}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {item.perihal}
                          </td>
                          <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                            {item.file_surat && (
                              <>
                                <a
                                  href={item.file_surat}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-green-800 hover:bg-green-600 block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                                >
                                  Preview
                                </a>
                              </>
                            )}
                          </td>
                          <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
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
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i
                    className={`mr-2 p-2 rounded-full text-white ${
                      currentSuratMasuk
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentSuratMasuk
                    ? "Edit Surat Masuk"
                    : "Tambah Surat Masuk"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    {/* Grid untuk Dua Kolom */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Column */}
                      <div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            No. Agenda
                          </label>
                          <input
                            type="text"
                            name="no_agenda"
                            defaultValue={formData?.no_agenda || ""}
                            onChange={handleChange}
                            placeholder="No Agenda"
                            required
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            No. Surat
                          </label>
                          <input
                            type="text"
                            name="no_surat"
                            defaultValue={formData?.no_surat || ""}
                            onChange={handleChange}
                            placeholder="No Surat"
                            required
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tanggal Surat
                          </label>
                          <input
                            type="date"
                            name="tgl_surat"
                            defaultValue={
                              currentSuratMasuk?.tgl_surat
                                ? new Date(currentSuratMasuk?.tgl_surat)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={handleChange}
                            placeholder="Tanggal Surat"
                            required
                            className="block w-full p-2 border border-gray-300 rounded mb-1"
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pengirim
                          </label>
                          <input
                            type="text"
                            name="pengirim"
                            defaultValue={formData?.pengirim || ""}
                            onChange={handleChange}
                            placeholder="Pengirim"
                            required
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Penerima
                          </label>
                          <input
                            type="text"
                            name="penerima"
                            defaultValue={formData?.penerima || ""}
                            onChange={handleChange}
                            placeholder="Penerima"
                            required
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Perihal
                          </label>
                          <input
                            type="text"
                            name="perihal"
                            defaultValue={formData?.perihal || ""}
                            onChange={handleChange}
                            placeholder="Perihal"
                            required
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Input File Full Width */}
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload File Surat
                      </label>
                      <input
                        type="file"
                        name="file_surat"
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 col-span-2">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200"
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
