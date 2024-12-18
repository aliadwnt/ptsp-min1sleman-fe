import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchDaftarLayanan,
  createDaftarLayanan,
  updateDaftarLayanan,
  deleteDaftarLayanan,
} from "../../services/daftarLayananService";
import { fetchUnitPengolah } from "../../services/unitPengolahService";
import { fetchJenisLayanan } from "../../services/jenisLayananService";
import { fetchOutputLayanan } from "../../services/outputLayananService";
import "../../App.css";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";
import { ToastContainer, toast } from "react-toastify";

const DaftarLayanan = () => {
  const [dataDaftarLayanan, setDataDaftarLayanan] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [jenisOptions, setJenisOptions] = useState([]);
  const [outputOptions, setOutputOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarLayanan, setCurrentDaftarLayanan] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataDaftarLayanan.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(dataDaftarLayanan.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Daftar Layanan";
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([
      fetchData(),
      fetchUnitOptions(),
      fetchJenisOptions(),
      fetchOutputOptions(),
    ]);
  };

  const fetchData = async () => {
    try {
      const response = await fetchDaftarLayanan();
      setDataDaftarLayanan(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Daftar Layanan:", error);
      setIsLoading(false);
    }
  };

  const fetchUnitOptions = async () => {
    try {
      const response = await fetchUnitPengolah();
      setUnitOptions(response);
    } catch (error) {
      console.error("Error fetching Unit Pengolah:", error);
    }
  };

  const fetchJenisOptions = async () => {
    try {
      const response = await fetchJenisLayanan();
      setJenisOptions(response);
    } catch (error) {
      console.error("Error fetching Jenis Layanan:", error);
    }
  };

  const fetchOutputOptions = async () => {
    try {
      const response = await fetchOutputLayanan();
      setOutputOptions(response);
    } catch (error) {
      console.error("Error fetching Output Layanan:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataDaftarLayanan(dataDaftarLayanan);
    } else {
      const filteredData = dataDaftarLayanan.filter((item) => {
        return (
          String(item.name || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.unit || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.jenis || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.output || "")
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      });
      setDataDaftarLayanan(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteDaftarLayanan(id);
        toast.success("Data berhasil dihapus");
        fetchData();
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        toast.error("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentDaftarLayanan(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentDaftarLayanan(item);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const daftarLayanan = Object.fromEntries(formData.entries());

    try {
      if (currentDaftarLayanan) {
        await updateDaftarLayanan(currentDaftarLayanan.id, daftarLayanan);
        toast.success("Data berhasil diupdate");
      } else {
        await createDaftarLayanan(daftarLayanan);
        toast.success("Data berhasil ditambahkan");
      }
      setTimeout(() => {
        setModalOpen(false);
        fetchData();
      }, 1000);
    } catch (error) {
      console.error("Failed to save data:", error);
      toast.error("Gagal menyimpan data");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarLayanan(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="select-none min-h-screen w-full bg-gray-50 flex flex-col m-0 p-0 relative">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
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
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-th-list mr-2"></i> Daftar Layanan
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
              <div className="w-full max-w-5xl">
                <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Total Daftar Layanan :
                  <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {dataDaftarLayanan.length}
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
                          Unit Pengolah
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Nama Layanan
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Jenis Layanan
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Output Layanan
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Durasi Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
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
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              <div className="break-words">{item.unit}</div>
                            </td>
                            <td className="max-w-xs break-words px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.name}
                            </td>
                            <td className="max-w-xs break-words px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.jenis}
                            </td>
                            <td className="max-w-xs break-words px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.output}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 flex items-center justify-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                                {item.duration} Hari
                              </span>
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              <button
                                onClick={() => handleEdit(item)}
                                className="focus:outline-none mr-auto"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <i className="fas fa-edit text-green-600"></i>
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
                                <i className="ml-1 fas fa-trash text-red-600 hover:text-red-900"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i
                    className={`mr-2 p-2 rounded-full text-white ${
                      currentDaftarLayanan
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentDaftarLayanan
                    ? "Edit Daftar Layanan"
                    : "Tambah Daftar Layanan"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Unit Pengolah
                    </label>
                    <select
                      name="unit"
                      defaultValue={
                        currentDaftarLayanan ? currentDaftarLayanan.unit : ""
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="" disabled>
                        Pilih Unit Pengolah
                      </option>
                      {unitOptions.map((unit) => (
                        <option key={unit.id} value={unit.name}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Layanan
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nama Layanan"
                      defaultValue={
                        currentDaftarLayanan ? currentDaftarLayanan.name : ""
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Jenis Layanan
                    </label>
                    <select
                      name="jenis"
                      defaultValue={
                        currentDaftarLayanan ? currentDaftarLayanan.jenis : ""
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="" disabled>
                        Pilih Jenis Layanan
                      </option>
                      {jenisOptions.map((jenis) => (
                        <option key={jenis.id} value={jenis.name}>
                          {jenis.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Output Layanan
                    </label>
                    <select
                      name="output"
                      defaultValue={
                        currentDaftarLayanan ? currentDaftarLayanan.output : ""
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="" disabled>
                        Pilih output layanan
                      </option>
                      {outputOptions.map((output) => (
                        <option key={output.id} value={output.name}>
                          {output.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Durasi Layanan
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="duration"
                        defaultValue={
                          currentDaftarLayanan
                            ? currentDaftarLayanan.duration
                            : ""
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md"
                        placeholder="Durasi Layanan"
                      />
                      <span className="px-3 py-2 text-gray-700 bg-gray-200 border-t border-b border-r rounded-r-md">
                        Hari
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      {currentDaftarLayanan ? "Update" : "Tambah"}
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

export default DaftarLayanan;
