import React, { useEffect, useState } from "react";
import { fetchUnitPengolah } from "../services/unitPengolahService";
import { fetchDaftarLayanan } from "../services/daftarLayananService";

const TableService = () => {
  const [services, setServices] = useState([]);
  const [totalLayanan, setTotalLayanan] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const unitPengolahData = await fetchUnitPengolah();
        const daftarLayananData = await fetchDaftarLayanan();

        const servicesWithTotals = unitPengolahData.map((unit, index) => {
          const total = daftarLayananData.filter(
            (item) => item.unit === unit.name
          ).length;
          return {
            id: index + 1,
            unit: unit.name,
            total: total,
          };
        });

        // Hitung total keseluruhan layanan
        const totalKeseluruhan = servicesWithTotals.reduce(
          (acc, service) => acc + service.total,
          0
        );

        setServices(servicesWithTotals);
        setTotalLayanan(totalKeseluruhan);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg w-full p-6 mx-2">
      <b className="text-xl text-gray-900">Tabel Pelayanan</b>
      <div className="overflow-x-auto mt-4">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Header Tabel */}
              <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-center">
                    No
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-left">
                    Unit Pengolah
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-center">
                    Total Layanan
                  </th>
                </tr>
              </thead>
              {/* Isi Tabel */}
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="transition duration-200 ease-in-out hover:bg-grren-50 hover:shadow-lg"
                  >
                    <td className="px-4 py-3 text-sm text-center font-medium text-gray-600">
                      {service.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                      {service.unit}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-medium text-green-700">
                      {service.total}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Footer Tabel */}
              <tfoot className="bg-gray-100">
                <tr>
                  <td colSpan="2" className="px-4 py-3 text-sm font-semibold text-right text-gray-700">
                    TOTAL DAFTAR LAYANAN
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-green-700">
                    {totalLayanan}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableService;
