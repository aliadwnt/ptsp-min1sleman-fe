import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import {
  fetchDaftarPelayananById,
  updateDaftarPelayanan,
} from "../../../services/daftarPelayananService";
import { fetchJenisLayanan } from "../../../services/jenisLayananService";
import { uploadSingle } from "../../../services/uploadService";
import "../../../App";
import LoadingPage from "../../../components/loadingPage";
import Favicon from "../../../components/Favicon";

const LayananUpdate = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const layanan = await fetchDaftarPelayananById(id);
      if (layanan) {
        setFormData(layanan);
      } else {
        throw new Error("Data layanan tidak ditemukan");
      }
    } catch (error) {
      setError("Error fetching layanan: " + error.message);
      console.error("Error fetching layanan:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJenisLayananData = async () => {
    setLoading(true);
    try {
      const data = await fetchJenisLayanan();
      if (Array.isArray(data)) {
        setLayananOptions(data);
      } else {
        throw new Error("Data jenis layanan is not an array");
      }
    } catch (error) {
      setError("Error fetching Jenis Layanan: " + error.message);
      console.error("Error fetching Jenis Layanan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLayanan();
    fetchJenisLayananData();
  }, [id]);

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

      await updateDaftarPelayanan(id, dataToSend);
      setSuccessMessage("Data berhasil diperbarui!");
      navigate("/layanan/daftar-pelayanan", {
        state: { message: "Data berhasil diperbarui!", isError: false },
      });
    } catch (error) {
      setError("Gagal memperbarui data: " + error.message);
      console.error("Gagal memperbarui data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "filename") {
      setFormData({ ...formData, [name]: files[0] });
      setIsLoading(false);
    } else {
      setFormData({ ...formData, [name]: value });
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen  bg-gray-50 pb-0 m-0een  m-0 flex relative">
      {loading && <LoadingPage />}
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
        <div className=" py-10 space-y-2 sm:py-8 sm:space-y-8">
          {error && <div className="text-red-600">{error}</div>}
          {successMessage && (
            <div className="text-green-600">{successMessage}</div>
          )}
          <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8  mx-auto max-w-5xl">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-poppins font-semibold mb-6 text-gray-700 text-center">
                Update Permohonan Pelayanan
              </h2>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="no_reg"
                  >
                    Nomor Registrasi
                  </label>
                  <input
                    className="w-full bmeg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_reg"
                    type="text"
                    placeholder="Nomor Registrasi"
                    value={formData.no_reg}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="nama_pelayanan"
                  >
                    Nama Layanan
                  </label>
                  <select
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
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
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="perihal"
                  >
                    Perihal
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="perihal"
                    type="text"
                    placeholder="Perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="no_surat"
                  >
                    Nomor Surat
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="no_surat"
                    type="text"
                    value={formData.no_surat}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="tgl"
                  >
                    Tanggal Surat Pemohon
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="tgl"
                    type="date"
                    value={formData.tgl}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="nama_pemhon"
                  >
                    Nama Pemohon
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="nama_pemohon"
                    type="text"
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
                    Nomor Handphone
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="tgl"
                    type="tel"
                    value={formData.no_hp}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="alamat"
                  >
                    Alamat
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="alamat"
                    type="text"
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
                    Nama Pengirim
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="nama_pengirim"
                    type="text"
                    value={formData.nama_pengirim}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="kelengkapan"
                  >
                    Kelengkapan Surat *
                  </label>
                  <select
                    className="w-full bg-gray-200 border border-red-400 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-red-500"
                    name="kelengkapan"
                    value={formData.kelengkapan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kelengkapan Surat</option>
                    <option value="Belum Lengkap">Belum Lengkap</option>
                    <option value="Sudah Lengkap">Sudah Lengkap</option>
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="status"
                  >
                    Status Pelayanan *
                  </label>
                  <select
                    className="w-full bg-gray-200 border border-red-400 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-red-500"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Status</option>
                    <option value="Baru">Baru</option>
                    <option value="Proses">Proses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Diambil">Diambil</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="filename"
                  >
                    File Lampiran
                  </label>
                  <input
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    type="file"
                    name="filename"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="catatan"
                  >
                    Catatan
                  </label>
                  <textarea
                    className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    name="perihal"
                    value={formData.catatan}
                    onChange={handleChange}
                    required
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
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
      {/* <Footer /> */}
    </div>
  );
};

export default LayananUpdate;
