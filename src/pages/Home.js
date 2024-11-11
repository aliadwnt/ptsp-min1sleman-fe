import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Jumbotron from "../components/jumbotron";
import "../index.css";
import { fetchDaftarLayanan } from "../services/daftarLayananService";
import {
  fetchDaftarSyarat
} from "../services/daftarSyaratService";
import { handleSearch } from "../services/lacakPermohonanService";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/loadingPage"; 
import Favicon from "../components/Favicon";

const HomePage = ({ daftarSyarat = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({
    id: "",
    syarat_layanan: [],
  });
  const { id } = useParams();
  const [daftarLayanan, setDaftarLayanan] = useState([]);
  const [no_reg, setNoReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const layananResponse = await fetchDaftarLayanan();
      const syaratResponse = await fetchDaftarSyarat(id); // gunakan id di sini
      const combinedData = layananResponse.map((layanan) => {
        const syarat = syaratResponse.filter(
          (syarat) => syarat.layanan_id === layanan.id
        );
        return {
          ...layanan,
          syarat_layanan: syarat.map((s) => s.syarat_layanan),
        };
      });

      setDaftarLayanan(combinedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Syarat Layanan:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Home";
    fetchData();
  }, [id]);
  if (isLoading) {
    return <LoadingPage />;
}

  const openModal = (data) => {
    setCurrentData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNoReg(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      unit: formData.get("unit"),
      name: formData.get("name"),
      syarat_layanan: formData.get("syarat_layanan"),
    };
    setLoading(true);
    setError(null); 

    try {
      const result = await handleSearch(no_reg); 
      if (result) {
        navigate(`/lacak-permohonan/${no_reg}`);
      } else {
        setError("Data tidak ditemukan.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("No registrasi belum terdaftar");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <Favicon/>
      <Jumbotron />
      <div className="p-12 font-family">
        <h1 className="text-3xl text-center font-semibold">Tentang PTSP</h1>
        <div className="additional-content mt-4 ml-9 text-start">
          <p className="text-black font-family-poppins text-start">
            Pelayanan Terpadu Satu Pintu (PTSP) merupakan salah satu program
            pemerintah dalam rangka peningkatan pelayanan publik, memangkas
            birokrasi pelayanan perizinan dan non perizinan, sebagai upaya
            mencapai good governance/kepemerintahan yang baik. PTSP dapat
            meminimalisir interaksi antara pengguna layanan dengan petugas dalam
            rangka terciptanya tata kelola pemerintahan yang baik dan bersih.
          </p>
          <div className="mt-5 flex flex-wrap">
            <div className="w-full md:w-1/2 p-2 text-start">
              <span>
                Dengan konsep ini, pengguna layanan cukup datang ke PTSP dan
                bertemu dengan petugas front office (FO) kemudian menunggu
                proses selanjutnya. Adapun Tujuan dari PTSP Adalah:
              </span>
              <ul className="list-disc ml-5 mt-2 text-start">
                <li>Mendekatkan Pelayanan Kepada Masyarakat</li>
                <li>Menyederhanakan Proses Pelayanan</li>
                <li>
                  Mewujudkan Proses Pelayanan yang cepat, mudah, transparan,
                  pasti, dan akuntabel
                </li>
                <li>
                  Memberikan Akses yang lebih baik kepada masyarakat untuk
                  memperoleh pelayanan
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 p-2 text-start">
              <span>
                Sasaran PTSP: Terwujudnya pelayanan publik yang cepat, mudah,
                transparan, pasti dan akuntabel dalam upaya meningkatkan hak-hak
                masyarakat terhadap pelayanan publik.
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
          <button
            className="text-white font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600"
            type="button"
          >
            Baca Selengkapnya
          </button>
        </div>

        {/* Daftar Layanan */}
        <div id="layanan" className="mt-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Daftar Layanan PTSP MIN 1 SLEMAN
          </h1>
          {daftarLayanan.length > 0 ? (
            daftarLayanan.map((item) => (
              <div key={item.id} className="mt-2">
                <div className="panel bg-gray-100 rounded-lg p-1 shadow-md mb-1 transition-transform transform">
                  <div className="item flex justify-between items-center">
                    <div className="description text-sm md:text-lg font-semibold text-gray-800 w-full break-words text-left md:text-left">
                      {item.name}
                    </div>
                    <div className="actions flex space-x-2">
                      <button
                        className="btn bg-blue-500 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-xs sm:text-xs"
                        onClick={() =>
                          openModal({
                            id: item.id,
                            syarat_layanan: item.syarat_layanan,
                          })
                        }
                      >
                        Lihat Syarat
                      </button>
                      <button
                        className="btn bg-green-500 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-lg hover:bg-green-600 transition duration-300 text-xs"
                        onClick={() => navigate("/layanan")}
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
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              aria-hidden="true"
              onClick={closeModal}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:top-0 sm:align-start sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 border-b-2 border-gray-300 pb-2">
                Syarat Pelayanan Publik
              </h3>

              <div className="mt-4">
                {(() => {
                  const selectedId = currentData.id;
                  const selectedLayanan = daftarLayanan.find(
                    (item) => item.id === selectedId
                  );

                  return selectedLayanan ? (
                    <span>
                      Syarat dari Layanan{" "}
                      <strong>{selectedLayanan.name}</strong>
                    </span>
                  ) : (
                    <span>No layanan available</span>
                  );
                })()}
                <ol className="list-inside list-disc ml-10">
                  {currentData.syarat_layanan ? (
                    (() => {
                      try {
                        const parsedSyarat = JSON.parse(currentData.syarat_layanan);
                        return parsedSyarat.length > 0 ? (
                          parsedSyarat.map((syarat, index) => (
                            <li key={index} className="mb-2">
                              {syarat}
                            </li>
                          ))
                        ) : (
                          <li>No data available</li>
                        );
                      } catch (error) {
                        console.error("Invalid JSON:", error);
                        return <li>Error parsing syarat layanan</li>;
                      }
                    })()
                  ) : (
                    <li>No data available</li>
                  )}
                </ol>
                <div className="mt-3 text-gray-500 italic text-sm">
                  *mohon melengkapi persyaratan diatas sebelum melakukan permohonan layanan.
                </div>
              </div>

              <div className="mt-5 border-t border-gray-300 pt-4 flex justify-end">
              <button type="button" className="font-family btn bg-green-600 text-white hover:bg-green-700" onClick={closeModal}>
                Tutup
              </button>
              </div>
            </div>
          </div>
        </Dialog>

        <div className="text-center mt-8">
          <h1 className="text-3xl font-semibold">Lacak Permohonan Layanan</h1>
          <p className="mb-4">
            Masukkan No. Registrasi untuk melacak Permohonan
          </p>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Tampilkan pesan kesalahan */}
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <input
              type="text"
              value={no_reg}
              onChange={handleInputChange}
              className="custom-input w-full max-w-xl p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="No. Registrasi"
              required
            />
            <button
              type="submit"
              className="text-white font-semibold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600"
              disabled={loading} // Nonaktifkan tombol saat loading
            >
              {loading ? "Loading..." : "Lacak Permohonan"}
            </button>
          </form>
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
