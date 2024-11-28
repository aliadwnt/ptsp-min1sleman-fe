import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jumbotronImage from "../images/minsatu.jpg";
import "../App.css";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import LoadingPage from "../components/loadingPage";

const Jumbotron = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigateLacak = () => {
    setLoading(true); // Mulai loading saat tombol ditekan
    setTimeout(() => {
      navigate("/lacak-berkas");
      setLoading(false); // Hentikan loading setelah navigasi selesai
    }, 2000); // Misalnya loading selama 2 detik
  };

  const handleNavigateLayanan = () => {
    setLoading(true); // Mulai loading saat tombol ditekan
    setTimeout(() => {
      navigate("/layanan");
      setLoading(false); // Hentikan loading setelah navigasi selesai
    }, 2000); // Misalnya loading selama 2 detik
  };

  if (loading) {
    return <LoadingPage />; // Menampilkan loading page saat loading aktif
  }

  return (
    <div className="jumbotron">
      <div className="font-family">
        {/* Background Image */}
        <img
          src={jumbotronImage}
          alt="Background"
          className="w-full h-auto absolute top-0 left-0 -z-10"
        />
        <div className="absolute inset-0 bg-white opacity-20 z-0"></div>

        {/* Text Content */}
        <div className="z-10 p-4">
          <div className="flex flex-col gap-0 sm:gap-4 my-4 font-poppins font-bold">
            <div className="text-2xl sm:text-4xl lg:text-5xl text-white leading-tight sm:mt-8">
              Selamat Datang di
            </div>
            <div className="ptsp-container">
              <div className="ptsp text-4xl sm:text-5xl lg:text-6xl text-green-500 leading-tight sm:mt-4">
                PTSP
              </div>
              <div className="man-1 sm:mt-2">MIN 1 SLEMAN</div>
            </div>
          </div>

          <div
            className="pelayanan-terpadu-satu-pintu text-white text-base sm:text-lg lg:text-xl mt-4 sm:mt-6"
            style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            <span className="typing-effect">Pelayanan Terpadu Satu Pintu</span>
          </div>

          <div className="relative py-2 sm:py-1 space-y-2 lg:mt-24">
            <div className="box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 sm:mt-4 animate-fadeInFromLeft">
              {/* Daftar Layanan */}
              <div className="cont-1 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 mb-4 text-green-500 flex justify-center items-center">
                  <DocumentTextIcon className="w-8 h-8" />
                </div>
                <div className="font-family text-lg font-semibold">
                  Daftar Layanan
                </div>
                <div className="description text-sm text-center mt-2">
                  Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan
                  Pengajuan Permohonan
                </div>
              </div>

              {/* Lacak Permohonan */}
              <div
                onClick={handleNavigateLacak}
                className="cont-2 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 mb-4 text-green-500 flex justify-center items-center hover:text-green-700 hover:scale-125 transition duration-200">
                  <MagnifyingGlassIcon className="w-8 h-8" />
                </div>
                <div className="font-family text-lg font-semibold">
                  Lacak Permohonan
                </div>
                <div className="description text-sm text-center mt-2">
                  Lacak dan Pantau kemajuan Proses permohonan yang anda ajukan
                  dari manapun kapanpun
                </div>
              </div>

              {/* Buat Permohonan Layanan */}
              <div
                onClick={handleNavigateLayanan}
                className="cont-3 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="group2 w-12 h-12 mb-4 text-green-500 flex justify-center items-center hover:text-green-700 hover:scale-125 transition duration-200">
                  <PlusCircleIcon className="w-8 h-8" />
                </div>
                <div className="font-family text-lg font-semibold">
                  Buat Permohonan Layanan
                </div>
                <div className="description text-sm text-center mt-2">
                  Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan
                  Pengajuan Permohonan
                </div>
              </div>

              {/* Help Desk */}
              <div className="cont-4 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 mb-4 text-green-500 flex justify-center items-center">
                  <QuestionMarkCircleIcon className="w-8 h-8" />
                </div>
                <div className="font-family text-lg font-semibold">
                  Help Desk
                </div>
                <div className="description text-sm text-center mt-2">
                  Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan
                  Pengajuan Permohonan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
