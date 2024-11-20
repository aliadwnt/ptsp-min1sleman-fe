import React from 'react';
import { Link } from 'react-router-dom'; 
import jumbotronImage from '../images/jumbotron.png'; 
import groupImage from '../images/group0.svg'; 
import vectorImage from '../images/vector0.svg'; 
import vectorImage2 from '../images/vector1.svg'; 
import '../App.css'; 

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <img src={jumbotronImage} alt="Background Image" className="w-full h-auto absolute top-0 left-0 -z-10" />

      <div className="relative z-0 p-2">
<div className="flex flex-col gap-4 my-4 font-poppins font-bold">
  <div className="selamat-datang-di-ptsp">Selamat Datang di</div>
  <div className="ptsp-container">
    <div className="ptsp">PTSP</div>
    <div className="man-1">MIN 1 SLEMAN</div>
  </div>
</div>

<div className="pelayanan-terpadu-satu-pintu text-white text-lg md:text-2xl animate-slideInFromBottom">
  <span className="typing-effect">Pelayanan Terpadu Satu Pintu</span>
</div>


        <div className="box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 animate-fadeInFromLeft">
          <div className="cont-1 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img className="group w-16 h-16 mb-4" src={groupImage} alt="Group Icon" />
            <div className="daftar-pelayanan text-lg font-semibold">Daftar Pelayanan</div>
            <div className="description text-sm text-center mt-2">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>
          <div className="cont-2 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img className="vector w-16 h-16 mb-4" src={vectorImage} alt="Vector Icon" />
            <div className="lacak-permohonan text-lg font-semibold">Lacak Permohonan</div>
            <div className="description text-sm text-center mt-2">
              Lacak dan Pantau kemajuan Proses permohonan yang anda ajukan dari manapun kapanpun
            </div>
          </div>
          <div className="cont-3 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img className="group2 w-16 h-16 mb-4" src={groupImage} alt="Group Icon" />
            <div className="buat-permohonan-layanan text-lg font-semibold">Buat Permohonan Layanan</div>
            <div className="description text-sm text-center mt-2">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>
          <div className="cont-4 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <img className="vector2 w-16 h-16 mb-4" src={vectorImage2} alt="Vector Icon" />
            <div className="help-desk text-lg font-semibold">Help Desk</div>
            <div className="description text-sm text-center mt-2">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
