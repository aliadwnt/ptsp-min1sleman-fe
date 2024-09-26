import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';

const FormPelayanan = ({ dataLayanan = [], onSubmit }) => {
  const [namaPelayanan, setNamaPelayanan] = useState('');
  const [perihal, setPerihal] = useState('');
  const [noSurat, setNoSurat] = useState('');
  const [tgl, setTgl] = useState('');
  const [namaPemohon, setNamaPemohon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noHp, setNoHp] = useState('');
  const [namaPengirim, setNamaPengirim] = useState('');
  const [catatan, setCatatan] = useState('');
  const [filename, setFilename] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama_pelayanan', namaPelayanan);
    formData.append('perihal', perihal);
    formData.append('no_surat', noSurat);
    formData.append('tgl', tgl);
    formData.append('nama_pemohon', namaPemohon);
    formData.append('alamat', alamat);
    formData.append('no_hp', noHp);
    formData.append('nama_pengirim', namaPengirim);
    formData.append('catatan', catatan);
    formData.append('filename', filename);

    onSubmit(formData); // Simpan atau kirim data
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mx-8 mt-4">
          Buat Pelayanan
        </h2>

        <div className="bg-white shadow rounded-lg mx-8 py-8">
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8" onSubmit={handleSubmit}>
            <div className="w-full mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nama Layanan
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
                value={namaPelayanan}
                onChange={(e) => setNamaPelayanan(e.target.value)}
              >
                <option>Pilih Nama Layanan</option>
                {dataLayanan.length > 0 ? (
                  dataLayanan.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Tidak ada layanan tersedia</option>
                )}
              </select>
            </div>

            <div className="w-full mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Perihal
              </label>
              <input
                className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                value={perihal}
                onChange={(e) => setPerihal(e.target.value)}
                type="text"
                placeholder="Perihal"
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  No. Surat Permohonan
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={noSurat}
                  onChange={(e) => setNoSurat(e.target.value)}
                  type="text"
                  placeholder="Nomor Surat"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Tanggal Surat Permohonan
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={tgl}
                  onChange={(e) => setTgl(e.target.value)}
                  type="date"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nama Pemohon
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={namaPemohon}
                  onChange={(e) => setNamaPemohon(e.target.value)}
                  type="text"
                  placeholder="Nama Pemohon"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Alamat Pemohon
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  type="text"
                  placeholder="Alamat"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  No. HP Pemohon
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  type="number"
                  placeholder="Nomor HP Pemohon"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nama Pengirim
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={namaPengirim}
                  onChange={(e) => setNamaPengirim(e.target.value)}
                  type="text"
                  placeholder="Nama Pengirim"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Catatan
                </label>
                <textarea
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Catatan"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Upload Berkas (pdf)
                </label>
                <input
                  className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
                  onChange={(e) => setFilename(e.target.files[0])}
                  type="file"
                  accept=".pdf"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigate('/layanan/list-layanan')}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-2"
              >
                Batal
              </button>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-4 py-2">
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPelayanan;
