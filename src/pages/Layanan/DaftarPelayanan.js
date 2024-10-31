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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

const DaftarPelayanan = () => {
  const [dataDaftarPelayanan, setDataDaftarPelayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPelayanan, setCurrentDaftarPelayanan] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [countAll, setCountAll] = useState(0);
  const [countBaru, setCountBaru] = useState(0);
  const [countProses, setCountProses] = useState(0);
  const [countSelesai, setCountSelesai] = useState(0);
  const [countAmbil, setCountAmbil] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // Function to fetch data
  const fetchData = async () => {
    try {
      const result = await fetchDaftarPelayanan();
      setDataDaftarPelayanan(result);

      // Update the counts based on the statuses
      const allCount = result.length;
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

      setCountAll(allCount);
      setCountBaru(baruCount);
      setCountProses(prosesCount);
      setCountSelesai(selesaiCount);
      setCountAmbil(ambilCount);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Pelayanan`;
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataDaftarPelayanan.filter(
      (item) =>
        String(item.no_reg || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(item.nama_pelayanan || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(item.perihal || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(item.kelengkapan || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(item.status || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setDataDaftarPelayanan(filteredData);
  };

  const handleTabChange = (status) => {
    setActiveTab(status);
    fetchDataByStatus(status);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
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

  const fetchDataByStatus = async (status) => {
    try {
      const response = await axios.get(`=${status}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      previewWindow.document.close(); // Close the document to render it
    } else {
      console.error("Failed to open preview window.");
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
    <div className="min-h-screen bg-gray-100 pb-0 m-0een m-0 flex relative">
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
        <div>
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-300">Daftar Pelayanan</div>
          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
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
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus mr-2"></i>
                <span className="hidden md:inline">Tambah</span>
              </button>
            </form>
          </div>
          <div className="flex flex-col sm:flex-row mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="flex mx-auto max-w-7xl sm:px-6 lg:px-8 -mb-2">
                  <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-content"
                    role="tablist"
                    style={{ listStyle: "none" }}
                  >
                    <li
                      className="mb-2 me-16 relative group"
                      role="presentation"
                    >
                      <button
                        className={`inline-block p-2 border-b-3 w-20 rounded-t-lg ${
                          activeTab === "all"
                            ? "border-green-900 text-black-600"
                            : ""
                        }`}
                        id="all-tab"
                        onClick={() => handleTabChange("all")}
                        type="button"
                        role="tab"
                        aria-controls="all"
                        aria-selected={activeTab === "all"}
                      >
                        <i className="fas fa-list mr-2"></i>
                        <span className="ml-2 text-[16px]">{countAll}</span>
                      </button>
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-0 mb-2 hidden group-hover:block bg-gray-100 p-1 text-xs text-gray-600 rounded-lg shadow-lg">
                        Semua
                      </span>
                    </li>
                    <li
                      className="mb-8 me-16 relative group"
                      role="presentation"
                    >
                      <button
                        className={`inline-block p-2 border-b-3 w-20 rounded-t-lg ${
                          activeTab === "all"
                            ? "border-green-900 text-black-600"
                            : ""
                        }`}
                        id="accept-tab"
                        onClick={() => handleTabChange("accept")}
                        type="button"
                        role="tab"
                        aria-controls="accept"
                        aria-selected={activeTab === "accept"}
                      >
                        <i className="fas fa-file text-green-600 mr-2"></i>
                        <span className="ml-2 text-[16px]">{countBaru}</span>
                      </button>
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-0 mb-2 hidden group-hover:block bg-gray-100 p-1 text-xs text-gray-600 rounded-lg shadow-lg">
                        Baru
                      </span>
                    </li>

                    <li
                      className="mb-20 me-16 relative group"
                      role="presentation"
                    >
                      <button
                        className={`inline-block p-2 border-b-3 w-20 rounded-t-lg ${
                          activeTab === "all"
                            ? "border-green-900 text-black-600"
                            : ""
                        }`}
                        id="verify-tab"
                        onClick={() => handleTabChange("verify")}
                        type="button"
                        role="tab"
                        aria-controls="verify"
                        aria-selected={activeTab === "verify"}
                      >
                        <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                        <span className="ml-2 text-[16px]">{countProses}</span>
                      </button>
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-0 mb-2 hidden group-hover:block bg-gray-100 p-1 text-xs text-gray-600 rounded-lg shadow-lg">
                        Proses
                      </span>
                    </li>

                    <li
                      className="mb-20 me-16 relative group"
                      role="presentation"
                    >
                      <button
                        className={`inline-block p-2 border-b-3 w-20 rounded-t-lg ${
                          activeTab === "all"
                            ? "border-green-900 text-black-600"
                            : ""
                        }`}
                        id="notverify-tab"
                        onClick={() => handleTabChange("notverify")}
                        type="button"
                        role="tab"
                        aria-controls="notverify"
                        aria-selected={activeTab === "notverify"}
                      >
                        <i className="fas fa-clock text-red-600 mr-2"></i>
                        <span className="ml-2 text-[16px]">{countSelesai}</span>
                      </button>
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-0 mb-2 hidden group-hover:block bg-gray-100 p-1 text-xs text-gray-600 rounded-lg shadow-lg">
                        Selesai
                      </span>
                    </li>

                    <li
                      className="mb-20 me-14 relative group"
                      role="presentation"
                    >
                      <button
                        className={`inline-block p-2 border-b-3 w-20 rounded-t-lg ${
                          activeTab === "all"
                            ? "border-green-900 text-black-600"
                            : ""
                        }`}
                        id="pass-tab"
                        onClick={() => handleTabChange("pass")}
                        type="button"
                        role="tab"
                        aria-controls="pass"
                        aria-selected={activeTab === "pass"}
                      >
                        <i className="fas fa-user-check text-yellow-500 mr-2"></i>
                        <span className="ml-2 text-[16px]">{countAmbil}</span>
                      </button>
                      <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-0 mb-2 hidden group-hover:block bg-gray-100 p-1 text-xs text-gray-600 rounded-lg shadow-lg">
                        Ambil
                      </span>
                    </li>
                  </ul>
                  <div id="default-tab-content" className="mt-4">
                    {activeTab === "all" && <div></div>}
                    {activeTab === "accept" && <div></div>}
                    {activeTab === "verify" && <div></div>}
                    {activeTab === "notverify" && <div></div>}
                    {activeTab === "pass" && <div></div>}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nomor Registrasi
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama Layanan
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Perihal
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Kelengkapan
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarPelayanan.length > 0 ? (
                        dataDaftarPelayanan.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-3 py-3 text-xs font-medium text-center text-gray-900 dark:text-white">
                              {index + 1}
                            </td>
                            <td className="px-3 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.no_reg}
                            </td>
                            <td className="px-3 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.nama_pelayanan}
                            </td>
                            <td className="px-3 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                              {item.perihal}
                            </td>
                            <td className="px-3 py-3 text-xs text-center text-gray-900 dark:text-gray-400 hidden md:table-cell">
                              {item.kelengkapan}
                            </td>
                            <td className="px-3 py-3 text-xs text-center text-gray-900 dark:text-gray-400 hidden md:table-cell">
                              {(() => {
                                if (item.status === "baru") {
                                  return (
                                    <span className="flex items-center">
                                      <i
                                        className="fas fa-plus-circle text-green-500"
                                        style={{ fontSize: "0.4rem" }}
                                      ></i>{" "}
                                      Baru
                                    </span>
                                  );
                                } else if (item.status === "diproses") {
                                  return (
                                    <span className="flex items-center">
                                      <i
                                        className="fas fa-cog text-yellow-500 animate-spin"
                                        style={{ fontSize: "0.4rem" }}
                                      ></i>{" "}
                                      Diproses
                                    </span>
                                  );
                                } else if (item.status === "selesai") {
                                  return (
                                    <span className="flex items-center">
                                      <i
                                        className="fas fa-check-circle text-blue-500"
                                        style={{ fontSize: "0.4rem" }}
                                      ></i>{" "}
                                      Selesai
                                    </span>
                                  );
                                } else if (item.status === "diambil") {
                                  return (
                                    <span className="flex items-center">
                                      <i
                                        className="fas fa-box-open text-red-500"
                                        style={{ fontSize: "0.4rem" }}
                                      ></i>{" "}
                                      Diambil
                                    </span>
                                  );
                                } else {
                                  return <span>{item.status}</span>;
                                }
                              })()}
                            </td>
                            <td className="text-center">
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

                                {/* Button for Editing */}
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

                                {/* Button for Deleting */}
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
                            className="text-center py-3 text-gray-500"
                          >
                            Data tidak ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
