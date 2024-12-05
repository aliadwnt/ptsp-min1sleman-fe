import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import { createDaftarPelayanan } from "../../../services/daftarPelayananService";
import { fetchJenisLayanan } from "../../../services/jenisLayananService";
import { uploadSingle } from "../../../services/uploadService";
import LoadingPage from "../../../components/loadingPage";
import Favicon from "../../../components/Favicon";
import { motion } from 'framer-motion'; 

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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJenisLayanan();
        if (Array.isArray(data)) {
          setLayananOptions(data);
          setIsLoading(false);
        } else {
          throw new Error("Data is not an array");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error fetching Jenis Layanan: " + error.message);
        console.error("Error fetching Jenis Layanan:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    setIsLoading(false);
  };

  const DetailModal = ({ isOpen, onClose, data, isSaving }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => {
          onClose(); 
          navigate('/layanan/daftar-pelayanan'); 
        }, 1000);
  
        return () => clearTimeout(timer);
      }
    }, [isOpen, onClose, navigate]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.h3
            className="text-xl font-semibold text-gray-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rincian Data
          </motion.h3>
  
          <p><strong className="text-green-700">Perihal:</strong> {data.perihal}</p>
          <p><strong className="text-green-700">Nama Pemohon:</strong> {data.nama_pemohon}</p>
          <p><strong className="text-green-700">Nomor Handphone:</strong> {data.no_hp}</p>
          <p><strong className="text-green-700">Alamat:</strong> {data.alamat}</p>
          <p><strong className="text-green-700">Nama Pengirim:</strong> {data.nama_pengirim}</p>
          <p><strong className="text-green-700">Catatan:</strong> {data.catatan}</p>
  
          <div className="mt-6 flex justify-center items-center space-x-4">
            {isSaving ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 border-4 border-green-500 rounded-full border-t-transparent animate-spin"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                ></motion.div>
                <motion.p
                  className="text-gray-700 text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Menyimpan pelayanan baru ke daftar pelayanan...
                </motion.p>
              </div>
            ) : (
              <motion.p
                className="text-gray-700 text-lg font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Data Berhasil Disimpan!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    );
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
      const response = await createDaftarPelayanan(dataToSend);
      if (response && response.data) {
        setSubmittedData(response.data);
        setIsDetailModalOpen(true);
      }
    } catch (error) {
      setError("Gagal menyimpan data: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleConfirm = () => {
    setIsDetailModalOpen(false);
    alert("Data berhasil ditambahkan!");
  };
  
  const handleCloseModal = () => {
    setIsDetailModalOpen(false); 
  };
  
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 m-0 flex relative">
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
        <div className="py-10 space-y-2 sm:py-8 sm:space-y-8">
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-4xl">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-poppins font-semibold mb-6 text-gray-700 text-center">
                Tambah Daftar Pelayanan
              </h2>
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

                {/* No. Surat dan Tanggal */}
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

                {/* File Upload */}
                <div className="md:col-span-2">
                  <label className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                    File Lampiran
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="file"
                    name="filename"
                    onChange={handleChange}
                    accept=".pdf,.docx,.jpg,.png"
                  />
                </div>

                {/* Catatan */}
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
              <div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700 transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
              <DetailModal 
                isOpen={isDetailModalOpen} 
                onClose={handleCloseModal} 
                data={submittedData} 
                onConfirm={handleConfirm} 
              />
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
