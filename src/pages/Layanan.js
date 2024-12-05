import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { createDaftarPelayanan } from "../services/layananService";
import { fetchJenisLayanan } from "../services/jenisLayananService";
import { uploadMultiple } from "../services/uploadService";
import { uploadSingle } from "../services/uploadService";
import { addNotification } from "../services/notificationService";
import Swal from "sweetalert2";
import { exportpdf } from "../services/layananService";
import PdfTemplate from "./pdf/TemplatePelayanan";
import withReactContent from "sweetalert2-react-content";
import ReactDOMServer from "react-dom/server";
import "../App";
import Favicon from "../components/Favicon";

const MySwal = withReactContent(Swal);
const Layanan = () => {
  const [formData, setFormData] = useState({
    no_reg: "",
    nama_pelayanan: "",
    perihal: "",
    no_surat: "",
    tgl: "",
    nama_pemohon: "",
    alamat: "",
    no_hp: "",
    nama_pengirim: "",
    catatan: "",
    filename: [],
  });

  const [layananOptions, setLayananOptions] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await fetchJenisLayanan();
      if (Array.isArray(data)) {
        setLayananOptions(data);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      setError("Error fetching Jenis Layanan: " + error.message);
      console.error("Error fetching Jenis Layanan:", error);
    }
  };

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Buat Layanan";
    fetchData();
  }, []);

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const messageElement = document.getElementById("copyMessage");
    messageElement.textContent = "Nomor Registrasi Berhasil disalin!";
    messageElement.style.display = "block";

    setTimeout(() => {
      messageElement.style.display = "none";
    }, 2000);
  }
  window.copyToClipboard = copyToClipboard;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        [name]: [...(prevData[name] || []), ...newFiles],
      }));

      e.target.value = "";
    } else if (value !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      let uploadedFileUrls = [];

      if (formData.filename && formData.filename.length > 0) {
        uploadedFileUrls = await uploadMultiple(formData.filename);
      }

      const dataToSend = {
        ...formData,
        filename: JSON.stringify(uploadedFileUrls),
      };
      const responseData = await createDaftarPelayanan(dataToSend);
      console.log("Response Data:", responseData);

      if (responseData && responseData.data && responseData.data.no_reg) {
        const generatedNoReg = responseData.data.no_reg;
        const generatedNoSurat = responseData.data.no_surat;
        const newItem = {
          ...formData,
          no_reg: generatedNoReg,
          no_surat: generatedNoSurat,
        };
        try {
          await addNotification({
            message: `Layanan #${generatedNoReg}`,
            no_surat: `${generatedNoSurat}`,
            perihal: formData.perihal,
            type: "pelayanan",
          });
        } catch (notificationError) {
          console.error("Gagal menambahkan notifikasi:", notificationError);
        }

        MySwal.fire({
          title: "Layanan Berhasil Diproses!",
          html: `
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
              <span style="font-family: 'Poppins', sans-serif;">
                Nomor Registrasi anda: ${generatedNoReg}
              </span>
              <button 
                id="copyButton"
                style="margin-top: 10px; border: none; background: none; cursor: pointer;"
              >
                <i class="fas fa-copy"></i> Salin Nomor Registrasi
              </button>
              <button 
                id="exportPdfButton"
                style="margin-top: 10px; border: none; background-color: #4CAF50; color: white; padding: 5px 10px; cursor: pointer;"
              >
                <i class="fas fa-file-pdf"></i> Cetak Permohonan (PDF)
              </button>
            </div>
          `,
          icon: "success",
          confirmButtonText: "OK",
          didOpen: () => {
            document
              .getElementById("copyButton")
              .addEventListener("click", () => {
                navigator.clipboard
                  .writeText(generatedNoReg)
                  .then(() => {
                    MySwal.fire({
                      title: "Disalin!",
                      text: "Nomor Registrasi telah disalin ke clipboard.",
                      icon: "success",
                      confirmButtonText: "OK",
                    });
                  })
                  .catch((err) => {
                    MySwal.fire({
                      title: "Gagal!",
                      text: "Tidak dapat menyalin nomor registrasi.",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                  });
              });

            document
              .getElementById("exportPdfButton")
              .addEventListener("click", () => {
                handleExportPDF(newItem);
              });
          },
        });
      } else {
        console.error(
          "Nomor registrasi tidak ditemukan dalam respons:",
          responseData
        );
        setError("Nomor registrasi tidak ditemukan.");
      }

      setFormData({
        no_reg: "",
        nama_pelayanan: "",
        perihal: "",
        no_surat: "",
        tgl: "",
        nama_pemohon: "",
        alamat: "",
        no_hp: "",
        nama_pengirim: "",
        catatan: "",
        filename: [],
      });

      setSuccessMessage("Data berhasil disimpan!");
    } catch (error) {
      setError("Gagal menyimpan data: " + error.message);
    } finally {
      setLoading(false);
    }

    const handleExportPDF = async (item) => {
      if (!item) {
        console.error("Data item tidak tersedia untuk export PDF.");
        return;
      }
      const htmlTemplate = <PdfTemplate noReg={item.no_reg} data={item} />;
      const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);
      await exportpdf(htmlString, item.no_reg);
    };
  };
  const handleDelete = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      filename: prevData.filename.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="font-family">
      <Navbar />
      <Favicon />
      <div className="bg-green-600"></div>
      <div className="font-family">
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8 mt-2">
          <div className="w-full bg-white shadow-2xl rounded-xl px-8 py-10 mx-auto max-w-4xl">
            <h2 className="text-2xl font-extrabold tracking-wide text-center text-gray-900 mb-8 uppercase select-none">
              Buat Permohonan Layanan
            </h2>
            <form
              className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NOMOR REGISTRASI */}
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    NOMOR REGISTRASI
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_reg"
                    type="text"
                    placeholder="Nomor Registrasi"
                    onChange={handleChange}
                    readOnly
                    required
                  />
                </div>

                {/* Nama Layanan */}
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Nama Layanan
                  </label>
                  <select
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="nama_pelayanan"
                    value={formData.nama_pelayanan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Layanan</option>
                    {layananOptions.map((layanan) => (
                      <option key={layanan.id} value={layanan.name}>
                        {layanan.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Perihal */}
                <div className="md:col-span-2">
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Perihal
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="perihal"
                    type="text"
                    placeholder="Perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* No. Surat */}
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    NOMOR SURAT PERMOHONAN
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_surat"
                    type="text"
                    placeholder="Nomor Surat"
                    value={formData.no_surat}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Tanggal Surat Permohonan
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="tgl"
                    type="date"
                    value={formData.tgl}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Nama Pemohon dan Nomor HP */}
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Nama Pemohon
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="nama_pemohon"
                    type="text"
                    placeholder="Nama Pemohon"
                    value={formData.nama_pemohon}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Nomor Handphone
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_hp"
                    type="tel"
                    placeholder="Nomor HP"
                    value={formData.no_hp}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Alamat dan Nama Pengirim */}
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Alamat
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="alamat"
                    type="text"
                    placeholder="Alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Nama Pengirim
                  </label>
                  <input
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="nama_pengirim"
                    type="text"
                    placeholder="Nama Pengirim"
                    value={formData.nama_pengirim}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                    htmlFor="filename"
                  >
                    UPLOAD BERKAS PERSYARATAN (PDF)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                    name="filename"
                    type="file"
                    onChange={handleChange}
                    accept=".pdf"
                    multiple
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.filename.length > 0
                      ? `${formData.filename.length} file(s) uploaded`
                      : "No files uploaded yet."}
                  </p>

                  {formData.filename && formData.filename.length > 0 && (
                    <div className="overflow-x-auto mt-4">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left text-xs font-bold">
                              No
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-bold">
                              File Name
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-bold">
                              Size (KB)
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-bold">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.filename.map((file, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2 text-xs">{index + 1}</td>
                              <td className="px-4 py-2 text-xs">{file.name}</td>
                              <td className="px-4 py-2 text-xs">
                                {(file.size / 1024).toFixed(2)} KB
                              </td>
                              <td className="px-4 py-2 text-xs">
                                <button
                                  onClick={() => handleDelete(index)}
                                  className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded"
                                >
                                  <i className="fa fa-times text-sm"></i>{" "}
                                  {/* Icon X */}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    Catatan
                  </label>
                  <textarea
                    className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="catatan"
                    value={formData.catatan}
                    onChange={handleChange}
                    placeholder="Catatan"
                  />
                </div>
              </div>
              <div className="mt-6 justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layanan;
