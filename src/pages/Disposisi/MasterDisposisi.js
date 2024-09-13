import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import "../../App.css";

const MasterDisposisi = ({
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
        document.title = `PTSP MAN 1 YOGYAKARTA - Master Disposisi`;
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
                        Master Disposisi
                    </div>

                    {message && (
                        <div className="p-4 mb-6 text-sm text-green-800 bg-green-50 rounded-lg">
                            <span className="font-medium">Sukses: </span>{message}
                        </div>
                    )}

<div className="flex items-center space-x-2">
                        <input
                            type="search"
                            id="default-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                        />
                        <button
                            type="submit"
                            className="p-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                        <button className="w-40 flex items-center justify-center bg-green-600 text-white rounded-lg py-2 hover:bg-green-700">
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
                                                    Master Disposisi
                                                </th>
                                                <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {dataPelayanan.length > 0 ? (
                                                dataPelayanan.map((item, index) => (
                                                    <tr key={index}>
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

export default MasterDisposisi;
