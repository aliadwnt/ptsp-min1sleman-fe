import React, { useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer'; 
import Favicon from '../components/Favicon';
import '../index.css'; 

const VisiMisi = () => {
  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Visi Misi";
  }, []);

  return (
    <div>
      <Favicon />
      <Navbar />
      <div className="p-12 font-family">
        <h1 className="text-3xl text-center font-semibold uppercase select-none">Visi dan Misi</h1>
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
