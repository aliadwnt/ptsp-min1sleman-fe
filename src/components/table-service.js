import React from 'react';

const TableService = () => {
    // Data for the table
    const services = [
        { id: 1, unit: 'Surat Tata Usaha', total: 1 },
        { id: 2, unit: 'Surat Rekomendasi', total: 2 },
        { id: 3, unit: 'Surat Izin Peminjaman Ruang', total: 3 },
        { id: 4, unit: 'Surat Osis', total: 4 },
        { id: 5, unit: 'Surat Izin Penelitian', total: 5 },
        { id: 6, unit: 'Surat Tugas Guru', total: 6 },
        { id: 7, unit: 'Surat Tugas Siswa', total: 7 },
    ];

    return (
        <div className="bg-white shadow rounded-lg w-full md:w-1/2 ml-3 p-4">
            <b>Tabel Pelayanan</b>
            <div className="overflow-x-auto sm:-mx-6">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-3 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                        No
                                    </th>
                                    <th className="px-3 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                                        Unit Pengolah
                                    </th>
                                    <th className="px-3 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                        Total Layanan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {services.map((service) => (
                                    <tr key={service.id}>
                                        <td className="px-3 py-4 text-sm text-center">
                                            {service.id}
                                        </td>
                                        <td className="px-3 py-4 text-sm">
                                            {service.unit}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-center">
                                            {service.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableService;
