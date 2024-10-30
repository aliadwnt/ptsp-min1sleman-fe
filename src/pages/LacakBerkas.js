import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../App";
import {
  fetchLacakBerkas,
  fetchLoadArsip,
} from "../services/lacakBerkasService";
import { fetchDaftarDisposisi } from "../services/daftarDisposisiService";

const LacakBerkas = () => {
  const [no_reg, setNoReg] = useState("");
  const [disposisi, setDisposisi] = useState([]);
  const [formData, setFormData] = useState({
    no_reg: "",
    nama_pelayanan: "",
    perihal: "",
    nama_pemohon: "",
    alamat: "",
    no_hp: "",
    nama_pengirim: "",
    kelengkapan: "",
    status: "",
    catatan: "",
  });
  const [arsipLayanan, setArsipLayanan] = useState({
    arsip_masuk: "",
    arsip_keluar: "",
  });

  const resetFields = () => {
    setFormData({
      no_reg: "",
      nama_pelayanan: "",
      perihal: "",
      nama_pemohon: "",
      alamat: "",
      no_hp: "",
      nama_pengirim: "",
      kelengkapan: "",
      status: "",
      catatan: "",
    });
    setArsipLayanan({ arsip_masuk: "", arsip_keluar: "" });
  };

  const fetchDisposisi = async () => {
    try {
      const response = await fetchDaftarDisposisi();
      setDisposisi(response);
    } catch (error) {
      console.error("Error fetching daftar Disposisi:", error);
    }
  };
  const handleSearch = async () => {
    if (!no_reg) {
      alert("Nomor registrasi tidak boleh kosong");
      return;
    }

    try {
      // Ambil data pelayanan
      const pelayananData = await fetchLacakBerkas(no_reg);
      console.log("Pelayanan Data:", pelayananData);

      if (pelayananData) {
        setFormData({
          no_reg: pelayananData.no_reg,
          nama_pelayanan: pelayananData.nama_pelayanan,
          perihal: pelayananData.perihal,
          nama_pemohon: pelayananData.nama_pemohon,
          alamat: pelayananData.alamat,
          no_hp: pelayananData.no_hp,
          nama_pengirim: pelayananData.nama_pengirim,
          kelengkapan: pelayananData.kelengkapan,
          status: pelayananData.status,
          catatan: pelayananData.catatan,
        });
      } else {
        alert("Data pelayanan tidak ditemukan");
        resetFields(); // Reset form jika data pelayanan tidak ditemukan
      }

      // Ambil data arsip terlepas dari hasil data pelayanan
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
        console.warn(
          "Data arsip tidak ditemukan untuk nomor registrasi:",
          no_reg
        );
        setArsipLayanan({ arsip_masuk: "", arsip_keluar: "" });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Terjadi kesalahan saat mengambil data");
    }
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="BodyLacakBerkas">
        <div className="bg-blue-600"></div>
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
          <div className="max-w-7xl mx-auto bg-white p-7 rounded-lg shadow-lg">
            {/* Search Bar */}
            <div className="mb-6 flex">
              <input
                type="text"
                value={no_reg}
                onChange={(e) => setNoReg(e.target.value)}
                placeholder="Masukkan Nomor Registrasi"
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleSearch}
                className="mx-3 w-1/2 bg-blue-500 text-white py-2 rounded-lg"
              >
                Cari
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3 bg-white-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-3 p-3 bg-blue-100">
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
                        fill="#1D8BE5"
                      />
                    </svg>
                    <span className="text-blue-500 title mx-2">
                      Lacak Permohonan Layanan
                    </span>
                  </div>
                </h2>
                <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white-300">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="register"
                      >
                        No Registrasi
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.no_reg}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="layanan"
                      >
                        Nama Layanan
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.nama_pelayanan}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="perihal"
                    >
                      Perihal
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      value={formData.perihal}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="pemohon"
                      >
                        Nama Pemohon
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.nama_pemohon}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="alamat"
                      >
                        Alamat
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.alamat}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="noHp"
                      >
                        No. HP
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.no_hp}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="pengirim"
                      >
                        Nama Pengirim
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.nama_pengirim}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="kelengkapan"
                    >
                      Kelengkapan
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      value={formData.kelengkapan}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.status}
                        readOnly
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="catatan"
                      >
                        Catatan
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        value={formData.catatan}
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-1/3 bg-white-100 p-4 rounded-lg shadow-lg">
                <div>
                  <div>
                    <h2 className="text-xl font-bold mb-3 p-3 bg-blue-100">
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
                            fill="#1D8BE5"
                          />
                        </svg>
                        <span className="text-blue-500 title mx-2">
                          Riwayat Disposisi
                        </span>
                      </div>
                    </h2>

                    <table className="min-w-full bg-white">
                      <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Riwayat Disposisi
                        </h2>
                        <ul class="timeline">
                          <li class="timeline-item">
                            <div class="timeline-content">
                              <div class="time">17 Oct 2022, 09:58:48</div>
                              <div class="name">Pramana Yuda Sayeti, S.Kom</div>
                              <div class="position">
                                Ahli Pertama - Pranata Komputer
                              </div>
                              <div class="note">[mohon_tindaklanjuti]</div>
                            </div>
                          </li>
                          <li class="timeline-item">
                            <div class="timeline-content">
                              <div class="time">17 Oct 2022, 10:55:01</div>
                              <div class="name">Yossef Yuda, S.HI, MA</div>
                              <div class="position">
                                Kepala Sub Bagian Tata Usaha
                              </div>
                              <div class="note">[mohon_tindaklanjuti]</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </table>
                  </div>
                  <div className="bg-white shadow-md rounded-lg p-6 mt-2">
                    <h2 className="text-xl font-bold mb-3 p-3 bg-blue-100 ">
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
                            fill="#1D8BE5"
                          />
                        </svg>
                        <span className="text-blue-500 title mx-2">
                          Arsip Layanan
                        </span>
                      </div>
                    </h2>
                    <div className="flex justify-between w-full mt-1 px-2">
                      {/* Arsip Masuk */}
                      <div className="w-1/2 pr-2">
                        <label className="text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Arsip Masuk
                        </label>
                        {arsipLayanan.arsip_masuk ? (
                          <button
                            onClick={() =>
                              window.open(arsipLayanan.arsip_masuk, "_blank")
                            }
                            className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-700 transition w-full"
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
                        <label className="text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Arsip Keluar
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LacakBerkas;
