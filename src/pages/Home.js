import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';
import Navbar from '../components/navbar'; // Ensure the path is correct
import Footer from '../components/footer'; // Ensure the path is correct
import Jumbotron from '../components/jumbotron'; // Ensure the path is correct
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
      <Jumbotron /> 
      <div className="main">
        <h1 className="text-3xl text-center font-semibold">Tentang PTSP</h1>
        <div className="additional-content mt-5 text-center">
          <p className="text-black  font-family-poppins text-start ">
            Pelayanan Terpadu Satu Pintu (PTSP) merupakan salah satu program pemerintah dalam rangka peningkatan pelayanan publik, memangkas birokrasi pelayanan perizinan dan non perizinan, sebagai upaya mencapai good governance/ kepemerintahan yang baik. PTSP dapat meminimalisir interaksi antara pengguna layanan dengan petugas dalam rangka terciptanya tata kelola pemerintahan yang baik dan bersih
          </p>
          <div className="mt-5 flex flex-wrap">
  <div className="w-full md:w-1/2 p-2 text-start margin-left:5px">
    <span>
      Dengan konsep ini, pengguna layanan cukup datang ke PTSP dan bertemu dengan petugas front office (FO) kemudian menunggu proses selanjutnya.
      <br />
      Adapun Tujuan dari PTSP Adalah:
      <br />
    </span>
    <ul className="list-disc ml-5 mt-2 text-start">
      <li>Mendekatkan Pelayanan Kepada Masyarakat</li>
      <li>Menyederhanakan Proses Pelayanan</li>
      <li>
        Mewujudkan Proses Pelayanan yang: cepat, mudah, transparan, pasti, dan akuntabel
      </li>
      <li>
        Memberikan Akses yang lebih baik kepada masyarakat untuk memperoleh pelayanan
      </li>
    </ul>
  </div>
  <div className="w-full md:w-1/2 p-2 text-start">
    <span>
      Sasaran PTSP:
      <br />
      Terwujudnya pelayanan publik yang cepat, mudah, transparan, pasti dan akuntabel dalam upaya meningkatkan hak-hak masyarakat terhadap pelayanan publik.
      <br />
      Manfaat PTSP Bagi Masyarakat:
      <br />
    </span>
    <ul className="list-disc ml-5 mt-2 text-start">
      <li>Mendapatkan kemudahan layanan</li>
      <li>Memperoleh pelayanan yang lebih baik</li>
      <li>Mendapatkan kepastian & jaminan hukum</li>
    </ul>
  </div>
</div>
</div>

        <div className="text-center mt-8">
  <button className="text-white font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600" type="button">
    Baca Selengkapnya
  </button>
</div>


        <div id="layanan" className="mt-8">
          <h1 className="text-3xl font-semibold text-center">Daftar Layanan PTSP MAN 1 YOGYAKARTA</h1>
          {daftarSyarat.length > 0 ? (
            daftarSyarat.map((item) => (
              <div key={item.id} className="mt-5">
                <button
                  className="accordion"
                  onClick={() => openModal({ id: item.id, syarat_layanan: item.syarat_layanan })}
                >
                  {item.unit}
                </button>
                <div className="panel">
                  <div className="item">
                    <div className="description">{item.name}</div>
                    <div className="actions">
                      <button
                        className="btn"
                        onClick={() => openModal({ id: item.id, syarat_layanan: item.syarat_layanan })}
                      >
                        Lihat Syarat
                      </button>
                      <button className="btn">Buat Permohonan</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='notfound text-center'>No data available</p>
          )}
        </div>

        {/* Modal Detail Permohonan */}
        <Dialog open={isModalOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={closeModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Syarat Pelayanan Publik
              </h3>
              <div className="mt-2">
                <span>Syarat dari Layanan <strong>{currentData.name}</strong> </span>
                <br />
                <ol className="list-decimal ml-3">
                  {currentData.syarat_layanan ? JSON.parse(currentData.syarat_layanan).map((syarat, index) => (
                    <li key={index}>{syarat.name}</li>
                  )) : (
                    <li>No data available</li>
                  )}
                </ol>
              </div>
              <div className="mt-5 flex-end">
                <button type="button" className="btn" onClick={closeModal}>Tutup</button>
              </div>
            </div>
          </div>
        </Dialog>

        <div className="text-center mt-8">
          <h1 className="text-3xl font-semibold">Lacak Permohonan Layanan</h1>
          <p className="mb-4">Masukkan No. Registrasi untuk melacak Permohonan</p>
          <form action="/lacak-permohonan" method="GET" className="flex flex-col items-center space-y-4">
            <input
              type="text"
              name="no_reg"
              className="custom-input w-full max-w-xl p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Nomor Registrasi"
              required
            />
                        <div className="text-center mt-8">
  <button className="text-white font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600" type="button">
    Cek Permohonan
  </button>
</div>
          </form>
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
