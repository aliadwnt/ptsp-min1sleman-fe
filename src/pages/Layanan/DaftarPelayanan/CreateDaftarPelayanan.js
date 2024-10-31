import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import { createDaftarPelayanan } from "../../../services/daftarPelayananService";
import { fetchJenisLayanan } from "../../../services/jenisLayananService";
import { uploadSingle } from "../../../services/uploadService";
import "../../../App";

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
    filename: "",
  });

  const [layananOptions, setLayananOptions] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
      await createDaftarPelayanan(dataToSend);
      setSuccessMessage("Data berhasil disimpan!");
      navigate("/layanan/daftar-pelayanan");
    } catch (error) {
      setError("Gagal menyimpan data: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen bg-gray-100 pb-0 m-0een bg-gray-200 pb-0 m-0 flex relative">
      {/* Sidebar */}
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
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
          <h2 className="ml-8 mt-6 mb-10 font-poppins text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Tambah Daftar Pelayanan
          </h2>
          {error && <div className="text-red-600">{error}</div>}
          {successMessage && (
            <div className="text-green-600">{successMessage}</div>
          )}
          <form
            className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NOMOR REGISTRASI */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  NOMOR REGISTRASI
                </label>
                <input
                  className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_reg"
                  type="text"
                  placeholder="Nomor Registrasi"
                  value={formData.no_reg}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </div>

              {/* Nama Layanan */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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

              {/* No. Surat dan Tanggal */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  No. Surat Permohonan
                </label>
                <input
                  className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_surat"
                  type="text"
                  placeholder="Nomor Surat"
                  value={formData.no_surat}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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
                <label className="block text-gray-700 text-sm font-semibold mb-2">
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

              {/* Catatan dan Upload File */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Catatan
                </label>
                <textarea
                  className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  name="catatan"
                  placeholder="Catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Upload File
                </label>
                <input
                  className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  name="filename"
                  type="file"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex items-center justify-between mt-6">
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
  );
};

export default Layanan;
