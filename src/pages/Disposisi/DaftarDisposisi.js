import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { fetchSuratMasuk } from "../../services/suratMasukService";
import "../../App.css";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";
import { fetchDaftarDisposisi } from "../../services/daftarDisposisiService";
import { fetchDaftarPelayanan } from "../../services/daftarPelayananService";

const DaftarDisposisi = () => {
  const [dataDaftarDisposisi, setDataDaftarDisposisi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarDisposisi, setCurrentDaftarDisposisi] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Disposisi`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const suratData = await fetchSuratMasuk();
      const disposisiData = await fetchDaftarDisposisi();
      const pelayananData = await fetchDaftarPelayanan();

      const disposisiGrouped = disposisiData.reduce((acc, disposisi) => {
        const key = disposisi.no_reg || disposisi.id_sm;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(disposisi);
        return acc;
      }, {});

      // Menggabungkan data Surat Masuk dan Pelayanan
      const suratGrouped = [...pelayananData, ...suratData];

      const updatedData = suratGrouped.map((surat) => {
        const disposisiItems = surat.no_reg
          ? disposisiGrouped[surat.no_reg] || []
          : disposisiGrouped[surat.id] || [];
        const status =
          disposisiItems.length > 0 ? "Didisposisikan" : "Menunggu";

        const pelayananItem = surat.no_reg
          ? pelayananData.find((pelayanan) => pelayanan.no_reg === surat.no_reg)
          : null;

        const disposisiDataForSurat = surat.no_reg
          ? disposisiGrouped[surat.no_reg] || []
          : disposisiGrouped[surat.id] || [];

        return {
          ...surat,

          status: status,
          disposisiItems:
            disposisiDataForSurat.length > 0
              ? disposisiDataForSurat
                  .map((item) => JSON.parse(item.disposisi))
                  .join(" , ")
              : "-",
          pelayanan: pelayananItem ? pelayananItem.nama : "Tidak ada pelayanan",
        };
      });

      setDataDaftarDisposisi(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error fetching Daftar Disposisi:", error);
      setMessage("Error fetching data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetail = (no_reg, id) => {
    setCurrentDaftarDisposisi(null);
    setModalOpen(true);

    if (no_reg) {
      navigate(`/disposisi/detail-pelayanan/${no_reg}`);
    } else {
      navigate(`/disposisi/detail-disposisi/${id}`);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      fetchData();
    } else {
      const filteredData = dataDaftarDisposisi.filter((item) => {
        return (
          String(item.status || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.perihal || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.disposisi || "")
        );
      });

      setFilteredData(filteredData);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="select-none min-h-screen w-full bg-gray-50 flex flex-col m-0 p-0 relative">
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
        <main className="p-4">
          <>
            <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
              <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                  <i className="fas fa-list mr-2"></i> Daftar Disposisi
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

              {message && (
                <div
                  className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
                  role="alert"
                >
                  <span className="font-medium">Sukses </span>
                  {message}
                </div>
              )}
              <div className="flex justify-center">
                <div className="w-full max-w-5xl">
                <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Total Daftar Disposisi : 
                  <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {dataDaftarDisposisi.length}
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
                            Status
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            no reg / no agenda
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Diterima Tgl.
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Disposisi Jabatan/Pegawai
                          </th>
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Perihal
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
                              <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                                {item.status === "Menunggu" ? (
                                  <span className="bg-yellow-500 text-white py-0.5 px-1.5 text-[10px] rounded-full flex items-center gap-1">
                                    <i className="fa fa-clock"></i> Menunggu
                                  </span>
                                ) : (
                                  <span className="bg-green-500 text-white py-0.5 px-1.5 text-[10px] rounded-full flex items-center gap-1">
                                    <i className="fa fa-check-circle"></i>{" "}
                                    Didisposisikan
                                  </span>
                                )}
                              </td>
                              <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {item.no_reg || item.no_agenda}
                              </td>
                              <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {item.diterima
                                  ? new Date(item.diterima).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      }
                                    )
                                  : item.tgl
                                  ? new Date(item.tgl).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      }
                                    )
                                  : "-"}{" "}
                              </td>
                              <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {item.disposisiItems || "-"}
                              </td>

                              <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                                {item.perihal}
                              </td>
                              <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                                <button
                                  onClick={() =>
                                    handleDetail(item.no_reg, item.id)
                                  }
                                  className="focu
                                  s:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                >
                                  <i className="fa fa-eye text-green-600 hover:text-green-900"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
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
          </>
        </main>
      </div>
    </div>
  );
};

export default DaftarDisposisi;
