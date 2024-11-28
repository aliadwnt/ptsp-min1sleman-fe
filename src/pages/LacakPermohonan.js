import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLacakPermohonan } from "../services/lacakPermohonanService";
import { exportpdf } from "../services/layananService";
import PdfTemplate from "./pdf/TemplatePelayanan";
import ReactDOMServer from "react-dom/server";
import "../index.css";
import Favicon from "../components/Favicon";

const LacakPermohonan = () => {
  const { no_reg } = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Lacak Permohonan";
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

    const htmlTemplate = (
      <PdfTemplate noReg={formData.no_reg} data={formData} />
    );

    const htmlString = ReactDOMServer.renderToStaticMarkup(htmlTemplate);

    await exportpdf(htmlString, formData.no_reg);
  };

  if (!formData) {
    return <div className="text-center py-10">Loading...</div>;
  }
  return (
    <div className="font-family">
      <Navbar />
      <Favicon />
        <div className="bg-green-600"></div>
        <div className="py-2 space-y-2 sm:py-8 sm:space-y-8">
          <div className="mt-3 max-w-4xl mx-auto bg-white p-7 rounded-lg shadow-lg">
          <h2 className="ml-8 mt-6 mb-3 text-xl font-bold leading-tight text-center text-gray-800 h-10">
            DATA PERMOHONAN LAYANAN
          </h2>
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
            <div className="w-full mb-6 px-2 md:mb-0">
              <label
                className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
                  className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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

            <div className="w-full mb-6 px-2 md:mb-0">
              <label
                className=" block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 select-none"
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
          <div className="flex justify-between items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"></h2>
            <button
              onClick={handleExportPDF}
              className="font-family bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded w-4/5 sm:w-auto sm:max-w-xs mx-auto"
            >
              Cetak Bukti Permohonan
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LacakPermohonan;
