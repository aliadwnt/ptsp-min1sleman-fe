import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/navbar"; 
import Footer from "../components/footer"; 
import { fetchLacakPermohonan } from '../services/lacakPermohonanService';
import "../index.css"; 

const LacakPermohonan = () => {
  const { no_reg } = useParams(); 
  const [formData, setFormData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!no_reg) {
      console.error("No registration number provided.");
      navigate("/"); // Arahkan pengguna ke halaman lain jika no_reg tidak ada
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

  const handleExportPdf = () => {
    console.log("Cetak bukti permohonan");
    // Logika untuk ekspor ke PDF dapat ditambahkan di sini
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
          <button
            onClick={handleExportPdf}
            className="bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded"
          >
            Cetak Bukti Permohonan
          </button>
        </div>

        <div className="bg-white shadow rounded-lg mx-8 py-8">
          <form className="w-full mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Input Fields */}
            {[
              { label: "No Registrasi", value: formData.no_reg },
              { label: "Nama Layanan", value: formData.nama_pelayanan },
              { label: "Perihal", value: formData.perihal },
              { label: "Nama Pemohon", value: formData.nama_pemohon },
              { label: "Alamat", value: formData.alamat },
              { label: "NO.HP Pemohon", value: formData.no_hp },
              { label: "Nama Pengirim", value: formData.nama_pengirim },
              { label: "Kelengkapan", value: formData.kelengkapan },
              { label: "Status", value: formData.status },
              { label: "Catatan", value: formData.catatan },
            ].map((field, index) => (
              <div key={index} className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor={field.label.toLowerCase().replace(/\s/g, "_")}
                  >
                    {field.label}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={field.value}
                    readOnly
                    type="text"
                    id={field.label.toLowerCase().replace(/\s/g, "_")}
                  />
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LacakPermohonan;
