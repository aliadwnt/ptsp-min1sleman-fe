import React, { useEffect, useState } from 'react';
import { fetchUnitPengolah } from '../services/unitPengolahService';
import { fetchDaftarLayanan } from '../services/daftarLayananService';

const TableService = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const unitPengolahData = await fetchUnitPengolah();
                const daftarLayananData = await fetchDaftarLayanan();

                const servicesWithTotals = unitPengolahData.map((unit, index) => {
                    const total = daftarLayananData.filter(item => item.unit === unit.name).length;
                    return {
                        id: index + 1,
                        unit: unit.name,
                        total: total
                    };
                });

                setServices(servicesWithTotals);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    return (
        <div className="bg-white shadow rounded-lg w-full p-4 mx-2"> {/* Padding ditambah untuk lebih rapi */}
            <b className="text-lg">Tabel Pelayanan</b>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400"> {/* Padding lebih besar */}
                                        No
                                    </th>
                                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                                        Unit Pengolah
                                    </th>
                                    <th className="px-4 py-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                        Total Layanan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {services.map((service) => (
                                    <tr key={service.id}>
                                        <td className="px-4 py-2 text-sm text-center">{service.id}</td> {/* Padding di kolom data ditingkatkan */}
                                        <td className="px-4 py-2 text-sm">{service.unit}</td>
                                        <td className="px-4 py-2 text-sm text-center">{service.total}</td>
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
