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
import LoadingPage from "../../../components/loadingPage";
import Favicon from "../../../components/Favicon";

const DaftarPengguna = () => {
  const [dataDaftarPengguna, setDataDaftarPengguna] = useState([]);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPengguna, setCurrentDaftarPengguna] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");
  const [formValues, setFormValues] = useState({
    password: "",
    is_admin: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataDaftarPengguna.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(dataDaftarPengguna.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    document.title = `PTSP MIN 1 SLEMAN - Daftar Pengguna`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchDaftarPengguna();
      console.log("Data fetched:", response);
      setDataDaftarPengguna(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Daftar Pengguna:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

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
        setIsLoading(true);
      } else {
        await createDaftarPengguna(DaftarPengguna);
        setSuccessMessage("Data berhasil ditambahkan");
        setIsLoading(true);
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

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data?")) {
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      fetchData();
    } else {
      const filteredData = dataDaftarPengguna.filter(
        (item) =>
          String(item.name || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.email || "")
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(item.peran || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );
      setDataDaftarPengguna(filteredData);
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
    <div className="min-h-screen w-full bg-gray-100 flex flex-col m-0 p-0 relative">
      <Favicon />
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
        <div className="p-4">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fas fa-users mr-2"></i> Daftar Pengguna
          </div>

          {successMessage && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <div>
                <p className="font-medium">Sukses!</p>
                <p>{successMessage}</p>
              </div>
            </div>
          )}
          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              <div>
                <span className="font-medium">Sukses! </span>
                {message}
              </div>
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
                onChange={handleSearch}
                className="w-2/3 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />

              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
              {userRole === "2" && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700"
                >
                  <i className="fas fa-plus"></i>
                  <span className="ml-1">Tambah</span>
                </button>
              )}
            </form>
          </div>

          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
            <h2 className="text-l font-poppins font-semibold mb-6 text-gray-700 text-left">
              Daftar Pengguna di MIN 1 SLEMAN
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div className="overflow-x-auto border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          No
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Nama Lengkap
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Email
                        </th>
                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                          Peran User
                        </th>
                        {userRole === "2" && (
                          <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                            Aksi
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <tr key={item.id} className="hover:bg-gray-100">
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.name}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.email}
                            </td>
                            <td className="max-w-xs truncate px-2 py-3 text-xs text-center text-gray-900 border border-gray-200">
                              {item.is_admin === 2
                                ? "SUPER ADMIN"
                                : item.is_admin === 1
                                ? "ADMIN"
                                : "USER"}
                            </td>
                            {userRole === "2" && (
                              <td className="w-24 text-center px-2 py-3 whitespace-nowrap text-sm font-medium space-x-2 border border-gray-200">
                                <button
                                  onClick={() => {
                                    setCurrentDaftarPengguna(item);
                                    setModalOpen(true);
                                  }}
                                  className="focus:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                  aria-label="Edit user"
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
                                  aria-label="Delete user"
                                >
                                  <i className="ml-2 fas fa-trash text-red-600 hover:text-red-900"></i>
                                </button>
                              </td>
                            )}
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
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border mr-1 ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded border mr-1 ${
                        currentPage === index + 1
                          ? "bg-green-500 text-white hover:bg-green-700"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <i
                  className={`mr-2 p-2 rounded-full text-white ${
                    currentDaftarPengguna
                      ? "bg-green-600 fas fa-pencil-alt"
                      : "bg-green-600 fas fa-plus"
                  }`}
                ></i>
                {currentDaftarPengguna
                  ? "Edit Daftar Pengguna"
                  : "Tambah Daftar Pengguna"}
              </h2>
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
                      setFormValues((prev) => ({
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
                          setFormValues((prev) => ({
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
                          setFormValues((prev) => ({
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
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    {currentDaftarPengguna ? "Update" : "Tambah"}
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
