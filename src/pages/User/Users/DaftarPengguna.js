import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import { fetchDaftarPengguna, createDaftarPengguna } from "../../../services/daftarPenggunaService";
import "../../../App.css";

const DaftarPengguna = () => {
  const [dataDaftarPengguna, setDataDaftarPengguna] = useState([]);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Pengguna`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPengguna();
      console.log("Data fetched:", response); // Logging response for debugging
      setDataDaftarPengguna(response);
    } catch (error) {
      console.error("Error fetching Daftar Pengguna:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, is_admin } = e.target.elements;

    const DaftarPengguna = {
      id: id.value,
      name: name.value,
      is_admin: is_admin.value,
    };

    try {
      await createDaftarPengguna(DaftarPengguna); // Create new user
      fetchData(); // Refresh data after success
      setMessage("Data berhasil disimpan");
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bodyadmin flex relative">
    {/* Sidebar */}
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
    >
      <Sidebar toggleSidebar={toggleSidebar} />{" "}
    </div>
    <div
      className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "lg:ml-64" : "ml-0"
      } pl-4 lg:pl-64`}
    >
      <Header />
        <div>
          <div className="texttitle">Daftar Pengguna</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}
          <div className="flex justify-center">
            <div className="w-full max-w-7xl">
              <div className=" mr-4 ml-4 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full table-auto divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No ID Pengguna
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Pengguna
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Peran
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {dataDaftarPengguna.length > 0 ? (
                      dataDaftarPengguna.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-1 py-3 text-xs font-medium text-center text-gray-900 dark:text-white">
                            {index + 1}
                          </td>
                          <td className="px-1 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                            {item.id}
                          </td>
                          <td className="px-1 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                            {item.name}
                          </td>
                          <td className="px-1 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                            {item.is_admin === 1 ? 'ADMIN' : 'USER'}
                          </td>
                          <td className="text-center flex items-center justify-center px-2 py-2 whitespace-nowrap text-xs font-medium space-x-1">
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
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
    </div>
  );
};

export default DaftarPengguna;
