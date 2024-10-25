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

const DaftarLayanan = () => {
  const [dataDaftarLayanan, setDataDaftarLayanan] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [jenisOptions, setJenisOptions] = useState([]);
  const [outputOptions, setOutputOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarLayanan, setCurrentDaftarLayanan] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    } catch (error) {
      console.error("Error fetching Daftar Layanan:", error);
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
    e.preventDefault();
    const filteredData = dataDaftarLayanan.filter((item) =>
      String(item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
        setMessage("Gagal menghapus data");
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
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarLayanan(daftarLayanan);
        setMessage("Data berhasil ditambahkan");
      }
      fetchData();
      handleModalClose();
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Gagal menyimpan data");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarLayanan(null);
    setMessage("");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bodyadmin flex relative">
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
        <div className="bodyadmin">
          <div className="texttitle">Daftar Layanan</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Sukses: </span>
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
                type="button"
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus mr-2"></i>Tambah
              </button>
            </form>
          </div>

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                          Jenis Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Output Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durasi Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataDaftarLayanan.length > 0 ? (
                        dataDaftarLayanan.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-1 py-3 text-xs font-medium text-center text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900">
                              {item.unit}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900">
                              {item.jenis}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900">
                              {item.output}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900">
                              {item.duration}
                            </td>
                            <td className="px-6 py-3 text-xs text-center text-gray-900">
                              <button
                                onClick={() => handleEdit(item)}
                                className="focus:outline-none"
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
                                <i className="fas fa-trash-alt text-red-600"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-4 text-gray-500"
                          >
                            Tidak ada data ditemukan
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-lg font-bold">
                  {currentDaftarLayanan ? "Edit" : "Simpan"} Layanan
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
                    <input
                      type="text"
                      name="duration"
                      defaultValue={
                        currentDaftarLayanan
                          ? currentDaftarLayanan.duration
                          : ""
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
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
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Update
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
