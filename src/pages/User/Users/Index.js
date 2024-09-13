import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';
import "../../../App.css";

const DaftarPeran = ({
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
        document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Pengguna`;
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
        <div className="flex min-h-screen">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div className="bodyadmin p-6">
                    {message && (
                        <div className="p-4 mb-6 text-sm text-green-800 bg-green-50 rounded-lg">
                            <span className="font-medium">Sukses: </span>{message}
                        </div>
                    )}

                    <div className="mb-6">
                        <h1 className="text-xl font-semibold mb-2">DAFTAR PENGGUNA</h1>
                        <h2 className="text-sm text-gray-600">Kelola Semua Pengguna</h2>
                    </div>

                    <div className="flex flex-col max-w-7xl mx-auto">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <div className="overflow-hidden border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nama Pengguna
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Peran
                                                </th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {dataPelayanan.length > 0 ? (
                                                dataPelayanan.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.nomor_registrasi}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.nama_layanan}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="text-red-600 hover:text-red-500 transition-colors duration-200"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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

export default DaftarPeran;
