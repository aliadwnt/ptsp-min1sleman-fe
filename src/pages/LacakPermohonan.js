import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"; 
import Footer from "../components/footer"; 
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLacakPermohonan } from '../services/lacakPermohonanService';
import { exportpdf } from "../services/layananService"; 
import PdfTemplate from "./pdf/TemplatePelayanan";
import ReactDOMServer from 'react-dom/server'; 
import "../index.css"; 

const LacakPermohonan = () => {
  const { no_reg } = useParams(); 
  const [formData, setFormData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!no_reg) {
      console.error("No registration number provided.");
      navigate("/"); 
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchLacakPermohonan(no_reg); 
        setFormData(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [no_reg, navigate]); 

  const handleExportPDF = async () => {
    if (!formData) {
      console.error("No form data available for PDF export.");
      return;
    }
    
    const htmlTemplate = <PdfTemplate noReg={formData.no_reg} data={formData} />; 
  
    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);
  
    await exportpdf(htmlString, formData.no_reg); 
  };
  
  if (!formData) {
    return <div className="text-center py-10">Loading...</div>; 
  }
  return (
    <div>
      <Navbar />
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mx-8 mt-4">
          Permohonan Pelayanan
        </h2> 
      <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
        <div className="flex justify-between items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"></h2>
          <button
            onClick={handleExportPDF} // Updated to call the correct export function
            className="bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded"
          >
            Cetak Bukti Permohonan
          </button>
        </div>

        <div className="bg-white shadow rounded-lg mx-8 py-8">
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="register"
                >
                  No Registrasi
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.no_reg}
                  readOnly
                  type="text"
                />
              </div>

              <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="layanan"
                >
                  Nama Layanan
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.nama_pelayanan}
                  readOnly
                  type="text"
                />
              </div>
            </div>
            <div className="w-full mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="perihal"
              >
                Perihal
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formData.perihal}
                readOnly
                type="text"
              />
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="pemohon"
                >
                  Nama Pemohon
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.nama_pemohon}
                  readOnly
                  type="text"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="alamat"
                >
                  Alamat
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.alamat}
                  readOnly
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="no_hp_pemohon"
                >
                  NO.HP Pemohon
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.no_hp}
                  readOnly
                  type="text"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="pengirim"
                >
                  Nama Pengirim
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.nama_pengirim}
                  readOnly
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="kelengkapan"
                >
                  Kelengkapan
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.kelengkapan}
                  readOnly
                  type="text"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={formData.status}
                  readOnly
                  type="text"
                />
              </div>
            </div>

            <div className="w-full mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="catatan"
              >
                Catatan
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formData.catatan}
                readOnly
                type="text"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LacakPermohonan;

