import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import { fetchDaftarPelayananById, updateDaftarPelayanan } from '../../../services/daftarPelayananService'; 
import { fetchJenisLayanan } from '../../../services/jenisLayananService'; 
import { uploadSingle } from '../../../services/uploadService';
import "../../../App";

const LayananUpdate = () => {
  const [formData, setFormData] = useState({
    no_reg: '',
    nama_pelayanan: '',
    perihal: '',
    no_surat: '',
    tgl: '',
    nama_pemohon: '',
    alamat: '',
    no_hp: '',
    nama_pengirim: '',
    catatan: '',
    filename: [],
  });
  
  const [layananOptions, setLayananOptions] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID layanan dari URL
  
  // Fetch data layanan berdasarkan ID
  const fetchLayanan = async () => {
    try {
      const layanan = await fetchDaftarPelayananById(id); // Fetch layanan by ID
      if (layanan) {
        setFormData(layanan);
      } else {
        throw new Error('Data layanan tidak ditemukan');
      }
    } catch (error) {
      setError('Error fetching layanan: ' + error.message);
      console.error('Error fetching layanan:', error);
    }
  };

  const fetchJenisLayananData = async () => {
    try {
      const data = await fetchJenisLayanan();
      if (Array.isArray(data)) {
        setLayananOptions(data);
      } else {
        throw new Error('Data jenis layanan is not an array');
      }
    } catch (error) {
      setError('Error fetching Jenis Layanan: ' + error.message);
      console.error('Error fetching Jenis Layanan:', error);
    }
  };
  
  useEffect(() => {
    fetchLayanan(); // Fetch data layanan untuk update
    fetchJenisLayananData(); // Fetch data jenis layanan
  }, [id]); // Jalankan fetch ketika komponen mount atau `id` berubah
  
  const handleChange = (e) => {
    
    const { name, value, files } = e.target;
    if (name === 'filename') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          for (const file of formData[key]) {
            formDataToSend.append(key, file);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      await updateDaftarPelayanan(id, formDataToSend); // Update layanan by ID
      setSuccessMessage('Data berhasil diperbarui!');
      
      // Redirect ke halaman /layanan/daftar-layanan setelah sukses
      navigate('/layanan/daftar-pelayanan');
      
    } catch (error) {
      setError('Gagal memperbarui data: ' + error.message);
      console.error('Gagal memperbarui data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-600"></div>
      <div className="BodyLayanan">
        <Header />
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
          <h2 className="ml-8 mt-6 mb-10 font-poppins text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Update Permohonan Layanan
          </h2>
          {error && <div className="text-red-600">{error}</div>} 
          {successMessage && <div className="text-green-600">{successMessage}</div>} 
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama_pelayanan">
                  Nomor Registrasi
                </label>
          <input
  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  name="no_reg"
  type="text"
  placeholder="Nomor Registrasi"
  value={formData.no_reg}
  onChange={handleChange}
  readOnly // Make the input read-only
  required
/>

            </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama_pelayanan">
                  Nama Layanan
                </label>
                <select
  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  name="nama_pelayanan"
  value={formData.nama_pelayanan} // Pastikan ini sesuai
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
              <div className="w-full md-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="perihal">
                Perihal
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="perihal"
                type="text"
                placeholder="Perihal"
                value={formData.perihal}
                onChange={handleChange}
                required
              />
            </div>

            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="no_surat">
                  No. Surat Permohonan
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_surat"
                  type="text"
                  placeholder="Nomor Surat"
                  value={formData.no_surat}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tgl">
                  Tanggal
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
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama_pemohon">
                  Nama Pemohon
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="nama_pemohon"
                  type="text"
                  placeholder="Nama Pemohon"
                  value={formData.nama_pemohon}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="no_hp">
                  Nomor Handphone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_hp"
                  type="tel"
                  placeholder="Nomor HP"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alamat">
                  Alamat
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="alamat"
                  type="text"
                  placeholder="Alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama_pengirim">
                  Nama Pengirim
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="nama_pengirim"
                  type="text"
                  placeholder="Nama Pengirim"
                  value={formData.nama_pengirim}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="kelengkapan">
      Kelengkapan Surat
    </label>
    <select
      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
      Status Pelayanan
    </label>
    <select
      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="catatan">
                  Catatan
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="catatan"
                  placeholder="Catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="filename">
                  Upload File
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="filename"
                  type="file"
                  onChange={handleChange}
                  multiple
                  // required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading} 
              >
                {loading ? 'Loading...' : 'Perbarui'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LayananUpdate;
