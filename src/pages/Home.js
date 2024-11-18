import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Jumbotron from "../components/jumbotron";
import "../index.css";
import { fetchDaftarLayanan } from "../services/daftarLayananService";
import { fetchDaftarSyarat } from "../services/daftarSyaratService";
import { handleSearch } from "../services/lacakPermohonanService";
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
  const [unitLayanan, setUnitLayanan] = useState([]);
  const [no_reg, setNoReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openUnits, setOpenUnits] = useState({});

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [layananResponse, syaratResponse] = await Promise.all([
        fetchDaftarLayanan(),
        fetchDaftarSyarat(id),
      ]);

      const groupedData = syaratResponse.reduce((acc, syarat) => {
        const layanan = layananResponse.find(
          (layanan) => layanan.id === syarat.layanan_id
        );

        if (layanan) {
          const unitName = layanan.unit;

          if (!acc[unitName]) {
            acc[unitName] = { name: unitName, layanan: [] };
          }

          acc[unitName].layanan.push({
            ...layanan,
            name: syarat.name,
            syarat_layanan: syarat.syarat_layanan,
          });
        }

        return acc;
      }, {});

      setUnitLayanan(Object.values(groupedData));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const toggleUnit = (unitId) => {
    setOpenUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

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
      <Favicon />
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

        {/* Daftar Layanan */}
        <div id="layanan" className="mt-12 max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 mb-6">
            Daftar Layanan PTSP MIN 1 SLEMAN
          </h1>
          {unitLayanan.length > 0 ? (
            unitLayanan.map((unit, index) => (
              <div key={index} className="mt-8">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h2 className="text-m md:text-xl font-semibold text-gray-800">
                    {unit.name}
                  </h2>
                  <button
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                    onClick={() => toggleUnit(unit.name)}
                  >
                    <span>{openUnits[unit.name] ? "Tutup" : "Buka"}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openUnits[unit.name] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {openUnits[unit.name] && (
                  <div className="mt-4 space-y-4">
                    {unit.layanan.length > 0 ? (
                      unit.layanan.map((layanan) => (
                        <div
                          key={layanan.id}
                          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex justify-between items-center p-2">
                            <div className="text-m text-gray-800">
                              {layanan.name}
                            </div>
                            <div className="actions flex flex-wrap justify-center gap-4">
                              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <button
                                  className="btn bg-blue-500 text-white font-semibold py-1 px-3 text-sm rounded-lg hover:bg-blue-700 transition duration-200 w-full sm:w-32 md:w-auto flex-shrink-0"
                                  onClick={() =>
                                    openModal({
                                      id: layanan.id,
                                      syarat_layanan: layanan.syarat_layanan,
                                    })
                                  }
                                >
                                  Lihat Syarat
                                </button>

                                <button
                                  className="btn bg-green-500 text-white font-semibold py-1 px-1 text-sm rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-32 md:w-auto flex-shrink-1"
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
                      <p className="text-center text-gray-500">
                        Tidak ada layanan tersedia
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada unit pengolah ditemukan
            </p>
          )}
        </div>

        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-top bg-white rounded-lg shadow-xl transform transition-all sm:top-0 sm:align-start sm:max-w-lg sm:w-full sm:p-6 sm:mx-4 sm:my-8 max-w-xs w-full p-4">
              <h3 className="text-lg leading-6 font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">
                Syarat Pelayanan Publik
              </h3>

              <div className="mt-2">
                {(() => {
                  const selectedId = currentData.id;
                  console.log("currentData.id:", selectedId);

                  const selectedLayanan = unitLayanan
                    .flatMap((unit) => unit.layanan)
                    .find((item) => item.id === selectedId);

                  console.log("selectedLayanan:", selectedLayanan);

                  return selectedLayanan ? (
                    <span>
                      Syarat dari Layanan{" "}
                      <strong>{selectedLayanan.name}</strong>
                    </span>
                  ) : (
                    <span>No layanan available</span>
                  );
                })()}

                <ol className="list-inside list-disc ml-6 mt-4">
                  {currentData.syarat_layanan ? (
                    (() => {
                      try {
                        const parsedSyarat = JSON.parse(
                          currentData.syarat_layanan
                        );
                        return parsedSyarat.length > 0 ? (
                          parsedSyarat.map((syarat, index) => (
                            <li
                              key={index}
                              className="text-left mb-2 text-sm text-gray-700"
                            >
                              {syarat}
                            </li>
                          ))
                        ) : (
                          <li>No data available</li>
                        );
                      } catch (error) {
                        console.error("Invalid JSON:", error);
                        return <li>syarat layanan belum tersedia</li>;
                      }
                    })()
                  ) : (
                    <li>No data available</li>
                  )}
                </ol>

                <div className="text-left mt-4 text-gray-500 italic text-sm">
                  *Mohon melengkapi persyaratan di atas sebelum melakukan
                  permohonan layanan.
                </div>
              </div>

              <div className="mt-5 border-t border-gray-300 pt-4 flex justify-end">
                <button
                  type="button"
                  className="font-semibold bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg transition duration-200"
                  onClick={closeModal}
                >
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
