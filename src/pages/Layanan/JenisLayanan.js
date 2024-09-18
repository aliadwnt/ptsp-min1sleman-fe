import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import "../../App.css";
import {
    fetchJenisLayanan,
    createJenisLayanan,
    updateJenisLayanan,
    deleteJenisLayanan
} from '../../services/jenislayanan.service';

const JenisLayanan = ({
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [message, setMessage] = useState('');
    const [newLayanan, setNewLayanan] = useState('');
    const [editLayanan, setEditLayanan] = useState(null);

    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Jenis Layanan`;
        loadData(); // Load data on mount
    }, []);

    const loadData = async () => {
        try {
            const result = await fetchJenisLayanan();
            setDataPelayanan(result); // Set the fetched data to state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // Implement search logic if necessary
    };

    const handleAdd = async () => {
        if (!newLayanan) return; // Prevent empty submissions
        try {
            const createdLayanan = await createJenisLayanan({ name: newLayanan });
            setDataPelayanan((prev) => [...prev, createdLayanan]);
            setMessage('Jenis layanan berhasil ditambahkan.');
            setNewLayanan(''); // Clear the input field
        } catch (error) {
            console.error('Error adding jenis layanan:', error);
            setMessage('Gagal menambahkan jenis layanan.');
        }
    };

    const handleEdit = async (id) => {
        if (!editLayanan) return; // Prevent empty submissions
        try {
            const updatedLayanan = await updateJenisLayanan(id, { name: editLayanan });
            setDataPelayanan((prev) => prev.map(item => (item.id === id ? updatedLayanan : item)));
            setMessage('Jenis layanan berhasil diperbarui.');
            setEditLayanan(null); // Clear edit input
        } catch (error) {
            console.error('Error updating jenis layanan:', error);
            setMessage('Gagal memperbarui jenis layanan.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin mau dihapus?')) {
            try {
                await deleteJenisLayanan(id);
                setDataPelayanan((prev) => prev.filter(item => item.id !== id));
                setMessage('Jenis layanan berhasil dihapus.');
            } catch (error) {
                console.error('Error deleting jenis layanan:', error);
                setMessage('Gagal menghapus jenis layanan.');
            }
        }
    };

    return (
        <div className="flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div className='bodyadmin'>
                    <div className="texttitle">Jenis Layanan</div>

                    {message && (
                        <div className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                            <span className="font-medium">Sukses: </span>{message}
                        </div>
                    )}

                    <div className="flex items-center justify-between space-x-2 mb-4">
                        <form onSubmit={handleSearch} className="flex flex-grow">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
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
                        <div className="flex items-center">
                            <input 
                                type="text" 
                                value={newLayanan}
                                onChange={(e) => setNewLayanan(e.target.value)}
                                placeholder="Nama Jenis Layanan"
                                className="border rounded-lg p-2"
                            />
                            <button onClick={handleAdd} className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700 ml-2">
                                <i className="fas fa-plus mr-2"></i>Tambah
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col mt-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Layanan</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {dataPelayanan.length > 0 ? (
                                                dataPelayanan.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="px-3 py-4 text-sm font-medium text-center text-gray-900">{index + 1}</td>
                                                        <td className="px-3 py-4 text-sm text-gray-900">{item.name}</td>
                                                        <td className="px-3 py-4 text-sm font-medium text-center">
                                                            <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-500 transition-colors duration-200 rounded-lg">
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-500 transition-colors duration-200 rounded-lg ml-2">
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No data available</td>
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

export default JenisLayanan;
