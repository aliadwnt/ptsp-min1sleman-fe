import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { uploadSingle } from "../../services/uploadService";
import {
  fetchSuratMasuk,
  createSuratMasuk,
  updateSuratMasuk,
  deleteSuratMasuk,
} from "../../services/suratMasukService";
import { fetchDaftarDisposisi } from "../../services/daftarDisposisiService";
import "../../App.css";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";
import DEFAULT_LOGO_URL from "../../images/logo_min_1.png";
import { fetchSettings } from "../../services/settingsService";
import PdfTemplate from "../pdf/TemplateDisposisi";
import ReactDOMServer from "react-dom/server";

const SuratMasuk = () => {
  const [dataSuratMasuk, setDataSuratMasuk] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSuratMasuk, setCurrentSuratMasuk] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    no_agenda: "",
    no_surat: "",
    tgl_surat: "",
    perihal: "",
    instansi_pengirim: "",
    diterima: "",
    klasifikasi: "",
    status: "",
    sifat: "",
    lampiran: "",
    file_surat: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataSuratMasuk.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataSuratMasuk.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Surat Masuk`;
    fetchData();

    if (currentSuratMasuk) {
      setFormData({
        no_agenda: currentSuratMasuk.no_agenda || "",
        no_surat: currentSuratMasuk.no_surat || "",
        tgl_surat: currentSuratMasuk.tgl_surat || "",
        instansi_pengirim: currentSuratMasuk.instansi_pengirim || "",
        diterima: currentSuratMasuk.diterima || "",
        klasifikasi: currentSuratMasuk.klasifikasi || "",
        status: currentSuratMasuk.status || "",
        sifat: currentSuratMasuk.sifat || "",
        lampiran: currentSuratMasuk.lampiran || "",
        perihal: currentSuratMasuk.perihal || "",
        file_surat: currentSuratMasuk.file_surat || "",
      });
    }
  }, [currentSuratMasuk]);

  const fetchData = async () => {
    try {
      const suratData = await fetchSuratMasuk();
      const disposisiData = await fetchDaftarDisposisi();

      const disposisiGrouped = disposisiData.reduce((acc, disposisi) => {
        if (!acc[disposisi.id_sm]) {
          acc[disposisi.id_sm] = [];
        }
        acc[disposisi.id_sm].push(disposisi);
        return acc;
      }, {});

      const updatedData = suratData.map((surat) => {
        const disposisiItems = disposisiGrouped[surat.id] || [];
        const status =
          disposisiItems.length > 0 ? "Didisposisikan" : "Menunggu";

        const result = disposisiItems
          .map((item) => {
            try {
              const disposisiArray = JSON.parse(item.disposisi);
              const tindakanArray = JSON.parse(item.tindakan);
              const catatanArray = JSON.parse(item.catatan);

              return disposisiArray.map((disposisi, index) => ({
                disposisi,
                catatan: catatanArray[index] || "",
                tindakan: tindakanArray[index] || "",
              }));
            } catch (error) {
              console.error(
                "Error parsing disposisi, tindakan, or catatan:",
                error
              );
              return [];
            }
          })
          .flat();

        return {
          ...surat,
          status: status,
          disposisi: result.map((item) => `${item.disposisi}`).join(", "),
          tindakan: result.map((item) => `${item.tindakan}`).join(", "),
          catatan: result.map((item) => ` ${item.catatan}`).join(", "),
          pdfLink: disposisiItems.length > 0 ? `/pdf/${surat.id}` : null,
        };
      });

      setDataSuratMasuk(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error fetching Daftar Disposisi:", error);
      setMessage("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      fetchData();
    } else {
      const filteredData = dataSuratMasuk.filter(
        (item) =>
          String(item.no_agenda || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.no_surat || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.diterima || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataSuratMasuk(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteSuratMasuk(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentSuratMasuk(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    console.log(formData); // Log formData to check if all values are correct

    try {
      let uploadedFileUrl = "";
      if (formData.file_surat && formData.file_surat instanceof File) {
        uploadedFileUrl = await uploadSingle(formData.file_surat);
      }

      const dataToSend = {
        ...formData,
        file_surat: uploadedFileUrl || formData.file_surat,
      };

      if (currentSuratMasuk) {
        await updateSuratMasuk(currentSuratMasuk.id, dataToSend);
        setMessage("Data berhasil diupdate");
      } else {
        await createSuratMasuk(dataToSend);
        setMessage("Data berhasil ditambahkan");
      }

      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file_surat") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentSuratMasuk(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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

  return (
    <div className="select-none min-h-screen w-full bg-gray-50 flex flex-col m-0 p-0 relative">
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

        <div className="p-2">
          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <div className="select-none text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-inbox mr-2"></i>Daftar Surat Masuk
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
                <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No Agenda
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Tanggal Diterima
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Disposisi Pegawai
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          instansi pengirim
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Perihal
                        </th>

                        <th className="px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
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
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              {item.status === "Menunggu" ? (
                                <span className="bg-yellow-500 text-white py-0.5 px-1.5 text-[10px] rounded-full flex items-center gap-1 justify-center">
                                  <i className="fa fa-clock"></i>{" "}
                                  {item.no_agenda}
                                </span>
                              ) : (
                                <span className="bg-green-500 text-white py-0.5 px-1.5 text-[10px] rounded-full flex items-center gap-1 justify-center">
                                  <i className="fa fa-check-circle"></i>{" "}
                                  {item.no_agenda}
                                </span>
                              )}
                            </td>

                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {new Date(item.diterima).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.disposisi || "-"}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.instansi_pengirim}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.perihal}
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              {item.status !== "Didisposisikan" && (
                                <button
                                  onClick={() => {
                                    setCurrentSuratMasuk(item);
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
                              )}
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
                              {item.status === "Didisposisikan" &&
                                item.file_surat && (
                                  <button
                                    onClick={() => handlePreview(item)}
                                    className="focus:outline-black"
                                    style={{
                                      background: "none",
                                      border: "none",
                                      padding: 0,
                                    }}
                                    aria-label="Preview"
                                  >
                                    <i className="fas fa-file-alt text-blue-600 hover:text-blue-900"></i>
                                  </button>
                                )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="10"
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

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <i
                    className={`mr-2 p-2 rounded-full text-white ${
                      currentSuratMasuk
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentSuratMasuk
                    ? "Edit Surat Masuk"
                    : "Tambah Surat Masuk"}
                </h2>
                <form onSubmit={handleSubmit} class="space-y-4">
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        No. Surat
                      </label>
                      <input
                        defaultValue={formData?.no_surat || ""}
                        onChange={handleChange}
                        type="text"
                        name="no_surat"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Tgl Surat
                      </label>
                      <input
                        defaultValue={
                          formData?.tgl_surat
                            ? new Date(formData?.tgl_surat)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={handleChange}
                        type="date"
                        name="tgl_surat"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Instansi Pengirim
                      </label>
                      <input
                        defaultValue={formData?.instansi_pengirim || ""}
                        onChange={handleChange}
                        type="text"
                        name="instansi_pengirim"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        No Agenda
                      </label>
                      <input
                        defaultValue={formData?.no_agenda || ""}
                        onChange={handleChange}
                        type="text"
                        name="no_agenda"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Diterima Tgl
                      </label>
                      <input
                        defaultValue={
                          formData?.diterima
                            ? new Date(formData?.diterima)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={handleChange}
                        type="date"
                        name="diterima"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Klasifikasi
                      </label>
                      <input
                        defaultValue={formData?.klasifikasi || ""}
                        onChange={handleChange}
                        type="text"
                        name="klasifikasi"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Perihal Surat
                      </label>
                      <textarea
                        defaultValue={formData?.perihal || ""}
                        onChange={handleChange}
                        name="perihal"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      ></textarea>
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Lampiran
                      </label>
                      <select
                        defaultValue={formData?.lampiran || ""}
                        onChange={handleChange}
                        name="lampiran"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">--Lampiran--</option>
                        <option value="lampiran1">Lampiran 1</option>
                        <option value="lampiran2">Lampiran 2</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        defaultValue={formData?.status || ""}
                        onChange={handleChange}
                        name="status"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">--Status--</option>
                        <option value="asli">Asli</option>
                        <option value="tembusan">Tembusan</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Sifat
                      </label>
                      <select
                        defaultValue={formData?.sifat || ""}
                        onChange={handleChange}
                        name="sifat"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">--Sifat--</option>
                        <option value="penting">Penting</option>
                        <option value="biasa">Biasa</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Upload File Surat
                      </label>
                      <input
                        onChange={handleChange}
                        type="file"
                        name="file_surat"
                        accept=".pdf"
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                      <small class="text-gray-500">*pdf</small>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      class="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                      Submit
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

export default SuratMasuk;
