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
import { ToastContainer, toast } from "react-toastify";

const DaftarPengguna = () => {
  const [dataDaftarPengguna, setDataDaftarPengguna] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDaftarPengguna, setCurrentDaftarPengguna] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");
  const [formValues, setFormValues] = useState({
    password: "",
    role: "",
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

    const { name, email, password, role } = e.target.elements;

    const DaftarPengguna = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };

    console.log("Data yang akan dikirim:", DaftarPengguna);

    try {
      if (currentDaftarPengguna && currentDaftarPengguna.id) {
        console.log("Updating user with ID:", currentDaftarPengguna.id);
        await updateDaftarPengguna(currentDaftarPengguna.id, DaftarPengguna);
        toast.success("Data berhasil diperbarui");
      } else {
        await createDaftarPengguna(DaftarPengguna);
        toast.success("Data berhasil ditambahkan");
      }

      setTimeout(() => {
        fetchData();
        setModalOpen(false);
      }, 1000);
      setIsLoading(false);
      fetchData();
      handleModalClose();
    } catch (error) {
      console.error("Failed to save data:", error);
      toast.error("Gagal menyimpan data");
      setIsLoading(false);
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
        toast.success("Data berhasil dihapus");
        fetchData();
      } catch (error) {
        console.error("Failed to delete data:", error);
        toast.error("Failed to delete data");
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
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="select-none min-h-screen w-full flex flex-col m-0 p-0 relative">
      <ToastContainer
        position="top-center" // Ubah posisi menjadi top-center atau bottom-center
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
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
          <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                <i className="fas fa-users mr-2"></i> Daftar Pengguna
              </div>
              <form
                onSubmit={handleSearch}
                className={`flex items-center space-x-2 ${
                  userRole === "superadmin"
                    ? "flex-grow justify-end"
                    : "w-full md:w-auto"
                }`}
              >
                {userRole === "admin" && (
                  <div className="flex space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 19a8 8 0 100-16 8 8 0 000 16zm-6-6h.01M16.39 16.39L21 21"
                      />
                    </svg>
                  </div>
                )}

                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className={`${
                    userRole === "superadmin"
                      ? "w-full md:w-64"
                      : "w-full md:w-48"
                  } p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={userRole === "2" ? "Search..." : "Search..."}
                />
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                >
                  <i className="fas fa-sync-alt text-xs"></i>
                </button>
                {userRole === "superadmin" && (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="flex items-center justify-center bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors duration-200"
                    >
                      <i className="fas fa-plus text-xs"></i>
                      <span className="ml-1 text-sm">Tambah</span>
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <text className="text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Total Daftar Pengguna :
                  <text className="px-2 py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {dataDaftarPengguna.length}
                  </text>
                  Data.
                </text>
                <div className="mt-2 overflow-x-auto border border-gray-200 md:rounded-lg">
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
                        {userRole === "superadmin" && (
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
                            <td className="max-w-xs truncate px-2 font-bold py-2 text-xs text-center text-gray-900 border border-gray-200">
                              {item.role === "superadmin" ? (
                                <span className="bg-blue-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  SUPER ADMIN
                                </span>
                              ) : item.role === "admin" ? (
                                <span className="bg-green-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  ADMIN
                                </span>
                              ) : item.role === "staff" ? (
                                <span className="bg-yellow-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  STAFF
                                </span>
                              ) : item.role === "kepala madrasah" ? (
                                <span className="bg-red-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  KEPALA MADRASAH
                                </span>
                              ) : (
                                <span className="bg-gray-500 text-white py-0.5 px-1.5 text-[10px] rounded-full">
                                  USER
                                </span>
                              )}
                            </td>
                            {userRole === "superadmin" && (
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
                <div className="flex justify-center mt-4 mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {currentPage > 1 && (
                      <div
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base"
                      >
                        <i className="fas fa-chevron-left text-sm md:text-lg"></i>
                      </div>
                    )}

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber >= currentPage - 2 &&
                        pageNumber <= currentPage + 2
                      ) {
                        return (
                          <div
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-1 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base ${
                              currentPage === pageNumber
                                ? "text-green-800 font-medium border-b-2 border-green-800"
                                : "text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-gray-300"
                            }`}
                          >
                            {pageNumber}
                          </div>
                        );
                      }
                      return null;
                    })}

                    {currentPage < totalPages && (
                      <div
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out text-sm md:text-base"
                      >
                        <i className="fas fa-chevron-right text-sm md:text-lg"></i>
                      </div>
                    )}
                  </div>
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
                    pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Password harus terdiri dari minimal 8 karakter, mengandung huruf besar dan kecil."
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
                  <select
                    name="role"
                    defaultValue={
                      (currentDaftarPengguna && currentDaftarPengguna.role) ||
                      ""
                    }
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }));
                    }}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="" disabled>
                      Pilih Peran
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="staff">Staff</option>
                    <option value="kepala madrasah">Kepala Madrasah</option>
                  </select>
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
