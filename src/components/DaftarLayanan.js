import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LayananList = ({ unitLayanan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [openUnits, setOpenUnits] = useState({});
  const navigate = useNavigate();

  // Check the user's role from localStorage (you can replace this with your own logic/context)
  const userRole = localStorage.getItem("userRole");  // Assuming "userRole" is stored in localStorage

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLayananModal = (layanan) => {
    setCurrentData(layanan);
    setIsModalOpen(true);
  };

  const handleNavigate = () => {
    navigate("/layanan");
  };

  const toggleUnit = (unitName) => {
    setOpenUnits((prevState) => ({
      ...prevState,
      [unitName]: !prevState[unitName],
    }));
  };

  return (
    <div id="layanan" className="mt-12 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-green-900 mb-8">
        Daftar Layanan PTSP MIN 1 SLEMAN
      </h1>
      {unitLayanan.length > 0 ? (
        unitLayanan.map((unit, index) => (
          <div key={index} className="mt-8">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {unit.name}
              </h2>
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
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
              <div className="select-none mt-6 space-y-6">
                {unit.layanan.length > 0 ? (
                  unit.layanan.map((layanan) => (
                    <div
                      key={layanan.id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-center p-3 hover:bg-gray-100 transition duration-300 rounded-lg">
                        <div className="text-md text-gray-800 font-semibold">
                          {layanan.name}
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row sm:gap-2 sm:mt-0">
                          <button
                            className="btn bg-green-500 text-white font-semibold py-1.5 px-5 text-sm rounded-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto mt-2 sm:mt-0"
                            onClick={() => openLayananModal(layanan)}
                          >
                            Lihat Syarat
                          </button>
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

      {/* Modal Syarat Layanan */}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
              Syarat Pelayanan Publik
            </h3>

            <div className="mt-2">
              <span>
                Syarat dari Layanan{" "}
                <strong>{currentData.name || "No layanan available"}</strong>
              </span>

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
                *Mohon menyiapkan file berisi dokumen persyaratan diatas dengan format PDF untuk melakukan permohonan layanan.
              </div>
            </div>

            <div className="mt-5 border-t border-gray-300 pt-4 flex justify-between">
              {userRole ? (
                <>
                  <button
                    type="button"
                    className="font-semibold bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg transition duration-200"
                    onClick={handleNavigate}
                  >
                    Buat Permohonan
                  </button>
                  <button
                    type="button"
                    className="font-semibold bg-red-600 text-white hover:bg-green-700 px-6 py-2 ml-5 rounded-lg transition duration-200"
                    onClick={closeModal}
                  >
                    Tutup
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="font-semibold bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-lg transition duration-200"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

LayananList.propTypes = {
  unitLayanan: PropTypes.array.isRequired,
};

export default LayananList;
