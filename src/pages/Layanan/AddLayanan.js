import React from 'react';

const LayananModal = ({ isOpen, onClose, currentLayanan, onSubmit, handleChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">{currentLayanan.id ? 'Edit' : 'Tambah'} Layanan</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nomor Registrasi</label>
                        <input
                            type="text"
                            name="no_reg"
                            value={currentLayanan.no_reg}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama Layanan</label>
                        <input
                            type="text"
                            name="nama_pelayanan"
                            value={currentLayanan.nama_pelayanan}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Perihal</label>
                        <input
                            type="text"
                            name="perihal"
                            value={currentLayanan.perihal}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kelengkapan</label>
                        <input
                            type="text"
                            name="kelengkapan"
                            value={currentLayanan.kelengkapan}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={currentLayanan.status}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Baru">Baru</option>
                            <option value="Proses">Proses</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Ambil">Ambil</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="text-gray-600">Batal</button>
                        <button type="submit" className="bg-green-600 text-white rounded-md p-2 hover:bg-green-700">
                            {currentLayanan.id ? 'Update' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LayananModal;
