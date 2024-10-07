import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { createDaftarPelayanan, fetchNomorRegistrasi } from '../services/daftarPelayananService'; // Import fungsi create dari service
import { fetchJenisLayanan } from '../services/jenisLayananService'; // Import fungsi fetch dari service
import Swal from 'sweetalert2'; // SweetAlert untuk notifikasi
import withReactContent from 'sweetalert2-react-content'; // Menggunakan SweetAlert dengan React
import "../App"; // CSS untuk tampilan

const Layanan = () => {
  // State untuk form
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

  // State untuk pilihan jenis layanan
  const [layananOptions, setLayananOptions] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Fungsi untuk mengambil data jenis layanan
  const fetchData = async () => {
    try {
      const data = await fetchJenisLayanan(); // Mengambil data dari service
      if (Array.isArray(data)) {
        setLayananOptions(data);
      } else {
        throw new Error('Data is not an array');
      }
    } catch (error) {
      setError('Error fetching Jenis Layanan: ' + error.message);
      console.error('Error fetching Jenis Layanan:', error);
    }
  };

  // useEffect untuk memanggil fungsi fetchData saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk menangani perubahan input di form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'filename') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const MySwal = withReactContent(Swal); 

// Layanan.js
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccessMessage('');
  setLoading(true); 

  try {
    // Membuat form data untuk dikirim
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

    // Mengirim data ke server dan ambil no_reg dari respons
    const responseData = await createDaftarPelayanan(formDataToSend);

    // Ambil no_reg dari respons
    const generatedNoReg = responseData.no_reg;

    // Tampilkan SweetAlert setelah berhasil submit
    MySwal.fire({
      title: 'Layanan Berhasil Diproses!',
      text: `Nomor Registrasi anda : ${generatedNoReg}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });

    setSuccessMessage('Data berhasil disimpan!');
    // Reset form setelah berhasil submit
    setFormData({
      no_reg: '', // Kosongkan no_reg jika tidak diisi manual
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
  } catch (error) {
    setError('Gagal menyimpan data: ' + error.message);
    console.error('Gagal menyimpan data:', error);
  } finally {
    setLoading(false);
  }

    try {
      // Membuat form data untuk dikirim
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

      // Mengirim data ke server
      await createDaftarPelayanan(formDataToSend);

      // Tampilkan SweetAlert setelah berhasil submit
      MySwal.fire({
        title: 'Layanan Berhasil Diproses!',
        text: `Nomor Registrasi anda : ${formData.no_reg}`,
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setSuccessMessage('Data berhasil disimpan!');
      setFormData({
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
    } catch (error) {
      setError('Gagal menyimpan data: ' + error.message);
      console.error('Gagal menyimpan data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar /> {/* Navbar component */}
      <div className="bg-blue-600"></div>
      <div className="BodyLayanan">
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="ml-8 mt-6 mb-10 font-poppins text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
              Buat Permohonan Layanan
            </h2>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-8">
              Cetak Bukti Permohonan
            </button>
          </div>

          {/* Error message */}
          {error && <div className="text-red-600">{error}</div>}
          {/* Success message */}
          {successMessage && <div className="text-green-600">{successMessage}</div>}

          {/* Form untuk input data layanan */}
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="no_reg">
                  Nomor Registrasi
                </label>
                <input
  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  name="no_reg"
  type="text"
  placeholder="Nomor Registrasi"
  value={formData.no_reg}
  onChange={handleChange}  // Ini untuk memastikan formData akan terupdate
  required
  readOnly  // Jika memang readonly sesuai dengan case
/>

              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama_pelayanan">
                  Nama Layanan
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

            {/* Input untuk perihal */}
            <div className="w-1/1 md-full px-3 mb-6 md:mb-0">
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

            {/* Input untuk nomor surat dan tanggal */}
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
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tgl">
                  Tanggal Surat Permohonan
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

            {/* Input untuk nama pemohon */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
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

            {/* Tombol submit */}
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading} // Tombol disabled saat loading
              >
                {loading ? 'Loading...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
};

export default Layanan;
