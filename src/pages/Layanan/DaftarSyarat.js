import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  searchDaftarSyarat,
  fetchDaftarSyarat,
  updateDaftarSyarat,
  fetchDaftarSyaratById,
} from "../../services/daftarSyaratService";
import { fetchDaftarLayanan } from "../../services/daftarLayananService";
import { fetchMasterSyarat } from "../../services/masterSyaratService";
import "../../App.css";
import { useParams } from "react-router-dom";

const DaftarSyarat = () => {
  const { id } = useParams();
  const [dataDaftarSyarat, setDataDaftarSyarat] = useState([]);
  const [unit, setUnit] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [daftarSyarat, setDaftarSyarat] = useState([]);
  const [syaratOptions, setSyaratOptions] = useState([]);
  const [selectedSyarat, setSelectedSyarat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarSyarat, setCurrentDaftarSyarat] = useState(null);
  const [error, setError] = useState(null);
  const [syaratTerpilih, setSyaratTerpilih] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Daftar Syarat";
    fetchData();
    fetchUnit();
    fetchSyarat();
    fetchSyaratData();
  }, [id]);

  const fetchSyarat = async () => {
    try {
      const response = await fetchMasterSyarat();
      if (Array.isArray(response) && response.length > 0) {
        setSyaratOptions(response);
      } else {
        setSyaratOptions([]);
      }
    } catch (error) {
      console.error("Error fetching master syarat:", error);
      setError("Gagal memuat syarat.");
    }
  };

  const fetchUnit = async () => {
    try {
      const response = await fetchDaftarLayanan();
      setUnit(response.map((item) => item.unit));
    } catch (error) {
      console.error("Error fetching unit:", error);
    }
  };

  const fetchData = async () => {
    try {
      const layananResponse = await fetchDaftarLayanan();
      const syaratResponse = await fetchDaftarSyarat(id); // gunakan id di sini
      const combinedData = layananResponse.map((layanan) => {
        const syarat = syaratResponse.filter(
          (syarat) => syarat.layanan_id === layanan.id
        );
        return {
          ...layanan,
          syarat_layanan: syarat.map((s) => s.syarat_layanan).join(", "),
        };
      });

      setDataDaftarSyarat(combinedData);
    } catch (error) {
      console.error("Error fetching Daftar Syarat:", error);
    }
  };

  useEffect(() => {
    const search = async () => {
      if (searchTerm || selectedUnit) {
        try {
          const response = await searchDaftarSyarat(selectedUnit, searchTerm);
          const syaratResponse = await fetchDaftarSyarat(id);
          const combinedData = response.map((layanan) => {
            const syarat = syaratResponse.filter(
              (syarat) => syarat.layanan_id === layanan.id
            );

            return {
              ...layanan,
              syarat_layanan:
                syarat.map((s) => s.syarat_layanan).join(", ") ||
                "No syarat available",
            };
          });

          setDataDaftarSyarat(combinedData);
        } catch (error) {
          console.error("Error during search:", error);
          setError("Gagal mengambil data.");
        }
      } else {
        setDataDaftarSyarat([]);
      }
    };

    search();
  }, [searchTerm, selectedUnit, id]);

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const fetchSyaratData = async () => {
    try {
      const data = await fetchDaftarSyarat();
      setDaftarSyarat(data);
    } catch (error) {
      setError("Error fetching Daftar Syarat: " + error.message);
    }
  };

  const fetchCurrentDaftarSyarat = async () => {
    if (currentDaftarSyarat) {
      const data = await fetchDaftarSyaratById(currentDaftarSyarat.id);
      setDaftarSyarat(data.syarat || []);
      setSyaratTerpilih(data.syarat_terpilih || []);
    }
  };

  React.useEffect(() => {
    fetchCurrentDaftarSyarat();
  }, [currentDaftarSyarat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const currentData = await fetchDaftarSyaratById(currentDaftarSyarat.id);
    const syaratId = currentData ? parseInt(currentData.syarat_id) : null;
    const syarat_terpilih = daftarSyarat.map((syarat) => syarat.name);

    const data = {
      unit: formData.get("unit"),
      name: formData.get("name"),
      jenis: formData.get("jenis"),
      syarat_terpilih,
      syarat_id: syaratId,
      layanan_id: currentDaftarSyarat ? currentDaftarSyarat.id : null, // ID layanan, jika sedang mengedit
    };

    console.log("Data sebelum dikirim:", data);

    if (!data.unit || !data.name || data.syarat_terpilih.length === 0) {
      setError(
        "Semua field harus diisi dan syarat_terpilih harus berupa array yang tidak kosong."
      );
      return;
    }

    try {
      await updateDaftarSyarat(data);
      setMessage(
        currentDaftarSyarat
          ? "Data berhasil diupdate"
          : "Data baru berhasil ditambahkan dan diupdate"
      );
      await fetchSyaratData();
      handleModalClose();
    } catch (error) {
      setError("Error submitting data: " + error.message);
      console.error("Error detail:", error);
    }
  };

  const handleAddSyarat = () => {
    if (selectedSyarat) {
      const alreadyExists = daftarSyarat.some(
        (item) => item.name === selectedSyarat
      );
      if (alreadyExists) {
        alert("Syarat sudah ditambahkan!");
        return;
      }
      setDaftarSyarat((prev) => [...prev, { name: selectedSyarat }]);
      setSelectedSyarat(""); // Reset setelah menambahkan
    }
  };

  const handleDeleteSyarat = (index) => {
    setDaftarSyarat((prev) => prev.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarSyarat(null);
    setDaftarSyarat([]);
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
          <div className="texttitle">Daftar Syarat</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses: </span>
              {message}
            </div>
          )}

          {error && (
            <div
              className="p-4 m-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error: </span>
              {error}
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="flex items-center justify-between space-x-2 mb-4">
            <form
              onSubmit={(e) => e.preventDefault()} // Tidak melakukan submit form
              className="flex flex-grow justify-center"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-2/5 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              <select
                className="w-2/5 p-2 pl-4 text-sm border text-gray-400 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedUnit}
                onChange={handleUnitChange}
              >
                <option value="">Pilih Unit Pengolah</option>
                {unit && unit.length > 0 ? (
                  unit.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading unit...
                  </option>
                )}
              </select>
            </form>
          </div>
          {/* Table for displaying data */}
          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
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
                          Syarat Layanan
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {Array.isArray(dataDaftarSyarat) &&
                      dataDaftarSyarat.length > 0 ? (
                        dataDaftarSyarat.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-1 py-1 text-xs font-medium text-center text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.unit}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.name}
                            </td>
                            <td className="px-1 py-1 text-xs text-center text-gray-900 dark:text-gray-400">
                              {(() => {
                                try {
                                  const syaratArray = Array.isArray(
                                    item.syarat_layanan
                                  )
                                    ? item.syarat_layanan
                                    : JSON.parse(item.syarat_layanan || "[]");
                                  return syaratArray.length > 0 ? (
                                    <ul>
                                      {syaratArray.map((syarat, index) => (
                                        <li key={index}>{syarat} </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <span>No syarat available</span>
                                  );
                                } catch (error) {
                                  console.error(
                                    "Error parsing syarat_layanan:",
                                    error
                                  );
                                  return (
                                    <span>Error parsing syarat_layanan</span>
                                  );
                                }
                              })()}
                            </td>

                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => {
                                  handleAddSyarat(item.id);
                                  setCurrentDaftarSyarat(item);
                                  setModalOpen(true);
                                }}
                                className="focus:outline-none"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <i className="fas fa-edit text-green-600"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-4 text-gray-600"
                          >
                            Tidak ada data yang tersedia
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Modal */}
                  {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                        <form onSubmit={handleSubmit}>
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="unit"
                          >
                            {" "}
                            Nama Layanan
                          </label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={currentDaftarSyarat?.name || ""}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100" // Tambahkan styling sesuai kebutuhan
                          />
                          <div className="mt-2">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="unit"
                            >
                              {" "}
                              Unit Pengolah
                            </label>
                            <input
                              type="text"
                              name="unit"
                              defaultValue={currentDaftarSyarat?.unit || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100" // Tambahkan styling sesuai kebutuhan
                            />
                          </div>
                          <div className="mt-2">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="jenis"
                            >
                              {" "}
                              jenis
                            </label>
                            <input
                              type="text"
                              name="jenis"
                              defaultValue={currentDaftarSyarat?.jenis || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100" // Tambahkan styling sesuai kebutuhan
                            />
                          </div>
                          <div className="mt-2">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="daftar_syarat"
                            >
                              Daftar Syarat
                            </label>
                            <div className="mb-4 flex items-center">
                              <select
                                name="syarat"
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                value={selectedSyarat}
                                onChange={(e) =>
                                  setSelectedSyarat(e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  Pilih Item Syarat Layanan
                                </option>
                                {syaratOptions.length > 0 ? (
                                  syaratOptions.map((syarat) => (
                                    <option key={syarat.id} value={syarat.name}>
                                      {syarat.name}
                                    </option>
                                  ))
                                ) : (
                                  <option value="" disabled>
                                    Tidak ada syarat tersedia
                                  </option>
                                )}
                              </select>
                              <button
                                type="button"
                                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleAddSyarat}
                              >
                                Tambah
                              </button>
                            </div>
                          </div>
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">
                              Daftar Syarat Layanan
                            </h3>
                            {error && (
                              <div className="text-red-500">{error}</div>
                            )}
                            {message && (
                              <div className="text-green-500">{message}</div>
                            )}
                            <table className="min-w-full bg-white border border-gray-300">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 border border-gray-300">
                                    No
                                  </th>
                                  <th className="px-4 py-2 border border-gray-300">
                                    Nama Syarat
                                  </th>
                                  <th className="px-4 py-2 border border-gray-300">
                                    Aksi
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {daftarSyarat.length > 0 ? (
                                  daftarSyarat.map((syarat, index) => (
                                    <tr key={index}>
                                      <td className="px-4 py-2 border border-gray-300">
                                        {index + 1}
                                      </td>
                                      <td className="px-4 py-2 border border-gray-300">
                                        {syarat.name}
                                      </td>
                                      <td className="px-4 py-2 border border-gray-300">
                                        <button
                                          className="bg-red-500 text-white px-2 py-1 rounded"
                                          onClick={() =>
                                            handleDeleteSyarat(index)
                                          }
                                        >
                                          Hapus
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="3"
                                      className="px-4 py-2 border border-gray-300 text-center"
                                    >
                                      Tidak ada syarat ditambahkan
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-6">
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
                                Simpan
                                {/* {currentJenisLayanan ? "Update" : "Tambah"} */}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarSyarat;
