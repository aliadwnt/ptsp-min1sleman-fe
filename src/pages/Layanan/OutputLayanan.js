import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import {
  fetchOutputLayanan,
  createOutputLayanan,
  updateOutputLayanan,
  deleteOutputLayanan,
} from "../../services/outputLayananService";
import "../../App.css";

const OutputLayanan = () => {
  const [dataOutputLayanan, setOutputLayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentOutputLayanan, setCurrentOutputLayanan] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Output Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchOutputLayanan();
      setOutputLayanan(response);
    } catch (error) {
      console.error("Error fetching Output Layanan:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setOutputLayanan(dataOutputLayanan);
    } else {
      const filteredData = dataOutputLayanan.filter((item) =>
        String(item.name || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setOutputLayanan(filteredData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
      try {
        await deleteOutputLayanan(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };

  const handleAdd = () => {
    setCurrentOutputLayanan(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    const OutputLayanan = { name: name.value };

    const isDuplicate = dataOutputLayanan.some(
      (item) => item.name.toLowerCase() === OutputLayanan.name.toLowerCase()
    );

    if (isDuplicate) {
      setMessage({
        type: "error",
        text: "Data sudah ada, Masukkan Data yang lain",
      });
      return;
    }

    try {
      if (currentOutputLayanan) {
        await updateOutputLayanan(currentOutputLayanan.id, OutputLayanan);
        setMessage({ type: "success", text: "Data berhasil diupdate" });
      } else {
        await createOutputLayanan(OutputLayanan);
        setMessage({ type: "success", text: "Data berhasil ditambahkan" });
      }
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      setMessage({ type: "error", text: "Gagal menyimpan data" });
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentOutputLayanan(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col m-0 p-0 relative">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        <div>
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">
            Output Layanan
          </div>
          {message && (
            <div
              className={`p-4 m-8 text-sm rounded-lg ${
                message.type === "success"
                  ? "text-green-800 bg-green-50"
                  : "text-red-800 bg-red-50"
              }`}
              role="alert"
            >
              <span className="font-medium">
                {message.type === "success" ? "Sukses: " : "Error: "}
              </span>
              {message.text}
            </div>
          )}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-grow justify-center"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-3/4 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />

              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                type="button" // Ensure this button doesn't submit the form
                onClick={handleAdd}
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus"></i>
                <span className="ml-1">Tambah</span>
              </button>
            </form>
          </div>

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-200">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                          Output Layanan
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataOutputLayanan.length > 0 ? (
                        dataOutputLayanan.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-2 py-3 text-xs font-medium text-center text-gray-900 dark:text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-2 py-3 text-xs text-center text-gray-900 dark:text-gray-900">
                              {item.name}
                            </td>
                            <td className="text-center flex items-center justify-center px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => {
                                  setCurrentOutputLayanan(item);
                                  setModalOpen(true);
                                }}
                                className="focus:outline-none"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <i className="fas fa-edit text-green-600 hover:text-green-900"></i>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="focus:outline-none"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                              >
                                <i className="fas fa-trash text-red-600 hover:text-red-900"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="10"
                            className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
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

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                  {currentOutputLayanan
                    ? "Edit Output Layanan"
                    : "Tambah Output Layanan"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={currentOutputLayanan?.name || ""}
                    placeholder="Nama Master Syarat"
                    required
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                  />

                  <div className="flex justify-end col-span-2 space-x-2">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      {currentOutputLayanan ? "Update" : "Simpan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputLayanan;
