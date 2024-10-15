import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';
import Navbar from '../components/navbar'; 
import Footer from '../components/footer'; 
import Jumbotron from '../components/jumbotron'; 
import '../index.css'; 
import { fetchDaftarLayanan } from '../services/daftarLayananService';
import { fetchDaftarSyarat } from '../services/daftarSyaratService';

const HomePage = ({ daftarSyarat = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({ id: '', syarat_layanan: '' });
  const [noReg, setNoReg] = useState('');
  const [daftarLayanan, setDaftarLayanan] = useState([]);
  const [syaratData, setSyaratData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDaftarLayanan = async () => {
      try {
        const data = await fetchDaftarLayanan(); 
        setDaftarLayanan(data); 
      } catch (error) {
        console.error("Failed to fetch layanan:", error);
      }
    };

    const loadDaftarSyarat = async () => {
      try {
        const data = await fetchDaftarSyarat();
        setSyaratData(data); // Simpan syarat layanan
      } catch (error) {
        console.error("Failed to fetch syarat:", error);
      }
    };

    loadDaftarLayanan();
    loadDaftarSyarat();
  }, []); 

  const openModal = (data) => {
    setCurrentData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    if (noReg) {
      navigate(`/lacak-berkas/${noReg}`);
    } else {
      alert("Harap masukkan nomor registrasi yang valid.");
    }
  };

  return (
    <div>
      <Navbar /> 
      <Jumbotron /> 
      
      <div className="main">
        <h1 className="text-3xl text-center font-semibold">Tentang PTSP</h1>
        <div className="additional-content mt-4 ml-9 text-start">
          <p className="text-black font-family-poppins text-start">
            Pelayanan Terpadu Satu Pintu (PTSP) merupakan salah satu program pemerintah dalam rangka peningkatan pelayanan publik, memangkas birokrasi pelayanan perizinan dan non perizinan, sebagai upaya mencapai good governance/kepemerintahan yang baik. PTSP dapat meminimalisir interaksi antara pengguna layanan dengan petugas dalam rangka terciptanya tata kelola pemerintahan yang baik dan bersih.
          </p>
          <div className="mt-5 flex flex-wrap">
            <div className="w-full md:w-1/2 p-2 text-start">
              <span>
                Dengan konsep ini, pengguna layanan cukup datang ke PTSP dan bertemu dengan petugas front office (FO) kemudian menunggu proses selanjutnya. Adapun Tujuan dari PTSP Adalah:
              </span>
              <ul className="list-disc ml-5 mt-2 text-start">
                <li>Mendekatkan Pelayanan Kepada Masyarakat</li>
                <li>Menyederhanakan Proses Pelayanan</li>
                <li>Mewujudkan Proses Pelayanan yang cepat, mudah, transparan, pasti, dan akuntabel</li>
                <li>Memberikan Akses yang lebih baik kepada masyarakat untuk memperoleh pelayanan</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 p-2 text-start">
              <span>
                Sasaran PTSP: Terwujudnya pelayanan publik yang cepat, mudah, transparan, pasti dan akuntabel dalam upaya meningkatkan hak-hak masyarakat terhadap pelayanan publik.
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

        {/* Daftar Layanan */}
        <div id="layanan" className="mt-8">
          <h1 className="text-3xl font-semibold text-center">Daftar Layanan PTSP MIN 1 SLEMAN</h1>
          {daftarLayanan.length > 0 ? (
            daftarLayanan.map((item) => (
              <div key={item.id} className="mt-5">
                {/* <button
                  className="accordion"
                  onClick={() => openModal({ id: item.id, syarat_layanan: item.syarat_layanan })}
                >
                  {item.nama_pelayanan} 
                </button> */}
                <div className="panel bg-gray-100 rounded-lg p-4 shadow-md mb-4 transition-transform transform hover:scale-105">
                  <div className="item flex justify-between items-center">
                    <div className="description text-lg font-semibold text-gray-800">{item.name}</div>
                    <div className="actions flex space-x-2">
                      <button
                        className="btn bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => openModal({ id: item.id, syarat_layanan: item.syarat_layanan })}
                      >
                        Lihat Syarat
                      </button>
                      <button
                className="btn bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                onClick={() => navigate('/layanan')} // Tambahkan logika navigasi di sini
              >
                Buat Permohonan
              </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="notfound text-center">No data available</p>
          )}
        </div>

        {/* Modal Detail Syarat Layanan */}
        <Dialog open={isModalOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={closeModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Syarat Pelayanan Publik</h3>
              <div className="mt-2">
                <span>Syarat dari Layanan <strong>{currentData.syarat_layanan}</strong></span>
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
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              name="no_reg"
              className="custom-input w-full max-w-xl p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan Nomor Registrasi"
              value={noReg}
              onChange={(e) => setNoReg(e.target.value)}
              required
            />
            <div className="text-center mt-8">
              <button
                className="text-white font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600"
                type="button"
                onClick={handleSearch}
              >
                Cek Permohonan
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
