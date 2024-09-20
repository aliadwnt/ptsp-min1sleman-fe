import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const FormLayanan = () => {
    <Navbar/>
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'filename') {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div>
            <Navbar/>
      <div className="bg-blue-600">
        {/* Replace this with your navigation component */}
        {/* <MainNavigation /> */}
      </div>

      <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
        <div className="flex justify-between items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Buat Permohonan Layanan
          </h2>
          <button className="bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded">
            Cetak Bukti Permohonan
          </button>
        </div>
        <div className="bg-white shadow rounded-lg mx-8 py-8">
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="register">
                  No Registrasi
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_reg"
                  type="text"
                  placeholder="Nomor Registrasi"
                  value={formData.no_reg}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="layanan">
                  Nama Layanan
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="nama_pelayanan"
                  value={formData.nama_pelayanan}
                  onChange={handleChange}
                >
                  <option value="">Pilih Layanan</option>
                  <option value="Pelayanan dan Informasi Umum">Pelayanan dan Informasi Umum</option>
                  <option value="Permohonan Cuti">Permohonan Cuti</option>
                  <option value="Peminjaman Ruang">Peminjaman Ruang</option>
                  <option value="Permohonan Surat Tugas Guru">Permohonan Surat Tugas Guru</option>
                  <option value="Permohonan Surat Tugas Siswa">Permohonan Surat Tugas Siswa</option>
                </select>
              </div>
            </div>

            <div className="w-full mb-6">
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
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nomor">
                  No. Surat Permohonan
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_surat"
                  type="text"
                  placeholder="Nomor Surat"
                  value={formData.no_surat}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tanggal">
                  Tanggal Surat Permohonan
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="tgl"
                  type="date"
                  placeholder="Tanggal"
                  value={formData.tgl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nama">
                  Nama Pemohon
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="nama_pemohon"
                  type="text"
                  placeholder="Nama Pemohon"
                  value={formData.nama_pemohon}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alamat">
                  Alamat Pemohon
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="alamat"
                  type="text"
                  placeholder="Alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-2/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telp">
                  No. HP Pemohon
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="no_hp"
                  type="number"
                  placeholder="Nomor HP Pemohon"
                  value={formData.no_hp}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-2/4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pengirim">
                  Nama Pengirim
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="nama_pengirim"
                  type="text"
                  placeholder="Nama Pengirim"
                  value={formData.nama_pengirim}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="catatan">
                  Catatan
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="catatan"
                  placeholder="Catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="filename">
                  Upload Berkas (pdf)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="filename"
                  type="file"
                  placeholder="Upload Berkas"
                  onChange={handleChange}
                  multiple
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2"
                onClick={() => window.location.href = '/layanan'}
              >
                Batal
              </button>
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FormLayanan;
