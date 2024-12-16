import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import "../../App.css";
import Favicon from "../../components/Favicon";
import LoadingPage from "../../components/loadingPage";
import {
  fetchSettings,
  createSettings,
  updateSettings,
  deleteSettings,
} from "../../services/settingsService.js";
import { uploadSingle } from "../../services/uploadService.js";

const Settings = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataSettings, setDataSettings] = useState({});
  const [currentSettings, setCurrentSettings] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    key: currentSettings?.key || "",
    value: currentSettings?.value || "",
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = Array.isArray(dataSettings)
    ? dataSettings.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Array.isArray(dataSettings)
    ? Math.ceil(dataSettings.length / itemsPerPage)
    : 0;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Settings`;
    fetchData();
    if (currentSettings) {
      setFormData({
        key: currentSettings.key || "",
        value: currentSettings.value || "",
      });
    }
  }, [currentSettings]);

  const fetchData = async () => {
    try {
      const response = await fetchSettings();
      console.log("Response data:", response.data);
      setDataSettings(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching daftar settings:", error);
      setDataSettings([]);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { key } = e.target.elements;
    // const isDuplicate = dataSettings.some(
    //   (item) => item.key.toLowerCase() === key.value.toLowerCase()
    // );

    // if (isDuplicate) {
    //   setMessage(`${formData.key} sudah ditambahkan`);
    //   setIsError(true);
    //   return;
    // }

    console.log(formData);

    try {
      let uploadedFileUrl = "";
      if (formData.value && formData.value instanceof File) {
        uploadedFileUrl = await uploadSingle(formData.value);
      }

      const dataToSend = {
        ...formData,
        value: uploadedFileUrl || formData.value,
      };

      if (currentSettings) {
        await updateSettings(currentSettings.id, dataToSend);
        setMessage("Data Berhasil diupdate");
      } else {
        await createSettings(dataToSend);
        setMessage("Data Berhasil ditambahkan");
      }
      setIsError(false);
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
      setIsError(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteSettings(id);
        fetchData();
        setIsLoading(false);
      } catch (error) {
        console.error("Error deleting daftar settings:", error);
      }
    }
  };

  const handleAdd = () => {
    setCurrentSettings(null);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "value" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataSettings(dataSettings);
    } else {
      const filteredData = dataSettings.filter((item) =>
        String(item.key || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setDataSettings(filteredData);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentSettings(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col m-0 p-0 relative">
      <Favicon />
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        {message && (
          <div
            className={`flex justify-center items-center p-4 m-2 text-sm ${
              isError ? "text-red-800 bg-red-50" : "text-green-800 bg-green-50"
            }`}
            role="alert"
          >
            <span className="font-medium">
              {isError ? "Error" : "Sukses"}:{" "}
            </span>
            {message}
          </div>
        )}
        <div className="p-4">
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-cog mr-2"></i> Daftar Settings
              </div>
              <form
                onSubmit={handleSearch}
                className="flex flex-grow justify-end space-x-2"
              >
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full md:w-64 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                  >
                    <i className="fas fa-sync-alt text-xs"></i>
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center bg-green-600 text-white rounded-lg py-1 px-3 hover:bg-green-700"
                  >
                    <i className="fas fa-plus text-xs"></i>
                    <span className="ml-1 text-sm">Tambah</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Total Daftar Settings :
                  <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {dataSettings.length}
                  </text>
                  Data.
                </text>
                <div className="mt-2 overflow-x-auto border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Key
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Value
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <tr key={item.id} className="hover:bg-gray-100">
                            <td className="w-12 px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="w-24 truncate px-2 py-3 text-xs text-center text-gray-900 border text-bold border-gray-200">
                              {item.key}
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm space-x-2 border border-gray-200">
                              {item.key === "kop_surat" ||
                              item.key === "app_logo" ? (
                                item.value && (
                                  <a
                                    href={item.value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" items-center gap-2 bg-green-600 hover:bg-green-500 px-2 py-1 rounded-md text-gray-100 text-xs font-medium mb-2 shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
                                  >
                                    <i className="fa fa-eye text-white-600 hover:text-white-900 w-3 h-3"></i>
                                    <span className="ml-1 truncate">
                                      Preview
                                    </span>
                                  </a>
                                )
                              ) : (item.key === "surat_tahun" && item.value) ||
                                (item.key === "surat_prefix" && item.value) ||
                                (item.key === "surat_start_no" && item.value) ||
                                (item.key === "nama_lembaga" && item.value) ||
                                (item.key === "telp" && item.value) ||
                                (item.key === "email" && item.value) ||
                                (item.key === "alamat" && item.value) ||
                                (item.key === "website" && item.value) ||
                                (item.key === "kepala_kantor" && item.value) ||
                                (item.key === "jabatan" && item.value) ? (
                                <span className="text-xs text-gray-900">
                                  {item.value}
                                </span> // Tampilkan value untuk surat
                              ) : (
                                <span className="text-gray-500 text-xs">
                                  Tidak ada data
                                </span>
                              )}
                            </td>

                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              <button
                                onClick={() => {
                                  setCurrentSettings(item);
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
                            colSpan="4"
                            className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-4 mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {currentPage > 1 && (
                      <div
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base"
                      >
                        <i className="fas fa-chevron-left text-sm md:text-lg"></i>
                      </div>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber >= currentPage - 2 &&
                        pageNumber <= currentPage + 2
                      ) {
                        return (
                          <div
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-1 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base ${
                              currentPage === pageNumber
                                ? "text-green-800 font-medium border-b-2 border-green-800"
                                : "text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-gray-300"
                            }`}
                          >
                            {pageNumber}
                          </div>
                        );
                      }
                      return null;
                    })}

                    {currentPage < totalPages && (
                      <div
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base"
                      >
                        <i className="fas fa-chevron-right text-sm md:text-lg"></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i
                    className={`mr-2 p-2 rounded-full text-white ${
                      currentSettings
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentSettings ? "Edit Settings" : "Tambah Settings"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="key"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pilih Tipe Setting
                    </label>
                    <select
                      name="key"
                      id="key"
                      value={formData.key}
                      onChange={handleChange}
                      required
                      className="block w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="" disabled>
                        Pilih Tipe
                      </option>
                      <optgroup label="Surat">
                        <option value="surat_prefix">Prefix Surat</option>
                        <option value="surat_tahun">Tahun Surat</option>
                        <option value="surat_start_no">Nomor Awal Surat</option>
                      </optgroup>
                      <optgroup label="Identitas">
                        <option value="kop_surat">Kop Surat</option>
                        <option value="app_logo">Logo Aplikasi</option>
                        <option value="nama_lembaga">Nama Lembaga</option>
                      </optgroup>
                      <optgroup label="Kontak">
                        <option value="telp">No Telp</option>
                        <option value="email">Email</option>
                        <option value="alamat">Alamat</option>
                        <option value="website">Website</option>
                      </optgroup>
                      <optgroup label="Kepala Kantor">
                        <option value="kepala_kantor">Kepala Kantor</option>
                        <option value="jabatan">Jabatan</option>
                      </optgroup>
                    </select>
                  </div>

                  {formData.key === "kop_surat" ||
                  formData.key === "app_logo" ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload File (
                        {formData.key === "kop_surat"
                          ? "Kop Surat"
                          : "Logo Aplikasi"}
                        )
                      </label>
                      <input
                        type="file"
                        name="value"
                        onChange={handleChange}
                        accept=".jpg,.png"
                        required
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Gunakan format *.jpg atau *.png
                      </p>
                    </div>
                  ) : formData.key ? (
                    <div className="mb-4">
                      <label
                        htmlFor="value"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {formData.key === "surat_prefix" &&
                          "Prefix Nomor Surat"}
                        {formData.key === "surat_tahun" && "Tahun Surat"}
                        {formData.key === "surat_start_no" &&
                          "Nomor Awal Surat"}
                        {formData.key === "nama_lembaga" && "Nama Lembaga"}
                        {formData.key === "telp" && "No Telp"}
                        {formData.key === "email" && "Email"}
                        {formData.key === "alamat" && "Alamat"}
                        {formData.key === "website" && "Website"}
                        {formData.key === "kepala_kantor" && "Kepala Kantor"}
                        {formData.key === "jabatan" && "Jabatan"}
                      </label>
                      <input
                        type="text"
                        name="value"
                        id="value"
                        value={formData.value}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  ) : null}
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
                      className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      {currentSettings ? "Update" : "Simpan"}
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

export default Settings;
