import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { UploadIcon } from '@heroicons/react/outline'; 

import {
  fetchArsipLayanan,
  saveArsipMasuk,
  saveArsipKeluar,
} from "../../services/arsipLayananService";
import { fetchDaftarPelayanan } from "../../services/daftarPelayananService";
import { uploadSingle } from "../../services/uploadService";
import "../../App.css";

const ArsipLayanan = () => {
  const [dataArsipLayanan, setDataArsipLayanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `PTSP MAN 1 YOGYAKARTA - Arsip Layanan`;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pelayananResponse = await fetchDaftarPelayanan();
      const arsipResponse = await fetchArsipLayanan();
      const combinedData = pelayananResponse.map((pelayanan) => {
        const arsip = arsipResponse.find(
          (arsip) => arsip.no_reg === pelayanan.no_reg
        );
        return {
          ...pelayanan,
          arsip_masuk: arsip ? arsip.arsip_masuk : "",
          arsip_keluar: arsip ? arsip.arsip_keluar : "",
        };
      });

      setDataArsipLayanan(combinedData);
    } catch (error) {
      console.error("Error fetching Arsip Layanan:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value; 
    setSearchTerm(value);  
  
    if (!value) {
      setDataArsipLayanan(dataArsipLayanan);  
    } else {
      const filteredData = dataArsipLayanan.filter((item) =>
        String(item.no_reg || "").toLowerCase().includes(value.toLowerCase()) ||
        String(item.nama_pelayanan || "").toLowerCase().includes(value.toLowerCase()) ||
        String(item.perihal || "").toLowerCase().includes(value.toLowerCase())
      );
      setDataArsipLayanan(filteredData); 
    }
  };

  const handleChange = (e, type, id) => {
    const { files } = e.target;
    if (files.length > 0) {
      const updatedData = dataArsipLayanan.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [type === "masuk" ? "arsip_masuk" : "arsip_keluar"]: files[0],
          };
        }
        return item;
      });
      setDataArsipLayanan(updatedData);

      handleSubmit(e, files[0], type, id);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Semua":
        return "fas fa-list text-gray-600"; 
      case "Baru":
        return "fas fa-file text-yellow-600"; 
      case "Proses":
        return "fas fa-hourglass-half text-yellow-500"; 
      case "Selesai":
        return "fas fa-check-circle text-green-600"; 
      case "Diambil":
        return "fas fa-user-check text-blue-600"; 
      case "Ditolak":
        return "fas fa-times-circle text-red-600";
      case "":
        return "fas fa-exclamation-circle text-orange-600 mr-2"; 
      default:
        return ""; 
    }
  };

  const handleSubmit = async (e, file, type, id) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      let uploadedArsipMasukUrl = "";
      let uploadedArsipKeluarUrl = "";

      if (type === "masuk" && file instanceof File) {
        uploadedArsipMasukUrl = await uploadSingle(file);
        console.log("Uploaded Arsip Masuk URL:", uploadedArsipMasukUrl);
      }

      if (type === "keluar" && file instanceof File) {
        uploadedArsipKeluarUrl = await uploadSingle(file);
        console.log("Uploaded Arsip Keluar URL:", uploadedArsipKeluarUrl);
      }
      const selectedArsipLayanan = dataArsipLayanan.find(
        (item) => item.id === id
      );

      if (!selectedArsipLayanan) {
        console.error("Data arsip tidak ditemukan untuk id:", id);
        setError("Data arsip tidak ditemukan.");
        setLoading(false);
        return;
      }

      const dataToSend = {
        no_reg: selectedArsipLayanan.no_reg,
        nama_pelayanan: selectedArsipLayanan.nama_pelayanan,
        perihal: selectedArsipLayanan.perihal,
        status: selectedArsipLayanan.status,
        arsip_masuk:
          type === "masuk"
            ? uploadedArsipMasukUrl
            : selectedArsipLayanan.arsip_masuk,
        arsip_keluar:
          type === "keluar"
            ? uploadedArsipKeluarUrl
            : selectedArsipLayanan.arsip_keluar,
      };

      console.log("Data yang akan dikirim:", dataToSend);

      if (type === "masuk") {
        await saveArsipMasuk(dataToSend);
      } else if (type === "keluar") {
        await saveArsipKeluar(dataToSend);
      }

      setSuccessMessage("Data berhasil disimpan!");
      fetchData();
    } catch (error) {
      console.error(
        "Gagal menyimpan data:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Gagal menyimpan data: " +
          (error.response ? error.response.data : error.message)
      );
    } finally {
      setLoading(false);
    }
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
          <div className="text-xl mt-2 ml-16 font-semibold leading-5 text-gray-800 pt-4 pb-4 px-2 dark:text-gray-900">Daftar Arsip Layanan</div>
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
                onChange={handleSearch}
                className="w-5/6 p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="flex justify-center">
  <div className="w-full max-w-4xl">
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-200">
          <tr>
            <th className="px-3 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              No
            </th>
            <th className="px-3 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              Nomor Registrasi
            </th>
            <th className="px-3 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              Nama Layanan
            </th>
            <th className="px-3 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              Perihal
            </th>
            <th className="px-3 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              Arsip Masuk
            </th>
            <th className="px-3 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              Arsip Keluar
            </th>
            <th className="px-9 sm:px-5 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-900 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
          
          {dataArsipLayanan.length > 0 ? (
            dataArsipLayanan.map((item, index) => (
              <tr key={item.id}>
                <td className="px-2 sm:px-4 py-4 text-xs font-medium text-center text-gray-900 dark:text-gray-900">
                  {index + 1}
                </td>
                <td className="px-2 sm:px-4 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                  {item.no_reg}
                </td>
                <td className="px-2 sm:px-4 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                  {item.nama_pelayanan}
                </td>
                <td className="px-2 sm:px-4 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                  {item.perihal}
                </td>
                <td className="px-2 sm:px-4 py-4 text-xs text-center text-gray-900 dark:text-gray-900">
                  {item.arsip_masuk ? (
                    <>
                      <a
                        href={item.arsip_masuk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-800 block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                      >
                        Preview
                      </a>
                      <input
                        type="file"
                        id={`uploadKeluar-${item.id}`}
                        onChange={(e) => handleChange(e, "keluar", item.id)}
                        className="hidden"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        id={`uploadMasuk-${item.id}`}
                        onChange={(e) => 
                          handleChange(e, "masuk", item.id)
                        }
                        className="hidden"
                      />
                      <button
                                  onClick={() =>
                          document
                            .getElementById(
                              `uploadMasuk-${item.id}`
                            )
                            .click()
                          }
                                  className="focus:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                  aria-label="Delete"
                                >
                                  <i className="fas fa-upload text-green-600 hover:text-green-900"></i>
                                </button>
                    </>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs text-center text-gray-900 dark:text-gray-400">
                  {item.arsip_keluar ? (
                    <>
                      <a
                        href={item.arsip_keluar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-800 block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                      >
                        Preview
                      </a>

                      <input
                        type="file"
                        id={`uploadKeluar-${item.id}`}
                        onChange={(e) => 
                          handleChange(e, "keluar", item.id)
                        }
                        className="hidden"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        id={`uploadKeluar-${item.id}`}
                        onChange={(e) =>
                           handleChange(e, "keluar", item.id)
                          }
                        className="hidden"
                      />
                      <button
                                  onClick={() =>
                          document
                            .getElementById(
                              `uploadKeluar-${item.id}`
                            )
                            .click()
                          }
                                  className="focus:outline-none"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                  }}
                                  aria-label="Delete"
                                >
                                  <i className="fas fa-upload text-green-600 hover:text-green-900"></i>
                                </button>
                    </>
                  )}
                </td>
                <td td className="px-3 py-4 text-xs text-left text-gray-900 dark:text-gray-900 flex items-center justify-left">
                  <i className={getStatusIcon(item.status)}></i>
                   <span className="ml-2">{item.status}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
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
      </div>
    </div>
  );
};

export default ArsipLayanan;
