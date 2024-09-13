import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import "../../App.css";

const DaftarDisposisi = ({
    dataPelayanan = [],
    countAll,
    countBaru,
    countProses,
    countSelesai,
    countAmbil,
    user
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Disposisi`;
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin mau di hapus?')) {
            console.log('Delete ID:', id);
        }
    };

    const handleAdd = () => {
        console.log('Add new item');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div className="p-6">
                    <div className="texttitle text-2xl font-bold mb-4">
                        Daftar Disposisi
                    </div>

                    {message && (
                        <div className="p-4 mb-6 text-sm text-green-800 bg-green-50 rounded-lg">
                            <span className="font-medium">Sukses: </span>{message}
                        </div>
                    )}
                    <div className="flex items-center justify-between space-x-2 mb-4">
                        <form onSubmit={handleSearch} className="flex flex-grow">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search..."
                                required
                            />
                            <button 
                                type="submit" 
                                className="ml-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <button onClick={handleAdd} className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700">
                            <i className="fas fa-plus mr-2"></i>Tambah
                        </button>
                    </div>
                    <div className="flex flex-col mt-6 mx-auto max-w-7xl">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    No
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Waktu Masuk
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Perihal
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Pengirim
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Penerima
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Disposisi Masuk
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Disposisi Keluar
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Diteruskan Kepada
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {dataPelayanan.length > 0 ? (
                                                dataPelayanan.map((item, index) => (
                                                    <tr key={item.id}> {/* Use item.id as the key */}
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.status}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.waktu_masuk}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.perihal}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.pengirim}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.penerima}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.disposisi_masuk}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.disposisi_keluar}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center text-gray-900">
                                                            {item.diteruskan_kepada}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-center">
                                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-500 transition-colors duration-200">
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No data available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaftarDisposisi;
