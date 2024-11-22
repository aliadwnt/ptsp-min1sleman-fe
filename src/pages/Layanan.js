import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { createDaftarPelayanan } from "../services/layananService";
import { fetchJenisLayanan } from "../services/jenisLayananService";
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
    document.title = "PTSP MIN 1 SLEMAN - Layanan";
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "filename") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      let uploadedFileUrl = "";

      if (formData.filename && formData.filename instanceof File) {
        uploadedFileUrl = await uploadSingle(formData.filename);
      }

      const dataToSend = {
        ...formData,
        filename: uploadedFileUrl,
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

        const copyToClipboard = (text) => {
          navigator.clipboard
            .writeText(text)
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
        };
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
            // Event listener untuk menyalin nomor registrasi
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
        filename: null,
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
  return (
    <div className="font-family">
      <Navbar />
      <Favicon />
      <div className="bg-blue-600"></div>
      <div className="font-family">
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8 mt-5">
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-6xl">
            <h2 className="ml-8 mt-6 mb-3 text-xl font-bold leading-tight text-center text-gray-800 h-10">
              BUAT PERMOHONAN LAYANAN
            </h2>
            <form
              className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap -mx-3 mb-1">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="no_reg"
                  >
                    NOMOR REGISTRASI
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_reg"
                    type="text"
                    placeholder="Nomor Registrasi"
                    value={formData.no_reg}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="nama_pelayanan"
                  >
                    NAMA LAYANAN
                  </label>
                  <select
                    className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 pr-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
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
              </div>

              <div className="w-full md:w-1/1 mb-3 p-1 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="perihal"
                >
                  PERIHAL
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                  name="perihal"
                  type="text"
                  placeholder="Perihal"
                  value={formData.perihal}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="no_surat"
                  >
                    NOMOR SURAT PERMOHONAN
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_surat"
                    type="text"
                    placeholder="Nomor Surat"
                    value={formData.no_surat}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="tgl"
                  >
                    TANGGAL SURAT PERMOHONAN
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="tgl"
                    type="date"
                    value={formData.tgl}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="nama_pemohon"
                  >
                    NAMA PEMOHON
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                    name="nama_pemohon"
                    type="text"
                    placeholder="Nama Pemohon"
                    value={formData.nama_pemohon}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="no_hp"
                  >
                    NO HP PEMOHON
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                    name="no_hp"
                    type="tel"
                    placeholder="Nomor HP"
                    value={formData.no_hp}
                    onChange={handleChange}
                    required
                    pattern="^[0-9]{10,}$"
                    minLength="10"
                    onInvalid={(e) => {
                      e.preventDefault();
                      alert("Nomor HP harus berupa angka dan minimal 10 digit");
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="alamat"
                  >
                    ALAMAT
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                    name="alamat"
                    type="text"
                    placeholder="Alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="nama_pengirim"
                  >
                    NAMA PENGIRIM
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                    name="nama_pengirim"
                    type="text"
                    placeholder="Nama Pengirim"
                    value={formData.nama_pengirim}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full md:w-1/1 mb-6 p-1 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="filename"
                >
                  UPLOAD BERKAS PERSYARATAN (PDF)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                  name="filename"
                  type="file"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/1 mb-6 p-1 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="catatan"
                >
                  CATATAN
                </label>
                <textarea
                  className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                  name="catatan"
                  placeholder="Catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                />
              </div>

              <div className="pl-3 flex items-center justify-end">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
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
