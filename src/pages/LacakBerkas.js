import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../App";
import {
  fetchLacakBerkas,
  fetchLoadArsip,
} from "../services/lacakBerkasService";
import { fetchDaftarDisposisiByNoReg } from "../services/daftarDisposisiService";
import Favicon from "../components/Favicon";
import { 
  InformationCircleIcon, 
  ExclamationCircleIcon, 
  ClipboardDocumentListIcon,  
  ClockIcon 
} from '@heroicons/react/24/outline';

const LacakBerkas = () => {
  const [no_reg, setNoReg] = useState("");
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
  const [daftarDisposisi, setDaftarDisposisi] = useState({
    diteruskan: "",
    disposisi: "",
    keterangan: "",
  });
  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Lacak Berkas";
  }, []);

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
        resetFields();
      }
    } catch (error) {
      console.error("Error fetching data pelayanan: ", error);
    }

    try {
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
      console.error("Error fetching data arsip: ", error);
      alert("Terjadi kesalahan saat mengambil data arsip");
    }

    try {
      // Ambil data disposisi
      const disposisiData = await fetchDaftarDisposisiByNoReg(no_reg);
      console.log("Disposisi Data:", disposisiData);

      if (
        disposisiData &&
        Array.isArray(disposisiData) &&
        disposisiData.length > 0
      ) {
        const mappedData = disposisiData.map((item) => ({
          diteruskan: item.diteruskan,
          disposisi: item.disposisi,
          time: item.createdAt,
          keterangan: item.keterangan,
        }));
        setDaftarDisposisi(mappedData);
      } else {
        console.warn(
          "Data disposisi tidak ditemukan untuk nomor registrasi:",
          no_reg
        );
        setDaftarDisposisi([]);
      }
    } catch (error) {
      console.error("Error fetching data disposisi: ", error);
      // alert("Terjadi kesalahan saat mengambil data disposisi");
    }
  };

  return (
    <div className="font-family">
      <Navbar />
      <Favicon />
        <div className="bg-green-600"></div>
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
          <div className="max-w-7xl mx-auto bg-white p-7 rounded-lg shadow-lg">
            <div className="select-none mb-6 flex">
              <input
                type="text"
                value={no_reg}
                onChange={(e) => setNoReg(e.target.value)}
                placeholder="Masukkan No Registrasi"
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleSearch}
                className="mx-3 w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 select-none"
              >
                Cari
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3 bg-white-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-3 p-3 bg-green-100">
                  <div className="flex items-center">
                  <ClipboardDocumentListIcon className="h-8 w-8 text-green-600" />
                    <span className="text-green-600 title mx-2 select-none">
                      Lacak Permohonan Layanan
                    </span>
                  </div>
                </h2>
                <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white-300">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                      className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                      className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                        className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  {daftarDisposisi && daftarDisposisi.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-3 p-3 bg-green-100">
                        <div className="flex items-center">
                        <ClockIcon className="h-8 w-8 text-green-600" />
                          <span className="text-green-600 title mx-2">
                            Riwayat Disposisi
                          </span>
                        </div>
                      </h2>

                      <table className="min-w-full bg-white">
                        <div className="bg-white shadow-md rounded-lg p-6">
                          <ul class="timeline">
                            {daftarDisposisi.map((item, index) => (
                              <div className="timeline-container max-h-96 overflow-y-auto">
                              <ul className="timeline">
                                {Array.isArray(daftarDisposisi) &&
                                  daftarDisposisi.map((item, index) => (
                                    <li className="timeline-item" key={index}>
                                      <div className="timeline-content">
                                        <div className="time">
                                          {new Date(item.time).toLocaleString()}
                                        </div>
                                        <div className="name">{item.diteruskan}</div>
                                        <div className="position">{item.keterangan}</div>
                                        <div className="note">{item.disposisi}</div>
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                            </div>                            
                            ))}
                          </ul>
                        </div>
                      </table>
                    </div>
                  )}

                  <div className="bg-white shadow-md rounded-lg p-6 mt-2">
                    <h2 className="text-xl font-bold mb-3 p-3 bg-green-100 ">
                      <div className="flex items-center">
                      <ExclamationCircleIcon className="h-8 w-8 text-green-600" />
                        <span className="text-green-600 title mx-2 select-none">
                          Arsip Layanan
                        </span>
                      </div>
                    </h2>
                    <div className="flex justify-between w-full mt-1 px-2">
                      {/* Arsip Masuk */}
                      <div className="w-1/2 pr-2">
                        <label className="text-center  block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none">
                          Arsip Masuk
                        </label>
                        {arsipLayanan.arsip_masuk ? (
                          <button
                            onClick={() =>
                              window.open(arsipLayanan.arsip_masuk, "_blank")
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

                  <div>
                    <div>
                      <h2 className="text-xl font-bold mb-3 mt-4 p-3 bg-green-100">
                        <div className="flex items-center">
                        <InformationCircleIcon className="h-8 w-8 text-green-600" />
                          <span className="text-green-600 title mx-2 select-none">
                            Output Pelayanan
                          </span>
                        </div>
                      </h2>
                      <div className="grid place-items-center">
                        <button className="bg-green-600 text-white font-bold py-2 px-4 text-center rounded hover:bg-green-700 transition">
                          Lihat Output Pelayanan
                        </button>
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
