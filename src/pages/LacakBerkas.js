import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../App'

const LacakBerkas = () => {
    const [noReg, setNoReg] = useState('');
    const [namaPelayanan, setNamaPelayanan] = useState('');
    const [perihal, setPerihal] = useState('');
    const [namaPemohon, setNamaPemohon] = useState('');
    const [alamat, setAlamat] = useState('');
    const [noHp, setNoHp] = useState('');
    const [namaPengirim, setNamaPengirim] = useState('');
    const [kelengkapan, setKelengkapan] = useState('');
    const [status, setStatus] = useState('');
    const [catatan, setCatatan] = useState('');
    const [arsipMasuk, setArsipMasuk] = useState(null);
    const [arsipKeluar, setArsipKeluar] = useState(null);

    // Dummy data for disposisi
    const disposisi = [
        { name: 'Abdul Qodir Jaelani, S.Ak | Petugas', status: '[mohon_arahan] | 23 Juni 2024 14:34:43' },
        { name: 'Intan Tri Rahmawati, S.I.Kom | Kepala Tata Usaha', status: '[mohon_diproses] | 23 Juni 2024 15:15:54' },
        { name: 'Firman Yudhistira Setiawan, M.Pd | Waka Sarpras', status: '[untuk_diproses] | 24 Juni 2024 09:23:46' },
        { name: 'Sheila Dara Fitriana, S.Pd | Staff', status: '[telah_diselesaikan] | 24 Juni 2024 10:21:56' },
    ];

    // Handlers for actions
    const handleSearch = () => {
    };

    const handleLoadArsip = () => {
    };

    return (
        <div className='font-poppins'>
            <Navbar/>
            <div className='BodyLacakBerkas'>
            <div className="bg-blue-600">
            </div>
            <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
                <div className="max-w-7xl mx-auto bg-white p-7 rounded-lg shadow-lg">
                    {/* Search Bar */}
                    <div className="mb-6 flex">
                        <input
                            type="text"
                            value={noReg}
                            onChange={(e) => setNoReg(e.target.value)}
                            placeholder="Masukkan Nomor Registrasi"
                            className="w-full p-2 border rounded-lg"
                        />
                        <button
                            onClick={handleSearch}
                            className="mx-3 w-1/2 bg-blue-500 text-white py-2 rounded-lg"
                        >
                            Cari
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column */}
                        <div className="w-full md:w-2/3 bg-white-100 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-3 p-3 bg-blue-100">
                                <div className="flex items-center">
                                    {/* SVG Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                        <path d="M15 2.375C13.8188 2.375 12.9844 3.20937 12.5719 4.25H4.6875V27.6875H25.3125V4.25H17.4281C17.0156 3.20937 16.1812 2.375 15 2.375ZM15 4.25C15.5156 4.25 15.9375 4.67188 15.9375 5.1875V6.125H18.75V8H11.25V6.125H14.0625V5.1875C14.0625 4.67188 14.4844 4.25 15 4.25ZM6.5625 6.125H9.375V9.875H20.625V6.125H23.4375V25.8125H6.5625V6.125ZM8.4375 12.6875V14.5625H10.3125V12.6875H8.4375ZM12.1875 12.6875V14.5625H21.5625V12.6875H12.1875ZM8.4375 16.4375V18.3125H10.3125V16.4375H8.4375ZM12.1875 16.4375V18.3125H21.5625V16.4375H12.1875ZM8.4375 20.1875V22.0625H10.3125V20.1875H8.4375ZM12.1875 20.1875V22.0625H21.5625V20.1875H12.1875Z" fill="#1D8BE5" />
                                    </svg>
                                    <span className="text-blue-500 title mx-2">Lacak Permohonan Layanan</span>
                                </div>
                            </h2>
                            <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white-300">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="register">
                                            No Registrasi
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={noReg}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="layanan">
                                            Nama Layanan
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={namaPelayanan}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="w-full mb-6">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="perihal">
                                        Perihal
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={perihal}
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pemohon">
                                            Nama Pemohon
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={namaPemohon}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alamat">
                                            Alamat
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={alamat}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                                            No HP
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={noHp}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pengirim">
                                            Nama Pengirim
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={namaPengirim}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="kelengkapan">
                                            Kelengkapan
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={kelengkapan}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                            Status
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={status}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="w-full mb-6">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="catatan">
                                        Catatan
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={catatan}
                                        readOnly
                                    />
                                </div>
                            </form>
                        </div>
                        {/* Right Column */}
                        <div className="w-full md:w-1/3 bg-white-100 p-4 rounded-lg shadow-lg">
                        <div className="mt-2">
                        <h2 className="text-xl font-bold mb-3 p-3 bg-blue-100">
                        <div className="flex items-center">
    {/* SVG Icon for History */}
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 1C7.16344 1 1 7.16344 1 15C1 22.8366 7.16344 29 15 29C22.8366 29 29 22.8366 29 15C29 7.16344 22.8366 1 15 1ZM15 27C8.373 27 3 21.627 3 15C3 8.373 8.373 3 15 3C21.627 3 27 8.373 27 15C27 21.627 21.627 27 15 27ZM15 7H17V15H10V13H15V7ZM15 21H17V19H15V21Z" fill="#1D8BE5"/>
    </svg>
    <span className="text-blue-500 title mx-2">Riwayat Disposisi</span>
</div>

                            </h2>
                        <table className="min-w-full bg-white">
                            <thead>
                            <h1> INI ADALAH DATA DUMMY!!!</h1>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Nama</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {disposisi.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-3 px-4 text-xs">{item.name}</td>
                                        <td className="py-3 px-4 text-xs">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3 w-full md:w-3/3 bg-white-100 p-4 rounded-lg shadow-lg">
                    <div className="mt-1 flex items-center">
                    <h3 className="text-xl font-bold mb-3 p-3 bg-blue-100">
                        <div className="flex items-center">
    {/* SVG Icon for History */}
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M5 7H25V5H5V7ZM5 15H25V13H5V15ZM5 23H25V21H5V23Z" fill="#1D8BE5"/>
    <circle cx="5" cy="6" r="2" fill="#1D8BE5"/>
    <circle cx="5" cy="14" r="2" fill="#1D8BE5"/>
    <circle cx="5" cy="22" r="2" fill="#1D8BE5"/>
</svg>

    <span className="text-blue-500 title mx-2">Arsip Pelayanan</span>
</div>

                            </h3>
</div>
<div className="flex flex-wrap">
    {/* Arsip Masuk */}
    <div className="w-full md:w-1/2 mt-1 px-2">
        <label className="text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Arsip Masuk
        </label>
        <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => document.getElementById('fileInputMasuk').click()}
        >
            Lihat Dokumen
        </button>
        <input
            id="fileInputMasuk"
            type="file"
            className="hidden"
            onChange={(e) => setArsipMasuk(e.target.files[0])}
        />
    </div>

    {/* Arsip Keluar */}
    <div className="w-full md:w-1/2 mt-1 md:mt-1 px-2">
        <label className="text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Arsip Keluar
        </label>
        <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => document.getElementById('fileInputKeluar').click()}
        >
            Lihat Dokumen
        </button>
        <input
            id="fileInputKeluar"
            type="file"
            className="hidden"
            onChange={(e) => setArsipKeluar(e.target.files[0])}
        />
    </div>
</div>

</div>

                    </div>
                </div>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default LacakBerkas;
