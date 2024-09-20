import React from 'react';
import Navbar from '../components/navbar'; // Pastikan path sudah benar
import Footer from '../components/footer'; // Pastikan path sudah benar
import '../index.css'; // Jika kamu menggunakan file CSS terpisah

const ZonaIntegritas = () => {
  return (
    <div>
      <Navbar />

      <div className="main">
        <h1 className="text-3xl text-center font-semibold">Zona Integritas</h1>
        <div className="additional-content mt-5 text-center">
          <p className="text-black font-poppins text-start">
            Zona Integritas dari sistem Pelayanan Terpadu Satu Pintu (PTSP) adalah sebagai berikut:
          </p>
          <div className="mt-5 flex flex-wrap">
            {/* Tambahkan konten tambahan di sini */}
          </div>
        </div>
      </div>

      <Footer /> {/* Footer component */}
    </div>
  );
};

export default ZonaIntegritas;
