import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer'; 
import '../index.css'; 
import Favicon from '../components/Favicon';

const VisiMisi = () => {
  return (
    <div>
      <Navbar />
      <Favicon />
      <div className="p-12 font-family">
        <h1 className="text-3xl text-center font-semibold">Visi dan Misi</h1>
        <div className="additional-content mt-5 text-center">
          <p className="text-black font-poppins text-start">
            Visi dan juga Misi dari sistem Pelayanan Terpadu Satu Pintu (PTSP) adalah sebagai berikut:
          </p>
          <div className="mt-5 flex flex-wrap">
          </div>
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default VisiMisi;
