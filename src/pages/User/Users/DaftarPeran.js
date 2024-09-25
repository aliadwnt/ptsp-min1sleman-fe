import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/sidebar';
import Header from '../../../components/header';
import "../../../App.css";

const DaftarPeran = ({
    dataPelayanan = [], 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Peran`;
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    const handleAdd = () => {
        console.log('Add new entry');
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin mau di hapus?')) {
            console.log('Delete ID:', id);
        }
    };

    return (
        <div className="bodyadmin flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div>
                    <div className="texttitle">
                        Daftar Peran
                    </div>

                    {message && (
                        <div className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium">Sukses </span>{message}
                        </div>
                    )}
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
  <form onSubmit={handleSearch} className="flex flex-grow justify-center">
    <input
      type="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-2/3 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search..."
      required
    />

              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
            <button
              onClick={handleAdd}
              className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
            >
              <i className="fas fa-plus mr-2"></i>Tambah
            </button>
            </form>
          </div>

                    <div className="flex flex-col mt-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pengguna</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {dataPelayanan.length > 0 ? (
                                                dataPelayanan.map((item, index) => {
                                                    let statusIcon;
                                                    switch (item.status) {
                                                        case 'Baru':
                                                            statusIcon = <i className="fas fa-file text-green-600"></i>;
                                                            break;
                                                        case 'Proses':
                                                            statusIcon = <i className="fas fa-check-circle text-blue-600"></i>;
                                                            break;
                                                        case 'Selesai':
                                                            statusIcon = <i className="fas fa-clock text-red-600"></i>;
                                                            break;
                                                        case 'Ambil':
                                                            statusIcon = <i className="fas fa-user-check text-yellow-500"></i>;
                                                            break;
                                                        default:
                                                            statusIcon = null;
                                                    }

                                                    return (
                                                        <tr key={item.id}> 
                                                            <td className="px-6 py-4 text-sm font-medium text-center text-gray-900 dark:text-white">{index + 1}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-400">{item.nama_pengguna}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-400">{item.peran}</td>
                                                            <td className="px-6 py-4 text-sm font-medium text-center">
                                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-500 transition-colors duration-200 rounded-lg">
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No data available</td>
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
