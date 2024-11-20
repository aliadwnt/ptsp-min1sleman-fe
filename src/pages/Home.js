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
import About from "../components/AboutPtsp";
import LacakPermohonanForm from "../components/LacakPermohonan"; 
import DaftarLayanan from "../components/DaftarLayanan";

const HomePage = () => {
  const { id } = useParams();
  const [unitLayanan, setUnitLayanan] = useState([]);
  const [no_reg, setNoReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSearchRequest = async (no_reg) => {
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
      <div className="px-6 md:px-12 lg:px-24 font-family">
        <About />
        <DaftarLayanan unitLayanan={unitLayanan} />
        <LacakPermohonanForm 
          onSearch={handleSearchRequest} 
          loading={loading} 
          error={error} 
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
