import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import {
    fetchMasterDisposisi,
    createMasterDisposisi,
    updateMasterDisposisi,
    deleteMasterDisposisi
} from '../../services/masterdisposisi.service';
import "../../App.css";

const MasterDisposisi = () => {
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [currentDisposisi, setCurrentDisposisi] = useState(null);

    
    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Master Disposisi`;
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchMasterDisposisi(); // Ambil data dari API
            console.log('Fetched Master Disposisi:', data); // Log data yang diterima
            setDataPelayanan(data); // Simpan data ke state
        } catch (error) {
            console.error('Error fetching master disposisi:', error);
            setMessage('Gagal memuat data. Silakan coba lagi.'); // Set pesan kesalahan
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin mau dihapus?')) {
            try {
                await deleteMasterDisposisi(id);
                setMessage('Data berhasil dihapus');
                fetchData();
            } catch (error) {
                console.error('Failed to delete data:', error);
                setMessage('Failed to delete data');
            }
        }
    };

    const handleAdd = () => {
        setCurrentDisposisi(null);
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { status } = e.target.elements;

        const disposisi = {
            status: status.value
        };

        try {
            if (currentDisposisi) {
                await updateMasterDisposisi(currentDisposisi.id, disposisi);
                setMessage('Data berhasil diupdate');
            } else {
                await createMasterDisposisi(disposisi);
                setMessage('Data berhasil ditambahkan');
            }
            setModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Failed to save data:', error);
            setMessage('Failed to save data');
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
                        <div className="p-4 mb-6 text-sm text-red-800 bg-red-50 rounded-lg">
                            <span className="font-medium">Error: </span>{message}
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
            <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {item.name} {/* Ubah item.status menjadi item.name */}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                    <button onClick={() => {
                        setCurrentDisposisi(item);
                        setModalOpen(true);
                    }} className="text-blue-600 hover:text-blue-500 transition-colors duration-200">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-500 transition-colors duration-200 ml-2">
                        <i className="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
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

                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded shadow-lg p-6 w-96">
                            <h2 className="text-lg font-semibold mb-4">{currentDisposisi ? 'Edit Disposisi' : 'Tambah Disposisi'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Master Disposisi</label>
                                    <input
                                        type="text"
                                        name="status"
                                        defaultValue={currentDisposisi ? currentDisposisi.status : ''}
                                        required
                                        className="border border-gray-300 rounded p-2 w-full"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-300 text-gray-800 rounded px-4 py-2 mr-2">
                                        Batal
                                    </button>
                                    <button type="submit" className="bg-green-600 text-white rounded px-4 py-2">
                                        {currentDisposisi ? 'Update' : 'Tambah'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MasterDisposisi;
