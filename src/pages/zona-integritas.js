import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';
import Navbar from '../components/navbar'; // Ensure the path is correct
import Footer from '../components/footer'; // Ensure the path is correct
import '../index.css'; 

const HomePage = ({ daftarSyarat = [] }) => { // Default value as an empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({ id: '', syarat_layanan: '' });

  const openModal = (data) => {
    setCurrentData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar /> 
    
      <div className="main">
        <h1 className="text-3xl text-center font-semibold">Zona Integritas</h1>
        <div className="additional-content mt-5 text-center">
          <p className="text-black  font-family-poppins text-start ">
            Zona Integritas dari sistem Pelayanan Terpadu Satu Pintu (PTSP) adalah sebagai berikut :
          </p>
          <div className="mt-5 flex flex-wrap">
</div>
</div>
        
      </div>

      <Footer /> {/* Add Footer component */}
    </div>
  );
};

HomePage.propTypes = {
  daftarSyarat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      unit: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      syarat_layanan: PropTypes.string.isRequired,
    })
  ),
};

export default HomePage;
