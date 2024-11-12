import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchDaftarPelayanan,
  createDaftarPelayanan,
  updateDaftarPelayanan,
  deleteDaftarPelayanan,
  previewPdf,
} from "../../services/daftarPelayananService";
import { exportpdf } from "../../services/layananService";
import PdfTemplate from "../pdf/TemplatePelayanan";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import LoadingPage from "../../components/loadingPage"; 
import Favicon from "../../components/Favicon";

const DaftarPelayanan = () => {
  const [dataDaftarPelayanan, setDataDaftarPelayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPelayanan, setCurrentDaftarPelayanan] = useState(null);
  const [activeTab, setActiveTab] = useState("Semua");
  const [counts, setCounts] = useState({
    SemuaCount: 0,
    baruCount: 0,
    prosesCount: 0,
    selesaiCount: 0,
    ambilCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
  }, []);

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

  const handleAdd = () => {
    setCurrentDaftarPelayanan(null);
    setModalOpen(true);
    navigate("/create-daftar-pelayanan");
  };

  const handleDocument = async (id) => {
    try {
      const data = await previewPdf(id);
      if (data && data.url) {
        window.open(data.url, "_blank");
      } else {
        console.error("Gagal memuat dokumen");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat membuka dokumen", error);
    }
  };
  const handleExportPDF = async (item) => {
    if (!item) {
      console.error("No item data available for PDF export.");
      return;
    }
    const htmlTemplate = <PdfTemplate noReg={item.no_reg} data={item} />;
    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);
    await exportpdf(htmlString, item.no_reg);
  };

  const handlePreview = async (item) => {
    if (!item) {
      console.error("No item data available for PDF preview.");
      return;
    }

    const htmlTemplate = <PdfTemplate noReg={item.no_reg} data={item} />;
    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
            ${htmlString}
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
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
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
    <div className="min-h-screen w-full bg-gray-100 flex flex-col lg:flex-row">
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
        <div className="p-4">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Daftar Pelayanan
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
                className="w-3/4 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
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
                <i className="fas fa-plus"></i>
                <span className="ml-1">Tambah</span>
              </button>
            </form>
          </div>

          {/* <div className="flex flex-col sm:flex-row mx-auto max-w-7xl sm:px-6 lg:px-8"> */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
            <div className="flex flex-col w-full sm:w-2/3 lg:w-3/5 xl:w-2/3 sm:px-4 lg:px-1 mb-1 sm:mb-1 mr-auto">
              <ul
                className="flex flex-wrap justify-center -mb-px text-sm font-medium text-center ml-2 space-x-4 w-full"
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
                    className="mb-4 sm:mb-0 flex-auto text-center relative group"
                    role="presentation"
                  >
                    <button
                      className={`inline-block p-2 border-b-3 w-full sm:w-auto transition-all duration-300 ease-in-out transform ${
                        activeTab === tab
                          ? "border-green-900 text-black-600 scale-110"
                          : "text-gray-600"
                      }`}
                      id={`${tab}-tab`}
                      onClick={() => handleTabChange(tab)}
                      type="button"
                      role="tab"
                      aria-controls={tab}
                      aria-selected={activeTab === tab}
                    >
                      <i
                        className={`${getStatusIcon(tab)} mr-2 text-sm font-bold`}
                      ></i>
                      <span className="ml-2 text-[16px]">{counts[tab]}</span>
                    </button>
                    <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-0 mb-2 hidden group-hover:block bg-gray-100 p-1 text-xs text-gray-600 rounded-lg shadow-lg">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

              <div className="overflow-x-auto">
                <table className="min-w-full w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nomor Registrasi
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Layanan
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Perihal
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kelengkapan
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Status
                      </th>
                      <th className="px-12 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredData().length > 0 ? (
                      getFilteredData().map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-2 py-3 text-xs font-medium text-center text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.no_reg}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.nama_pelayanan}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.perihal}
                          </td>
                          <td className="px-2 py-3 text-xs text-center text-gray-900">
                            {item.kelengkapan}
                          </td>
                          <td className="px-2 py-3 text-xs text-left text-gray-900 flex items-center justify-left hidden md:table-cell">
                            <i className={getStatusIcon(item.status)}></i>
                            <span className="ml-2">{item.status}</span>
                          </td>
                          <td className="text-center px-2 py-3">
                            <div className="flex justify-center space-x-2">
                              {/* Action Buttons */}
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
            </div>
          </div>

          {/* Modal */}
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
