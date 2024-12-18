import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchSuratKeluar,
  createSuratKeluar,
  updateSuratKeluar,
  deleteSuratKeluar,
} from "../../services/suratKeluarService";
import "../../App.css";
import Favicon from "../../components/Favicon";
import DEFAULT_LOGO_URL from "../../images/logo_min_1.png";
import { fetchSettings } from "../../services/settingsService";
import PdfTemplate from "../pdf/TemplateSuratKeluar";
import ReactDOMServer from "react-dom/server";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SuratKeluar = () => {
  const [dataSuratKeluar, setDataSuratKeluar] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSuratKeluar, setCurrentSuratKeluar] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataSuratKeluar.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataSuratKeluar.length / itemsPerPage);
  const [formData, setFormData] = useState({
    no_surat: "",
    tgl_surat: "",
    ditujukan: "",
    ditujukan_alamat: "",
    isi_surat: "",
    isi_singkat: "",
    lampiran: "",
    sifat: "",
    perihal: "",
    tembusan: "",
    jenis_surat: "",
    // file_surat: null,  // Jika ada input file
  });
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Surat Keluar`;
    fetchData();
    if (currentSuratKeluar) {
      setFormData({
        no_surat: currentSuratKeluar.no_surat || "",
        tgl_surat: currentSuratKeluar.tgl_surat || "",
        ditujukan: currentSuratKeluar.ditujukan || "",
        ditujukan_alamat: currentSuratKeluar.ditujukan_alamat || "",
        isi_singkat: currentSuratKeluar.isi_singkat || "",
        lampiran: currentSuratKeluar.lampiran || "",
        sifat: currentSuratKeluar.sifat || "",
        perihal: currentSuratKeluar.perihal || "",
        tembusan: currentSuratKeluar.tembusan || "",
        jenis_surat: currentSuratKeluar.jenis_surat || "",
      });
    }
  }, [currentSuratKeluar]);

  const fetchData = async () => {
    try {
      const response = await fetchSuratKeluar();
      console.log("fetch data:", response);
      setDataSuratKeluar(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Surat Keluar:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      fetchData();
    } else {
      const filteredData = dataSuratKeluar.filter(
        (item) =>
          String(item.no_surat || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.ditujukan || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataSuratKeluar(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteSuratKeluar(id);
        setMessage({ text: "Data berhasil dihapus", type: "success" });
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage({ text: "Data berhasil dihapus", type: "success" });
      }
    }
  };

  const handleAdd = () => {
    setCurrentSuratKeluar(null);
    setModalOpen(true);
  };
  const [isiSurat, setIsiSurat] = useState(currentSuratKeluar?.isi_surat || "");

  const handleChange = (value) => {
    setIsiSurat(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      no_surat,
      tgl_surat,
      ditujukan,
      ditujukan_alamat,
      isi_singkat,
      lampiran,
      sifat,
      perihal,
      tembusan,
      jenis_surat,
    } = e.target.elements;

    const SuratKeluar = {
      no_surat: no_surat.value,
      tgl_surat: tgl_surat.value,
      ditujukan: ditujukan.value,
      ditujukan_alamat: ditujukan_alamat.value,
      isi_singkat: isi_singkat.value,
      isi_surat: isiSurat, 
      lampiran: lampiran.value,
      sifat: sifat.value,
      perihal: perihal.value,
      tembusan: tembusan.value,
      jenis_surat: jenis_surat.value,
    };

    try {
      if (currentSuratKeluar) {
        await updateSuratKeluar(currentSuratKeluar.id, SuratKeluar);
        setMessage({ type: "success", text: "Data berhasil diupdate" });
      } else {
        await createSuratKeluar(SuratKeluar);
        setMessage({ type: "success", text: "Data berhasil ditambahkan" });
      }
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage({ type: "error", text: "Gagal menyimpan data" });
    }
  };

  const fetchSettingsData = async () => {
    try {
      const response = await fetchSettings();

      if (Array.isArray(response)) {
        const settingsData = {};

        response.forEach((item) => {
          settingsData[item.key] = item.value;
        });

        return settingsData;
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error fetching settings data:", error);
      return {};
    }
  };

  const handlePreview = async (item) => {
    if (!item) {
      console.error("No item data available for PDF preview.");
      return;
    }

    const {
      kop_surat = DEFAULT_LOGO_URL,
      email,
      telp,
      nama_lembaga,
      alamat,
      kepala_kantor,
      jenis_identitas,
      no_identitas,
      jabatan,
      website,
    } = await fetchSettingsData();
    const htmlTemplate = (
      <PdfTemplate
        no_surat={item.no_surat}
        data={item}
        settingsData={{
          kop_surat,
          email,
          telp,
          nama_lembaga,
          alamat,
          kepala_kantor,
          jenis_identitas,
          no_identitas,
          jabatan,
          website,
        }}
      />
    );
    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);

    const printWindow = window.open("", "_self");

    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Preview - ${item.no_surat}</title> <!-- Using the item.no_reg -->
          </head>
          <body>
            <div id="pdf-content">
              ${htmlString}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      console.error("Failed to open print window.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentSuratKeluar(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
        {message && (
          <div
            className={`flex justify-center items-center p-4 m-2 text-sm ${
              message.type === "success"
                ? "text-green-800 bg-green-50"
                : "text-red-800 bg-red-50"
            }`}
            role="alert"
          >
            <span className="font-medium">
              {message.type === "success" ? "Sukses: " : "Error: "}
            </span>
            {message.text}
          </div>
        )}
        <div className="p-4">
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-paper-plane mr-2"></i> Daftar Surat Keluar
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
                  Total Daftar Surat Keluar :
                  <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {dataSuratKeluar.length}
                  </text>
                  Data.
                </text>
                <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No Surat
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          tgl surat
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Ditujukan Kepada
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Isi Singkat / Deskripsi Surat
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
                            <td className="w-12 px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="max-w-xs px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.no_surat ? (
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 font-medium text-xs uppercase rounded-full">
                                  {item.no_surat}
                                </span>
                              ) : (
                                <span className="text-gray-500">Tidak ada data</span>
                              )}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {new Date(item.tgl_surat).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.ditujukan}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200 break-words">
                              {item.isi_singkat}
                            </td>
                            <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                              <button
                                onClick={() => {
                                  setCurrentSuratKeluar(item);
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
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
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
              <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <i
                    className={`mr-2 p-2 rounded-full text-white ${
                      currentSuratKeluar
                        ? "bg-green-600 fas fa-pencil-alt"
                        : "bg-green-600 fas fa-plus"
                    }`}
                  ></i>
                  {currentSuratKeluar
                    ? "Edit Surat Keluar"
                    : "Buat Surat Keluar"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        No. Surat
                      </label>
                      <input
                        defaultValue={currentSuratKeluar?.no_surat || ""}
                        type="text"
                        name="no_surat"
                        placeholder="No. Surat"
                        readOnly
                        required
                        className="w-full bg-gray-200  rounded py-2 px-4"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Tgl Surat
                      </label>
                      <input
                        defaultValue={
                          currentSuratKeluar?.tgl_surat
                            ? new Date(currentSuratKeluar?.tgl_surat)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        type="date"
                        name="tgl_surat"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mt-1 ">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Perihal
                      </label>
                      <input
                        defaultValue={currentSuratKeluar?.perihal || ""}
                        type="text"
                        placeholder="Perihal"
                        name="perihal"
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tembusan
                      </label>
                      <input
                        defaultValue={currentSuratKeluar?.tembusan || ""}
                        type="text"
                        name="tembusan"
                        placeholder="Tembusan"
                        // onChange={handleChange}
                        required
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-4 mt-1">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Jenis Surat
                      </label>
                      <select
                        defaultValue={currentSuratKeluar?.jenis_surat || ""}
                        name="jenis_surat"
                        // onChange={handleChange}
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Pilih Jenis</option>
                        <option value="penting">TTE</option>
                        <option value="biasa">Biasa</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Sifat
                      </label>
                      <select
                        defaultValue={currentSuratKeluar?.sifat || ""}
                        name="sifat"
                        // onChange={handleChange}
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Pilih Sifat</option>
                        <option value="penting">Penting</option>
                        <option value="biasa">Biasa</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Lampiran
                      </label>
                      <select
                        defaultValue={currentSuratKeluar?.lampiran || ""}
                        name="lampiran"
                        // onChange={handleChange}
                        required
                        class="block w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Pilih Lampiran</option>
                        <option value="lampiran 1">Lampiran 1</option>
                        <option value="lampiran 2">Lampiran 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-1 mt-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Kepada
                    </label>
                    <input
                      type="text"
                      name="ditujukan"
                      // onChange={handleChange}
                      defaultValue={currentSuratKeluar?.ditujukan || ""}
                      placeholder="Ditujukkan kepada"
                      required
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <p className="text-xs text-red-500 mt-1">
                      *Pisahkan dengan titik koma (;) jika penerima lebih dari
                      satu
                    </p>
                    <label className="mt-1 block text-sm font-medium text-gray-700">
                      Alamat Tujuan
                    </label>
                    <input
                      type="text"
                      name="ditujukan_alamat"
                      defaultValue={currentSuratKeluar?.ditujukan_alamat || ""}
                      placeholder="Alamat Tujuan"
                      required
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <label className="mt-1 block text-sm font-medium text-gray-700">
                      Isi Singkat / Deskripsi Surat
                    </label>
                    <input
                      type="text"
                      name="isi_singkat"
                      defaultValue={currentSuratKeluar?.isi_singkat || ""}
                      placeholder="Deskripsi Surat"
                      required
                      className="block w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Isi Surat
                    </label>
                    <ReactQuill
                      defaultValue={currentSuratKeluar?.isi_surat || ""}
                      name="isi_surat"
                      onChange={handleChange}
                      placeholder="Isi Ringkas Surat"
                      theme="snow" 
                      className="mb-14"
                      style={{ height: "80px", fontSize: "10px" }}
                    />
                  </div>

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
                      className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                      {currentSuratKeluar ? "Update" : "Tambah"}
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

export default SuratKeluar;
