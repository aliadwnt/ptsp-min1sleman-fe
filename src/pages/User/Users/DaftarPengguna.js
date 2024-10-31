import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import {
  fetchDaftarPengguna,
  createDaftarPengguna,
  updateDaftarPengguna,
  deletePengguna,
} from "../../../services/daftarPenggunaService";
import "../../../App.css";

const DaftarPengguna = () => {
  const [dataDaftarPengguna, setDataDaftarPengguna] = useState([]);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDaftarPengguna, setCurrentDaftarPengguna] = useState(null);

  useEffect(() => {
    document.title = `PTSP MIN 1 SLEMAN - Daftar Pengguna`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPengguna();
      console.log("Data fetched:", response);
      setDataDaftarPengguna(response);
    } catch (error) {
      console.error("Error fetching Daftar Pengguna:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredData = dataDaftarPengguna.filter((item) =>
      String(item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setDataDaftarPengguna(filteredData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, is_admin } = e.target.elements;
  
    const DaftarPengguna = {
      name: name.value,
      email: email.value,
      password: password.value,
      is_admin: is_admin.value,
    };
  
    console.log("Data yang akan dikirim:", DaftarPengguna);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailExists = dataDaftarPengguna.some(
      (item) => item.email === DaftarPengguna.email && currentDaftarPengguna?.email !== DaftarPengguna.email
    );
  
    if (!emailRegex.test(DaftarPengguna.email)) {
      setMessage("Masukkan email yang valid");
      return;
    }
  
    if (emailExists) {
      setMessage("Email sudah terdaftar. Silakan gunakan email lain.");
      return;
    }
  
    try {
      if (currentDaftarPengguna) {
        await updateDaftarPengguna(currentDaftarPengguna.id, DaftarPengguna);
        setMessage("Data berhasil diperbarui");
      } else {
        await createDaftarPengguna(DaftarPengguna);
        setMessage("Data berhasil disimpan");
      }
      fetchData();
      handleModalClose();
    } catch (error) {
      console.error("Failed to save data:", error);
      setMessage("Failed to save data");
    }
  };  

  const handleAdd = () => {
    setCurrentDaftarPengguna(null);
    setModalOpen(true);
  };
  const handleEdit = (item) => {
    setCurrentDaftarPengguna(item);
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau dihapus?")) {
      try {
        await deletePengguna(id);
        setMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setMessage("Failed to delete data");
      }
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarPengguna(null);
    setMessage("");
  };
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bodyadmin flex relative">
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
            className={`p-4 m-8 text-sm rounded-lg ${
              message.includes("berhasil")
                ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
                : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
            }`}
            role="alert"
          >
            <span className="font-medium">
              {message.includes("berhasil") ? "Sukses " : "Error "}
            </span>
            {message}
          </div>
        )}

          <div className="flex items-center justify-center space-x-2 mb-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-grow justify-center"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                onClick={handleAdd}
                type="button"
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus mr-2"></i>Tambah
              </button>
            </form>
          </div>
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
                        Nama Lengkap
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Peran User
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
                          <td className="px-6 py-3 text-xs font-medium text-center text-gray-900 dark:text-white">
                            {index + 1}
                          </td>
                          <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                            {item.name}
                          </td>
                          <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                            {item.email}
                          </td>
                          <td className="px-6 py-3 text-xs text-center text-gray-900 dark:text-gray-400">
                            {item.is_admin === 2
                              ? "SUPER ADMIN"
                              : item.is_admin === 1
                              ? "ADMIN"
                              : "USER"}
                          </td>
                          <td className="px-6 py-3 text-xs text-center text-gray-900">
                            <button
                              onClick={() => handleEdit(item)}
                              className="focus:outline-none"
                              style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                              }}
                            >
                              <i className="fas fa-edit text-green-600"></i>
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
                                <i className="ml-2 fas fa-trash text-red-600 hover:text-red-900"></i>
                            </button>
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

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h2 className="text-lg font-bold">Tambah Pengguna / Users</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={
                      currentDaftarPengguna ? currentDaftarPengguna.name : ""
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    defaultValue={
                      currentDaftarPengguna ? currentDaftarPengguna.email : ""
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder={
                      currentDaftarPengguna && currentDaftarPengguna.password
                        ? "Kosongkan jika tidak ingin mengubah"
                        : "Masukkan password"
                    }
                    onChange={(e) => {
                      setCurrentDaftarPengguna((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    required={
                      !currentDaftarPengguna || !currentDaftarPengguna.password
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Peran Pengguna
                  </label>
                  <div>
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="is_admin"
                        value="1"
                        onChange={(e) => {
                          setCurrentDaftarPengguna((prev) => ({
                            ...prev,
                            is_admin: Number(e.target.value),
                          }));
                        }}
                        className="form-radio"
                        defaultChecked={
                          currentDaftarPengguna &&
                          currentDaftarPengguna.is_admin === 1
                        }
                      />
                      <span className="ml-2">Admin</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="is_admin"
                        value="2"
                        onChange={(e) => {
                          setCurrentDaftarPengguna((prev) => ({
                            ...prev,
                            is_admin: Number(e.target.value),
                          }));
                        }}
                        className="form-radio"
                        defaultChecked={
                          currentDaftarPengguna &&
                          currentDaftarPengguna.is_admin === 2
                        }
                      />
                      <span className="ml-2">Super Admin</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Update
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

export default DaftarPengguna;
