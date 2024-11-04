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
  const [currentDaftarPengguna, setCurrentDaftarPengguna] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    const { name, email, password, is_admin } = e.target.elements;

    const DaftarPengguna = {
      name: name.value,
      email: email.value,
      password: password.value,
      is_admin: is_admin.value,
    };

    console.log("Data yang akan dikirim:", DaftarPengguna); // Log untuk debugging

    try {
      if (currentDaftarPengguna && currentDaftarPengguna.id) {
        console.log("Updating user with ID:", currentDaftarPengguna.id);
        await updateDaftarPengguna(currentDaftarPengguna.id, DaftarPengguna);
        setSuccessMessage("Data berhasil diperbarui");
      } else {
        await createDaftarPengguna(DaftarPengguna);
        setSuccessMessage("Data berhasil ditambahkan");
      }

      fetchData();
      handleModalClose();
    } catch (error) {
      console.error("Failed to save data:", error);
      setErrorMessage(error.message);
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
        setSuccessMessage("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        setErrorMessage("Failed to delete data");
      }
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

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentDaftarPengguna(null);
    setMessage("");
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
        <Sidebar toggleSidebar={toggleSidebar} />{" "}
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        } pl-4 lg:pl-64`}
      >
        <Header />
        <div>
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">
            Daftar Pengguna
          </div>

          {successMessage && (
            <p className="text-green-500 mb-2 font-bolde">{successMessage}</p>
          )}
          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
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
                className="w-2/3 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
                className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
              >
                <i className="fas fa-plus"></i>
                <span className="ml-1">Tambah</span>
              </button>
            </form>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-7xl overflow-x-auto"> 
              <div className="mr-4 ml-4 border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full table-auto divide-gray-200 dark:divide-gray-700 w-full">
                  <thead className="bg-gray-50 dark:bg-gray-200">
                      <tr>
                        <th className="px-2 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-2 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Nama Lengkap
                        </th>
                        <th className="px-2 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-2 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Peran User
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dataDaftarPengguna.length > 0 ? (
                        dataDaftarPengguna.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-2 py-4 text-xs font-medium text-center text-gray-900 dark:text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-2 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-2 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                              {item.email}
                            </td>
                            <td className="px-2 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                              {item.is_admin === 2
                                ? "SUPER ADMIN"
                                : item.is_admin === 1
                                ? "ADMIN"
                                : "USER"}
                            </td>
                            <td className="px-2 py-4 text-xs text-center text-gray-900">
                              <button
                                onClick={() => handleEdit(item)}
                                className="focus:outline-none"
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                }}
                                aria-label="Edit user"
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
                                aria-label="Delete user"
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
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider"
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
                  {errorMessage && (
                    <p className="text-red-500 mb-2 font-bold">
                      {errorMessage}
                    </p>
                  )}
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
                        value="1" // nilai 1 untuk admin
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
                        value="2" // nilai 2 untuk super admin
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
