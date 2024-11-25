import React from 'react';
import { useNavigate } from 'react-router-dom';
import jumbotronImage from '../images/minsatu.jpg';
import '../App.css';

const Jumbotron = () => {
  const navigate = useNavigate();

  const handleNavigateLacak = () => {
    navigate('/lacak-berkas');
  };

  const handleNavigateLayanan = () => {
    navigate('/layanan');
  };

  return (
    <div className="jumbotron">
      <img src={jumbotronImage} alt="Background" className="w-full h-auto absolute top-0 left-0 -z-10"/>

      <div className="absolute inset-0 bg-white opacity-30 z-0"></div>

      <div className="relative z-10 p-4">
        <div className="flex flex-col gap-4 my-4 font-poppins font-bold">
          <div className="selamat-datang-di-ptsp">Selamat Datang di</div>
          <div className="ptsp-container">
            <div className="ptsp">PTSP</div>
            <div className="man-1">MIN 1 SLEMAN</div>
          </div>
        </div>

        <div className="pelayanan-terpadu-satu-pintu text-white text-lg md:text-2xl animate-slideInFromBottom shadow-lg">
          <span className="typing-effect">Pelayanan Terpadu Satu Pintu</span>
        </div>

        <div className="box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 animate-fadeInFromLeft">
        <div className="cont-1 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
          <div className="group w-16 h-16 mb-4 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 3H5c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V5c0-1.104-.896-2-2-2zM9 7h6M9 11h6M9 15h6" />
            </svg>
          </div>
          <div className="daftar-pelayanan text-lg font-semibold">Daftar Layanan</div>
          <div className="description text-sm text-center mt-2">
            Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
          </div>
        </div>

          <div
            onClick={handleNavigateLacak}
            className="cont-2 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="vector w-16 h-16 mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="16" y1="16" x2="20" y2="20" />
              </svg>
            </div>
            <div className="lacak-permohonan text-lg font-semibold">Lacak Permohonan</div>
            <div className="description text-sm text-center mt-2">
              Lacak dan Pantau kemajuan Proses permohonan yang anda ajukan dari manapun kapanpun
            </div>
          </div>

          <div 
            onClick={handleNavigateLayanan}
            className="cont-3 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300  cursor-pointer">
            <div className="group2 w-16 h-16 mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6v12m6-6H6" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="buat-permohonan-layanan text-lg font-semibold">Buat Permohonan Layanan</div>
            <div className="description text-sm text-center mt-2">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>

          <div className="cont-4 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="vector2 w-16 h-16 mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.25-3.75 9.5-8.75 9.5a8.99 8.99 0 0 1-6.5-2.5c-1.5 1.5-3.5 2.5-5.5 2.5C3.75 21.5 0 17.25 0 12A10 10 0 0 1 12 2z"></path>
                <path d="M12 15v-2m0-4h.01"></path>
              </svg>
            </div>
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