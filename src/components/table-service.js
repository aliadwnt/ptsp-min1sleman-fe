import React, { useEffect, useState } from 'react';
import { fetchUnitPengolah } from '../services/unitPengolahService'; // Pastikan path service benar

const TableService = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const getUnitPengolahData = async () => {
            try {
                const unitPengolahData = await fetchUnitPengolah();
                const servicesWithTotals = unitPengolahData.map((unit, index) => ({
                    id: index + 1,
                    unit: unit.name,
                    total: 0
                }));
                setServices(servicesWithTotals);
            } catch (error) {
                console.error("Error fetching unit pengolah data:", error);
            }
        };

        getUnitPengolahData();
    }, []);

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
