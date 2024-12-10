import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import LoadingPage from "../../components/loadingPage";
import {
  fetchArsipLayanan,
  saveArsipMasuk,
  saveArsipKeluar,
} from "../../services/arsipLayananService";
import { fetchDaftarPelayanan } from "../../services/daftarPelayananService";
import { uploadSingle } from "../../services/uploadService";
import "../../App.css";
import Favicon from "../../components/Favicon";
import { ArrowUpTrayIcon, EyeIcon } from "@heroicons/react/24/outline";

const ArsipLayanan = () => {
  const [dataArsipLayanan, setDataArsipLayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataArsipLayanan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataArsipLayanan.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Arsip Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pelayananResponse = await fetchDaftarPelayanan();
      const arsipResponse = await fetchArsipLayanan();
      const combinedData = pelayananResponse.map((pelayanan) => {
        const arsip = arsipResponse.find(
          (arsip) => arsip.no_reg === pelayanan.no_reg
        );
        return {
          ...pelayanan,
          arsip_masuk: arsip ? arsip.arsip_masuk : "",
          arsip_keluar: arsip ? arsip.arsip_keluar : "",
        };
      });

      setDataArsipLayanan(combinedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Arsip Layanan:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsLoading(false);

    if (!value) {
      fetchData();
      setIsLoading(false);
    } else {
      const filteredData = dataArsipLayanan.filter(
        (item) =>
          String(item.no_reg || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.nama_pelayanan || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.perihal || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.status || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataArsipLayanan(filteredData);
    }
  };
  if (isLoading) {
    return <LoadingPage />;
  }

  const handleChange = (e, type, id) => {
    const { files } = e.target;
    if (files.length > 0) {
      const updatedData = dataArsipLayanan.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [type === "masuk" ? "arsip_masuk" : "arsip_keluar"]: files[0],
          };
        }
        return item;
      });
      setDataArsipLayanan(updatedData);

      handleSubmit(e, files[0], type, id);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Semua":
        return "fas fa-list text-gray-600";
      case "Baru":
        return "fas fa-file text-yellow-600";
      case "Proses":
        return "fas fa-hourglass-half text-yellow-500";
      case "Selesai":
        return "fas fa-check-circle text-green-600";
      case "Diambil":
        return "fas fa-user-check text-blue-600";
      case "Ditolak":
        return "fas fa-times-circle text-red-600";
      case "":
        return "fas fa-exclamation-circle text-orange-600 mr-2";
      default:
        return "";
    }
  };

  const handleSubmit = async (e, file, type, id) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      let uploadedArsipMasukUrl = "";
      let uploadedArsipKeluarUrl = "";

      if (type === "masuk" && file instanceof File) {
        uploadedArsipMasukUrl = await uploadSingle(file);
        console.log("Uploaded Arsip Masuk URL:", uploadedArsipMasukUrl);
      }

      if (type === "keluar" && file instanceof File) {
        uploadedArsipKeluarUrl = await uploadSingle(file);
        console.log("Uploaded Arsip Keluar URL:", uploadedArsipKeluarUrl);
      }
      const selectedArsipLayanan = dataArsipLayanan.find(
        (item) => item.id === id
      );

      if (!selectedArsipLayanan) {
        console.error("Data arsip tidak ditemukan untuk id:", id);
        setError("Data arsip tidak ditemukan.");
        setLoading(false);
        return;
      }

      const dataToSend = {
        no_reg: selectedArsipLayanan.no_reg,
        nama_pelayanan: selectedArsipLayanan.nama_pelayanan,
        perihal: selectedArsipLayanan.perihal,
        status: selectedArsipLayanan.status,
        arsip_masuk:
          type === "masuk"
            ? uploadedArsipMasukUrl
            : selectedArsipLayanan.arsip_masuk,
        arsip_keluar:
          type === "keluar"
            ? uploadedArsipKeluarUrl
            : selectedArsipLayanan.arsip_keluar,
      };

      console.log("Data yang akan dikirim:", dataToSend);

      if (type === "masuk") {
        await saveArsipMasuk(dataToSend);
      } else if (type === "keluar") {
        await saveArsipKeluar(dataToSend);
      }
      setSuccessMessage("Data berhasil disimpan!");
      fetchData();
    } catch (error) {
      console.error(
        "Gagal menyimpan data:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Gagal menyimpan data: " +
          (error.response ? error.response.data : error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col m-0 p-0 relative">
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
        {message && (
          <div
            className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            <span className="font-medium">Sukses </span>
            {message}
          </div>
        )}

        <div className="p-4">
          <div className="select-none w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-archive mr-2"></i> Daftar Arsip Layanan
              </div>
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2 w-full md:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 19a8 8 0 100-16 8 8 0 000 16zm-6-6h.01M16.39 16.39L21 21"
                  />
                </svg>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full md:w-48 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                >
                  <i className="fas fa-sync-alt text-xs"></i>
                </button>
              </form>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Total Daftar Arsip Layanan : 
                  <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {dataArsipLayanan.length}
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
                          Nomor Registrasi
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Nama Layanan
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Perihal
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Arsip Masuk
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Arsip Keluar
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Status
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
                              {item.no_reg}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.nama_pelayanan}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.perihal}
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              {item.arsip_masuk ? (
                                <>
                                  <a
                                    href={item.arsip_masuk}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-2 py-1 rounded-md text-gray-100 text-xs font-medium mb-2 shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
                                  >
                                    <EyeIcon className="w-3 h-3" />
                                    Preview
                                  </a>
                                  <input
                                    type="file"
                                    id={`uploadKeluar-${item.id}`}
                                    onChange={(e) =>
                                      handleChange(e, "keluar", item.id)
                                    }
                                    className="hidden"
                                  />
                                </>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id={`uploadMasuk-${item.id}`}
                                    onChange={(e) =>
                                      handleChange(e, "masuk", item.id)
                                    }
                                    className="hidden"
                                  />
                                  <button
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `uploadMasuk-${item.id}`
                                        )
                                        .click()
                                    }
                                    className="focus:outline-none"
                                    style={{
                                      background: "none",
                                      border: "none",
                                      padding: 0,
                                    }}
                                    aria-label="Upload"
                                  >
                                    <ArrowUpTrayIcon className="w-4 h-4 text-green-600 hover:text-green-900" />
                                  </button>
                                </>
                              )}
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              {item.arsip_keluar ? (
                                <>
                                  <a
                                    href={item.arsip_keluar}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-2 py-1 rounded-md text-gray-100 text-xs font-medium mb-2 shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
                                  >
                                    <EyeIcon className="w-3 h-3" />
                                    Preview
                                  </a>

                                  <input
                                    type="file"
                                    id={`uploadKeluar-${item.id}`}
                                    onChange={(e) =>
                                      handleChange(e, "keluar", item.id)
                                    }
                                    className="hidden"
                                  />
                                </>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id={`uploadKeluar-${item.id}`}
                                    onChange={(e) =>
                                      handleChange(e, "keluar", item.id)
                                    }
                                    className="hidden"
                                  />
                                  <button
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `uploadKeluar-${item.id}`
                                        )
                                        .click()
                                    }
                                    className="focus:outline-none"
                                    style={{
                                      background: "none",
                                      border: "none",
                                      padding: 0,
                                    }}
                                    aria-label="Upload"
                                  >
                                    <ArrowUpTrayIcon className="w-4 h-4 text-green-600 hover:text-green-900" />
                                  </button>
                                </>
                              )}
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              <i className={getStatusIcon(item.status)}></i>
                              <span className="ml-2">{item.status}</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
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
        </div>
      </div>
    </div>
  );
};

export default ArsipLayanan;
