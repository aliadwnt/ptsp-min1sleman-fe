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
import { fetchUnitPengolah } from "../../services/unitPengolahService";
import { fetchMasterSyarat } from "../../services/masterSyaratService";
import "../../App.css";
import { useParams } from "react-router-dom";

const DaftarSyarat = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [daftarSyarat, setDaftarSyarat] = useState([]);
  const [daftarSyaratLayanan, setDaftarSyaratLayanan] = useState([]);
  const [syaratOptions, setSyaratOptions] = useState([]);
  const [selectedSyarat, setSelectedSyarat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarSyarat, setCurrentDaftarSyarat] = useState(null);
  const [error, setError] = useState(null);
  const [syaratTerpilih, setSyaratTerpilih] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [dataDaftarSyarat, setDataDaftarSyarat] = useState([]);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Daftar Syarat";
    fetchData();
    fetchUnit();
    fetchSyarat();
    // fetchSyaratData();
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
      const response = await fetchUnitPengolah();
      setUnit(response.map((item) => item.name));
    } catch (error) {
      console.error("Error fetching unit:", error);
    }
  };

  const fetchData = async () => {
    try {
      const layananResponse = await fetchDaftarLayanan();
      const syaratResponse = await fetchDaftarSyarat(id);
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
      setError(null);
      setSuccess("Data berhasil diambil!");
    } catch (error) {
      console.error("Error fetching Daftar Syarat:", error);
      setSuccess(null);
      setError("Terjadi kesalahan saat mengambil data.");
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
          setError(null);
          setSuccess("Pencarian berhasil!");
        } catch (error) {
          console.error("Error during search:", error);
        }
      } else {
        setDataDaftarSyarat([]);
      }
    };

    search();
  }, [searchTerm, selectedUnit, id]);

  const handleUnitChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedUnit(selectedValue);

    if (selectedValue) {
      const filteredData = dataDaftarSyarat.filter((item) =>
        String(item.unit || "")
          .toLowerCase()
          .includes(selectedValue.toLowerCase())
      );
      setDataDaftarSyarat(filteredData);
    } else {
      setDataDaftarSyarat(dataDaftarSyarat);
    }
  };

  const fetchCurrentDaftarSyarat = async () => {
    if (currentDaftarSyarat) {
      const data = await fetchDaftarSyaratById(currentDaftarSyarat.id);
      const syarats =
        data.DaftarSyarat && data.DaftarSyarat?.syarat_layanan
          ? JSON.parse(data.DaftarSyarat?.syarat_layanan)
          : [];

      setDaftarSyarat(data.DaftarSyarat);
      setDaftarSyaratLayanan(syarats);
      setSyaratTerpilih(data.syarat_terpilih || []);
    }
  };

  React.useEffect(() => {
    fetchCurrentDaftarSyarat();
  }, [currentDaftarSyarat]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataDaftarSyarat(dataDaftarSyarat);
    } else {
      const filteredData = dataDaftarSyarat.filter(
        (item) =>
          String(item.unit || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.nama_pelayanan || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.syarat || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataDaftarSyarat(filteredData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      layanan_id: currentDaftarSyarat?.id,
      syarat_id: daftarSyarat?.id,
      daftar_syarat: daftarSyaratLayanan,
    };

    try {
      await updateDaftarSyarat(data);
      setMessage("Data berhasil diupdate");
      await fetchData();
      handleModalClose();
    } catch (error) {
      console.error(
        "Error detail:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Error submitting data: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const handleAddSyarat = () => {
    if (selectedSyarat) {
      const alreadyExists = daftarSyaratLayanan.some(
        (item) => item === selectedSyarat
      );
      if (alreadyExists) {
        alert("Syarat sudah ditambahkan!");
        return;
      }
      setDaftarSyaratLayanan((prev) => [...prev, selectedSyarat]);
      setSelectedSyarat(""); // Reset setelah menambahkan
    }
  };

  const handleDeleteSyarat = (index) => {
    setDaftarSyaratLayanan((prev) => prev.filter((_, i) => i !== index));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarSyarat(null);
    setDaftarSyaratLayanan([]);
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
        <div className="min-h-screen bg-gray-100 pb-0 m-0een m-0">
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2">
            Daftar Syarat
          </div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Sukses: </span>
              {message}
            </div>
          )}

          {error && (
            <div
              className="p-4 m-8 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Error: </span>
              {error}
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="flex items-center justify-between space-x-2 mb-4">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-grow justify-center"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-2/5 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              <select
                className="w-2/5 p-2 pl-4 text-sm border text-gray-400 border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                value={selectedUnit}
                onChange={handleUnitChange}
              >
                <option value="" disabled selected>
                  Pilih Unit Pengolah
                </option>{" "}
                {/* Read-only placeholder */}
                {unit && unit.length > 0 ? (
                  unit.map((unitItem, index) => (
                    <option key={index} value={unitItem}>
                      {unitItem}
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
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Pengolah
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Layanan
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Syarat Layanan
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {Array.isArray(dataDaftarSyarat) &&
                    dataDaftarSyarat.length > 0 ? (
                      dataDaftarSyarat.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-2 py-3 text-xs font-medium text-center text-gray-900 ">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.unit}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
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
                                return <span>No syarat available</span>;
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
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                          {/* {error && (
                              <div className="text-red-500">{error}</div>
                            )}
                            {message && (
                              <div className="text-green-500">{message}</div>
                            )} */}
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
                              {daftarSyaratLayanan.length > 0 ? (
                                daftarSyaratLayanan.map((syarat, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-2 border border-gray-300">
                                      {index + 1}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                      {syarat}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                      <button
                                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center space-x-2"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDeleteSyarat(index);
                                        }}
                                      >
                                        <i className="fas fa-trash"></i>
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
  );
};

export default DaftarSyarat;
