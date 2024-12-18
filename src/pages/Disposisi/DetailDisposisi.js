import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { fetchLoadArsip } from "../../services/lacakBerkasService";
import {
  updateDaftarDisposisi,
  fetchDaftarDisposisiByIdSm,
} from "../../services/daftarDisposisiService";
import { fetchMasterDisposisi } from "../../services/masterDisposisiService";
import { fetchSuratMasukById } from "../../services/suratMasukService";
import { fetchDaftarPengguna } from "../../services/daftarPenggunaService";
import { addNotification } from "../../services/notificationService";
import "../../App";
import Favicon from "../../components/Favicon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailDisposisi = () => {
  const userRole = localStorage.getItem("userRole");  
  const { id_sm } = useParams();
  const { no_reg } = useParams();
  const [disposisiOptions, setDisposisiOptions] = useState([]);
  const [penggunaOptions, setPenggunaOptions] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_sm: "",
    // no_reg: "",
    id_pelayanan: "",
    no_surat: "",
    tgl_surat: "",
    diterima: "",
    instansi_pengirim: "",
    no_agenda: "",
    klasifikasi: "",
    perihal: "",
    lampiran: "",
    status: "",
    sifat: "",
    file_surat: "",
    tindakan: "",
    disposisi: "",
    catatan: "",
  });

  const [arsipLayanan, setArsipLayanan] = useState({
    arsip_masuk: "",
    arsip_keluar: "",
  });

  const resetFields = () => {
    setFormData({
      no_surat: "",
      tgl_surat: ",",
      diterima: "",
      instansi_pengirim: "",
      no_agenda: "",
      klasifikasi: "",
      perihal: "",
      lampiran: "",
      status: "",
      sifat: "",
      file_surat: "",
    });
    setArsipLayanan({ arsip_masuk: "", arsip_keluar: "" });
  };

  const [daftarDisposisi, setDaftarDisposisi] = useState({
    tindakan: "",
    disposisi: "",
    catatan: "",
  });
  const fetchDetail = async () => {
    try {
      if (!id_sm) {
        console.warn("ID tidak ditemukan di URL.");
        return;
      }
      const suratData = await fetchSuratMasukById(id_sm);
      if (suratData) {
        setFormData({
          id_sm: suratData.id || "",
          no_surat: suratData.no_surat || "",
          tgl_surat: suratData.tgl_surat || "",
          diterima: suratData.diterima || "",
          instansi_pengirim: suratData.instansi_pengirim || "",
          no_agenda: suratData.no_agenda || "",
          klasifikasi: suratData.klasifikasi || "",
          perihal: suratData.perihal || "",
          lampiran: suratData.lampiran || "",
          status: suratData.status || "",
          sifat: suratData.sifat || "",
          file_surat: suratData.file_surat || "",
        });
      } else {
        resetFields();
        toast.error("Data surat tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching data surat masuk: ", error);
      toast.error("Terjadi kesalahan saat mengambil data surat masuk.");
    }

    try {
      // Fetch data disposisi berdasarkan ID
      const disposisiData = await fetchDaftarDisposisiByIdSm(id_sm);
      console.log("Disposisi Data:", disposisiData);

      if (
        disposisiData &&
        Array.isArray(disposisiData) &&
        disposisiData.length > 0
      ) {
        const mappedData = disposisiData
          .map((item) => {
            const disposisiArray = JSON.parse(item.disposisi);
            const tindakanArray = JSON.parse(item.tindakan);
            const catatanArray = JSON.parse(item.catatan);

            const dataItems = disposisiArray.map((disposisi, index) => ({
              disposisi,
              catatan: catatanArray[index] || "",
              tindakan: tindakanArray[index] || "",
              time: item.created_at,
            }));

            return dataItems;
          })
          .flat();

        setDaftarDisposisi(mappedData);
      } else {
        console.warn("Data disposisi tidak ditemukan untuk ID:", id_sm);
        setDaftarDisposisi([]);
      }
    } catch (error) {
      console.error("Error fetching data disposisi: ", error);
    }

    try {
      const arsipData = await fetchLoadArsip(no_reg);
      if (arsipData) {
        setArsipLayanan({
          arsip_masuk: arsipData.arsipMasuk || "",
          arsip_keluar: arsipData.arsipKeluar || "",
        });
        console.log("Arsip masuk dan keluar:", {
          arsip_masuk: arsipData.arsipMasuk || "",
          arsip_keluar: arsipData.arsipKeluar || "",
        });
      } else {
        console.warn("Data arsip tidak ditemukan untuk no_reg", no_reg);
        setArsipLayanan({ arsip_masuk: "", arsip_keluar: "" });
      }
    } catch (error) {
      console.error("Error fetching data arsip: ", error);
      console.warn(
        "Data arsip tidak dapat diambil, tetapi surat tetap tampil."
      );
      setArsipLayanan({ arsip_masuk: "", arsip_keluar: "" });
    }
  };

  const fetchDisposisi = async () => {
    try {
      const masterDisposisi = await fetchMasterDisposisi();
      if (Array.isArray(masterDisposisi)) {
        setDisposisiOptions(masterDisposisi);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {}
  };

  const fetchPengguna = async () => {
    try {
      const daftarPengguna = await fetchDaftarPengguna();
      if (Array.isArray(daftarPengguna)) {
        const filteredPengguna = daftarPengguna.filter(
          (pengguna) => pengguna.role !== "user"
        );
        setPenggunaOptions(filteredPengguna);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching pengguna:", error);
    }
  };

  const handleUpdateDisposisi = async () => {
    if (
      !formData.id_sm ||
      !formData.tindakan ||
      !formData.disposisi ||
      !formData.catatan
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }

    try {
      const updatedData = await updateDaftarDisposisi(
        formData.id_sm,
        formData.tindakan,
        formData.disposisi,
        formData.catatan
      );
      console.log("Update berhasil:", updatedData);

      if (userRole === "staff" || userRole === "kepala madrasah") {
        const notificationMessage = {
          message: `Disposisi #${formData.id_sm}`,
          tindakan: formData.tindakan,
          disposisi: formData.disposisi,
          type: "disposisi",
        };
        addNotification(notificationMessage);
      }

      resetFields();
      toast.success("Disposisi berhasil diperbarui.");
      fetchDetail();
    } catch (error) {
      console.error("Gagal update disposisi:", error);
      toast.error("Terjadi kesalahan saat memperbarui disposisi.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "filename") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    fetchDetail();
    fetchDisposisi();
    fetchPengguna();
  }, [id_sm]);

  return (
    <div className="bodyadmin flex relative">
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
        <div>
          {/* <div className="flex items-start mt-1 "> */}
          <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-2/3 p-4 rounded-lg border border-gray-300 mr-1">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-3 p-3 bg-white-100 shadow-md rounded">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                    >
                      <path
                        d="M15 2.375C13.8188 2.375 12.9844 3.20937 12.5719 4.25H4.6875V27.6875H25.3125V4.25H17.4281C17.0156 3.20937 16.1812 2.375 15 2.375ZM15 4.25C15.5156 4.25 15.9375 4.67188 15.9375 5.1875V6.125H18.75V8H11.25V6.125H14.0625V5.1875C14.0625 4.67188 14.4844 4.25 15 4.25ZM6.5625 6.125H9.375V9.875H20.625V6.125H23.4375V25.8125H6.5625V6.125ZM8.4375 12.6875V14.5625H10.3125V12.6875H8.4375ZM12.1875 12.6875V14.5625H21.5625V12.6875H12.1875ZM8.4375 16.4375V18.3125H10.3125V16.4375H8.4375ZM12.1875 16.4375V18.3125H21.5625V16.4375H12.1875ZM8.4375 20.1875V22.0625H10.3125V20.1875H8.4375ZM12.1875 20.1875V22.0625H21.5625V20.1875H12.1875Z"
                        fill="#11ad00"
                      />
                    </svg>
                    <span className="text-green-500 title mx-2">
                      Detail Surat Masuk
                    </span>
                  </div>
                </h2>
                <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white-300">
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="no_agenda"
                      >
                        No Agenda
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.no_agenda}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="no_surat"
                      >
                        No Surat
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.no_surat}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full mb-3">
                    <label
                      className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                      htmlFor="instansi_pengiriman"
                    >
                      Instansi Surat
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      value={formData.instansi_pengirim}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="tgl_surat"
                      >
                        Tanggal Surat
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="date"
                        value={
                          formData?.tgl_surat &&
                          !isNaN(new Date(formData?.tgl_surat).getTime()) // Memastikan nilai tgl_surat valid
                            ? new Date(formData?.tgl_surat)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="diterima"
                      >
                        Diterima
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="date"
                        value={
                          formData?.diterima &&
                          !isNaN(new Date(formData?.diterima).getTime()) // Memastikan nilai tgl_surat valid
                            ? new Date(formData?.tgl_surat)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="klasifikasi"
                      >
                        Klasifikasi
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.klasifikasi}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="perihal"
                      >
                        Perihal
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.perihal}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.status}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="sifat"
                      >
                        Sifat
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.sifat}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full mb-3">
                    <label
                      className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                      htmlFor="lampiran"
                    >
                      Lampiran
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      value={formData.lampiran}
                      readOnly
                    />
                  </div>
                  {/* <div className="w-full mb-6">
                    <label
                      className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                      htmlFor="catatan"
                    >
                      Catatan
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      value={formData.catatan}
                      readOnly
                    />
                  </div> */}
                </form>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-l font-bold mb-3 p-2 bg-white-100 shadow-md rounded ">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M15 1C7.16344 1 1 7.16344 1 15C1 22.8366 7.16344 29 15 29C22.8366 29 29 22.8366 29 15C29 7.16344 22.8366 1 15 1ZM15 27C8.373 27 3 21.627 3 15C3 8.373 8.373 3 15 3C21.627 3 27 8.373 27 15C27 21.627 21.627 27 15 27ZM15 7H17V15H10V13H15V7ZM15 21H17V19H15V21Z"
                        fill="#11ad00"
                      />
                    </svg>
                    <span className="text-green-500 title mx-2">
                      File Surat
                    </span>
                  </div>
                </h2>
                <div className="flex justify-between w-full mt-1 px-2">
                  {/* File surat */}
                  <div className="w-1/2 pr-2">
                    <label className="text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                      File Surat Masuk
                    </label>
                    {formData.file_surat ? (
                      <button
                        onClick={() =>
                          window.open(formData.file_surat, "_blank")
                        }
                        className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition w-full"
                      >
                        Lihat Dokumen
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded cursor-not-allowed w-full"
                      >
                        Tidak Tersedia
                      </button>
                    )}
                  </div>

                  {/* Arsip Keluar */}
                  <div className="w-1/2 pl-2">
                    <label className="text-center  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                      Disposisi
                    </label>
                    {arsipLayanan.arsip_keluar ? (
                      <button
                        onClick={() =>
                          window.open(arsipLayanan.arsip_keluar, "_blank")
                        }
                        className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-700 transition w-full"
                      >
                        Lihat Dokumen
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded cursor-not-allowed w-full"
                      >
                        Tidak Tersedia
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {daftarDisposisi && daftarDisposisi.length > 0 && (
                <table className="min-w-full">
                  <div className=" rounded-lg p-6">
                    <table className="min-w-full bg-white">
                      <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-l font-bold mb-3 p-2 bg-white-100 shadow-md rounded ">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <path
                                d="M15 1C7.16344 1 1 7.16344 1 15C1 22.8366 7.16344 29 15 29C22.8366 29 29 22.8366 29 15C29 7.16344 22.8366 1 15 1ZM15 27C8.373 27 3 21.627 3 15C3 8.373 8.373 3 15 3C21.627 3 27 8.373 27 15C27 21.627 21.627 27 15 27ZM15 7H17V15H10V13H15V7ZM15 21H17V19H15V21Z"
                                fill="#11ad00"
                              />
                            </svg>
                            <span className="text-green-500 title mx-2">
                              Riwayat Disposisi
                            </span>
                          </div>
                        </h2>
                        <ul className="timeline">
                          {Array.isArray(daftarDisposisi) &&
                            daftarDisposisi.map((item, index) => (
                              <li className="timeline-item" key={index}>
                                <div className="timeline-content">
                                  <div className="time">
                                    {new Date(item.time).toLocaleString()}
                                  </div>
                                  <div className="name">{item.disposisi}</div>
                                  <div className="position">{item.catatan}</div>
                                  <div className="note">{item.tindakan}</div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </table>
                  </div>
                </table>
              )}
              <div className="rounded-lg p-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-ll font-bold mb-3 p-2 bg-white-100 shadow-md rounded">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M15 1C7.16344 1 1 7.16344 1 15C1 22.8366 7.16344 29 15 29C22.8366 29 29 22.8366 29 15C29 7.16344 22.8366 1 15 1ZM15 27C8.373 27 3 21.627 3 15C3 8.373 8.373 3 15 3C21.627 3 27 8.373 27 15C27 21.627 21.627 27 15 27ZM15 7H17V15H10V13H15V7ZM15 21H17V19H15V21Z"
                          fill="#11ad00"
                        />
                      </svg>
                      <span className="text-green-500 title mx-2">
                        Lembaran Disposisi
                      </span>
                    </div>
                  </h2>
                  <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white-300">
                    {/* <input
                      type="text"
                      value={formData.id_sm}
                      onChange={handleChange}
                    /> */}
                    <div className="w-full mb-6">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="disposisi"
                      >
                        Nama Pejabat / Pegawai
                      </label>
                      <select
                        className="w-full bg-white border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                        name="disposisi"
                        value={formData.disposisi}
                        onChange={handleChange}
                      >
                        <option value="">Pilih Pejabat</option>
                        {penggunaOptions.map((pengguna) => (
                          <option key={pengguna.id} value={pengguna.name}>
                            {pengguna.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full mb-6">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="tindakan"
                      >
                        Aksi Disposisi
                      </label>
                      <select
                        className="w-full bg-white border border-gray-300 rounded py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                        name="tindakan"
                        value={formData.tindakan}
                        onChange={handleChange}
                      >
                        <option value="">Aksi Disposisi</option>
                        {disposisiOptions.map((disposisi) => (
                          <option key={disposisi.id} value={disposisi.name}>
                            {disposisi.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full mb-6">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
                        htmlFor="catatan"
                      >
                        Catatan / Keterangan
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="catatan"
                        value={formData.catatan}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleUpdateDisposisi}
                      className="w-full mb-6 bg-green-500 text-white rounded-lg py-2 hover:bg-green-700"
                    >
                      Disposisikan
                    </button>

                    <ToastContainer
                      position="top-center" // Ubah posisi menjadi top-center atau bottom-center
                      autoClose={5000}
                      hideProgressBar={false}
                      closeOnClick
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DetailDisposisi;
