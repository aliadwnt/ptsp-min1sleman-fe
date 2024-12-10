import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchDaftarPelayanan,
  createDaftarPelayanan,
  updateDaftarPelayanan,
  deleteDaftarPelayanan,
} from "../../services/daftarPelayananService";
import { exportpdf } from "../../services/layananService";
import { fetchSettings } from "../../services/settingsService";
import PdfTemplate from "../pdf/TemplatePelayanan";
import "../../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import DEFAULT_LOGO_URL from "../../images/logo_min_1.png";

const DaftarPelayanan = () => {
  const [dataDaftarPelayanan, setDataDaftarPelayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPelayanan, setCurrentDaftarPelayanan] = useState(null);
  const [activeTab, setActiveTab] = useState("Semua");
  const [logo, setLogo] = useState(null);
  const [counts, setCounts] = useState({
    SemuaCount: 0,
    baruCount: 0,
    prosesCount: 0,
    selesaiCount: 0,
    ambilCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await fetchDaftarPelayanan();
      setDataDaftarPelayanan(result);

      const SemuaCount = result.length;
      const baruCount = result.filter((item) => item.status === "Baru").length;
      const prosesCount = result.filter(
        (item) => item.status === "Proses"
      ).length;
      const selesaiCount = result.filter(
        (item) => item.status === "Selesai"
      ).length;
      const ambilCount = result.filter(
        (item) => item.status === "Diambil"
      ).length;
      const tolakCount = result.filter(
        (item) => item.status === "Ditolak"
      ).length;

      setCounts({
        Semua: SemuaCount,
        Baru: baruCount,
        Proses: prosesCount,
        Selesai: selesaiCount,
        Diambil: ambilCount,
        Ditolak: tolakCount,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Pelayanan`;
    fetchData();
    // fetchLogo();
    if (location.state) {
      setMessage(location.state.message);
      setIsError(location.state.isError);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setDataDaftarPelayanan(dataDaftarPelayanan);
    } else {
      const filteredData = dataDaftarPelayanan.filter(
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
          String(item.kelengkapan || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.status || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataDaftarPelayanan(filteredData);
    }
  };

  const handleTabChange = (status) => {
    setActiveTab(status);
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Nomor registrasi telah disalin!");
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteDaftarPelayanan(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case "Semua":
        return dataDaftarPelayanan;
      case "Baru":
        return dataDaftarPelayanan.filter((item) => item.status === "Baru");
      case "Proses":
        return dataDaftarPelayanan.filter((item) => item.status === "Proses");
      case "Selesai":
        return dataDaftarPelayanan.filter((item) => item.status === "Selesai");
      case "Diambil":
        return dataDaftarPelayanan.filter((item) => item.status === "Diambil");
      case "Ditolak":
        return dataDaftarPelayanan.filter((item) => item.status === "Ditolak");
      case "":
        return dataDaftarPelayanan.filter((item) => item.status === "");
      default:
        return dataDaftarPelayanan;
    }
  };
  const filteredData = getFilteredData();
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAdd = () => {
    setCurrentDaftarPelayanan(null);
    setModalOpen(true);
    navigate("/create-daftar-pelayanan");
  };

  const fetchKop = async () => {
    try {
      const response = await fetchSettings();

      if (Array.isArray(response)) {
        const logoSetting = response.find((item) => item.key === "kop_surat");

        if (logoSetting && logoSetting.value) {
          return logoSetting.value;
        } else {
          return DEFAULT_LOGO_URL;
        }
      } else {
        return DEFAULT_LOGO_URL;
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
      return DEFAULT_LOGO_URL;
    }
  };

  const handleExportPDF = async (item) => {
    if (!item) {
      console.error("No item data available for PDF export.");
      return;
    }
    const logo = await fetchKop();

    const htmlTemplate = (
      <PdfTemplate noReg={item.no_reg} data={item} logo={logo} />
    );
    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);
    await exportpdf(htmlString, item.no_reg);
  };

  const handlePreview = async (item) => {
    if (!item) {
      console.error("No item data available for PDF preview.");
      return;
    }
  
    const logo = await fetchKop();
    const htmlTemplate = (
      <PdfTemplate noReg={item.no_reg} data={item} logo={logo} />
    );
    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);
  
    const previewWindow = window.open("", "_blank");
  
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Preview - ${item.no_reg}</title> <!-- Using the item.no_reg -->
          </head>
          <body>
            <div id="pdf-content">
              ${htmlString}
            </div>
            <button onclick="window.print();" style="margin-top: 20px; padding: 10px; background-color: blue; color: white; border: none; cursor: pointer;">
              Print
            </button>
          </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      console.error("Failed to open preview window.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { no_reg, nama_pelayanan, perihal, kelengkapan, status } =
      e.target.elements;

    const DaftarPelayanan = {
      no_reg: no_reg.value,
      nama_pelayanan: nama_pelayanan.value,
      perihal: perihal.value,
      kelengkapan: kelengkapan.value,
      status: status.value,
    };
    try {
      if (currentDaftarPelayanan) {
        await updateDaftarPelayanan(currentDaftarPelayanan.id, DaftarPelayanan);
        setMessage("Data berhasil diupdate");
      } else {
        await createDaftarPelayanan(DaftarPelayanan);
        setMessage("Data berhasil ditambahkan");
      }
      setIsError(false);
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Gagal menyimpan data");
      setIsError(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarPelayanan(null);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      <Favicon />
      <div
        className={`fixed inset-y-0 center-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      </div>
      <div
        className={`flex-1 lg:ml-64 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        <Header />
        {message && (
          <div
            className={`flex justify-center items-center p-4 m-2 text-sm ${
              isError ? "text-red-800 bg-red-50" : "text-green-800 bg-green-50"
            } rounded-lg`}
            role="alert"
          >
            <span className="font-medium">
              {isError ? "Error" : "Sukses"}:{" "}
            </span>
            {message}
          </div>
        )}
        <div className="select-none p-4">
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                  <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                    <i className="fas fa-list mr-2"></i> Daftar Pelayanan
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

                <div className="flex flex-col w-full sm:w-2/3 lg:w-3/5 xl:w-2/3 sm:px-4 lg:px-1 sm:mb-1 mr-auto">
                  <ul
                    className="flex flex-nowrap justify-center sm:justify-start w-full text-sm font-medium text-center sm:text-left space-x-2 sm:space-x-4 overflow-x-auto"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-content"
                    role="tablist"
                  >
                    {[
                      "Semua",
                      "Baru",
                      "Proses",
                      "Selesai",
                      "Diambil",
                      "Ditolak",
                    ].map((tab) => (
                      <li
                        key={tab}
                        className="mb-4 sm:mb-0 flex-shrink-0 flex-grow-0 text-center relative group"
                        role="presentation"
                      >
                        <div
                          className={`bg-white p-2 rounded-lg flex flex-col items-center transition-all duration-300 focus:outline-none hover:bg-slate-50 ${
                            activeTab === tab
                              ? "text-green-900 font-semibold shadow-lg"
                              : "text-gray-600 hover:text-green-700"
                          }`}
                          id={`${tab}-tab`}
                          onClick={() => handleTabChange(tab)}
                          type="button"
                          role="tab"
                          aria-controls={tab}
                          aria-selected={activeTab === tab}
                        >
                          <div className="flex items-center space-x-2">
                            <i className={`${getStatusIcon(tab)} text-lg`}></i>
                            <span className="text-base">{counts[tab]}</span>
                          </div>
                          <div
                            className={`h-[2px] transition-all duration-300 mt-1 rounded-full ${
                              activeTab === tab
                                ? "bg-green-700 w-12"
                                : "bg-gray-300 w-8"
                            }`}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Total Daftar Pelayanan : 
                    <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {counts.Semua}
                    </text>
                    Data.
                  </text>
                  <table className="mt-2 min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
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
                          Kelengkapan
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Status
                        </th>
                        <th className="px-12 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
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
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200 flex items-center justify-center space-x-2">
                              <span>{item.no_reg}</span>
                              <button
                                onClick={() => handleCopy(item.no_reg)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                              >
                                <ClipboardIcon className="w-4 h-4" />
                              </button>
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.nama_pelayanan}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.perihal}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.kelengkapan}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              <i className={getStatusIcon(item.status)}></i>
                              <span className="ml-2">{item.status}</span>
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => handlePreview(item)}
                                  className="focus:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                  aria-label="Preview"
                                >
                                  <i className="fas fa-file-alt text-blue-600 hover:text-gray-800"></i>
                                </button>
                                <button
                                  onClick={() => handleExportPDF(item)}
                                  className="focus:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                  aria-label="Download"
                                >
                                  <i className="fas fa-download text-yellow-600 hover:text-yellow-900 ml-1"></i>
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/update-daftar-pelayanan/${item.id}`
                                    )
                                  }
                                  className="focus:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                  aria-label="Edit"
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
                                  aria-label="Delete"
                                >
                                  <i className="fas fa-trash text-red-600 hover:text-red-900"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider"
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
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-50">
                <h2 className="text-xl font-semibold mb-4">
                  {currentDaftarPelayanan
                    ? "Edit Daftar Pelayanan"
                    : "Tambah Daftar Pelayanan"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="no_reg"
                    defaultValue={currentDaftarPelayanan?.no_reg || ""}
                    placeholder="Nomor Registrasi"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="nama_pelayanan"
                    defaultValue={currentDaftarPelayanan?.nama_pelayanan || ""}
                    placeholder="Nama Pelayanan"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <textarea
                    name="perihal"
                    defaultValue={currentDaftarPelayanan?.perihal || ""}
                    placeholder="Perihal"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  ></textarea>
                  <input
                    type="text"
                    name="kelengkapan"
                    defaultValue={currentDaftarPelayanan?.kelengkapan || ""}
                    placeholder="Kelengkapan"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <input
                    type="text"
                    name="status"
                    defaultValue={currentDaftarPelayanan?.status || ""}
                    placeholder="Status"
                    required
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
                      {currentDaftarPelayanan ? "Update" : "Tambah"}
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

export default DaftarPelayanan;
