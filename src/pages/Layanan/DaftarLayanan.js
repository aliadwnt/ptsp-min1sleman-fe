import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import {
    fetchLayanan,
    createLayanan,
    updateLayanan,
    deleteLayanan
} from '../../services/layanan.service';
import "../../App.css";

const DaftarLayanan = () => {
    const [dataPelayanan, setDataPelayanan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentLayanan, setCurrentLayanan] = useState({
        no_reg: '',
        nama_pelayanan: '',
        perihal: '',
        kelengkapan: '',
        status: ''
    });

    useEffect(() => {
        document.title = `PTSP MAN 1 YOGYAKARTA - Daftar Pelayanan`;
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await fetchLayanan(); 
            console.log('Fetched data:', data); // Log data for debugging
            if (Array.isArray(data)) {
                setDataPelayanan(data); 
                setErrorMessage(''); 
            } else {
                throw new Error('Data format is incorrect');
            }
        } catch (error) {
            console.error('Error fetching layanan:', error);
            setErrorMessage('Gagal memuat data. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin mau dihapus?')) {
            try {
                await deleteLayanan(id);
                setMessage('Data berhasil dihapus');
                fetchData();
            } catch (error) {
                console.error('Failed to delete data:', error);
                setErrorMessage('Gagal menghapus data. Silakan coba lagi.');
            }
        }
    };

    const handleAdd = () => {
        setCurrentLayanan({
            no_reg: '',
            nama_pelayanan: '',
            perihal: '',
            kelengkapan: '',
            status: ''
        });
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        // Set the current layanan to be edited
        setCurrentLayanan(item);
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentLayanan.id) {
                await updateLayanan(currentLayanan.id, currentLayanan);
                setMessage('Data berhasil diupdate');
            } else {
                await createLayanan(currentLayanan);
                setMessage('Data berhasil ditambahkan');
            }
            setModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Failed to save data:', error);
            setErrorMessage('Gagal menyimpan data. Silakan coba lagi.');
        }
    };

    const filteredData = dataPelayanan.filter(item => {
        return (
            item.no_reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nama_pelayanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.perihal.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentLayanan(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Header />
                <div className='bodyadmin'>
                    <div className="texttitle">Daftar Layanan Publik</div>

                    {message && (
                        <div className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                            <span className="font-medium">Sukses </span>{message}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="p-4 m-8 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">Error </span>{errorMessage}
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

                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Registrasi</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Layanan</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perihal</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelengkapan</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredData.length > 0 ? (
                                                    filteredData.map((item, index) => {
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
                                                                <td className="px-1 py-3 text-xs font-medium text-center text-gray-900">{index + 1}</td>
                                                                <td className="px-1 py-3 text-xs text-gray-900">{item.no_reg}</td>
                                                                <td className="px-1 py-3 text-xs text-gray-900">{item.nama_pelayanan}</td>
                                                                <td className="px-1 py-3 text-xs text-gray-900">{item.perihal}</td>
                                                                <td className="px-1 py-3 text-xs text-gray-900">{item.kelengkapan}</td>
                                                                <td className="px-1 py-3 text-xs text-center text-gray-900">{statusIcon}</td>
                                                                <td className="px-1 py-3 text-xs text-center">
                                                                    <button onClick={() => handleEdit(item)} className="mr-2 text-blue-600 hover:text-blue-900">
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                                                        <i className="fas fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">Data tidak ditemukan.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DaftarLayanan;
