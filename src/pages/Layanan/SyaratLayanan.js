import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import "../../App.css";

const SyaratLayanan = ({
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
    const [selectedOption, setSelectedOption] = useState('option1');

    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Layanan`;
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin mau di hapus?')) {
            console.log('Delete ID:', id);
            // Logika penghapusan data dapat ditambahkan di sini
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar className="w-64" />
            
            {/* Main content */}
            <div className="flex-1">
                <Header />
                
                <div className="bodyadmin p-6">
                    <div className="text-2xl font-bold mb-6">Daftar Syarat Layanan</div>

                    {/* Success message */}
                    {message && (
                        <div className="p-4 mb-6 text-sm text-green-800 bg-green-50 rounded-lg">
                            <span className="font-medium">Sukses: </span>{message}
                        </div>
                    )}

                   {/* Search and filter options */}
<div className="flex items-center mb-6">
    <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center">
        <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            required
        />
       <button 
    type="submit" 
    className="ml-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200">
    <i className="fas fa-search"></i>
</button>

    </form>

    {/* Dropdown options */}
    <div className="ml-4 flex-shrink-0">
        <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="ml-2 w-40 h-10 flex items-center justify-center bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-colors duration-200"
        >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
    </div>
</div>

                    {/* Table displaying data */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Pengolah</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Layanan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dataPelayanan.length > 0 ? (
                                    dataPelayanan.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-100">
                                            <td className="px-4 py-4 text-sm font-medium text-center text-gray-900">{index + 1}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{item.unit_pengolah}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{item.nama_layanan}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    item.status === 'Baru' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'Proses' ? 'bg-blue-100 text-blue-700' :
                                                    item.status === 'Selesai' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center text-sm">
                                                <button 
                                                    onClick={() => handleDelete(item.id)} 
                                                    className="text-red-600 hover:text-red-500 transition-colors duration-200">
                                                    <i className="fas fa-trash" aria-hidden="true"></i>
                                                    <span className="sr-only">Hapus</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
    );
};

export default SyaratLayanan;
