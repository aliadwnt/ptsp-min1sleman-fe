import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "../src/components/ProtectedRoute"; 

// Komponen lainnya
import Home from "./pages/Home";
import Layanan from "./pages/Layanan";
import VisiMisi from "./pages/VisiMisi";
import LacakBerkas from "./pages/LacakBerkas";
import ZonaIntegritas from "./pages/ZonaIntegritas";
import LacakPermohonan from "./pages/LacakPermohonan";

import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Dashboard from "./pages/User/Dashboard";

import DaftarPelayanan from "./pages/Layanan/DaftarPelayanan";
import ArsipLayanan from "./pages/Layanan/ArsipLayanan";
import SuratMasuk from "./pages/Surat/SuratMasuk";
import SuratKeluar from "./pages/Surat/SuratKeluar";

import MasterDisposisi from "./pages/Disposisi/MasterDisposisi";
import DaftarDisposisi from "./pages/Disposisi/DaftarDisposisi";
import DetailDisposisi from "./pages/Disposisi/DetailDisposisi";

import DaftarPengguna from "./pages/User/Users/DaftarPengguna";
import DaftarPeran from "./pages/User/Users/DaftarPeran";
import UnitPengolah from "./pages/User/Users/UnitPengolah";

import JenisLayanan from "./pages/Layanan/JenisLayanan";
import DaftarLayanan from "./pages/Layanan/DaftarLayanan";
import OutputLayanan from "./pages/Layanan/OutputLayanan";

import MasterSyarat from "./pages/Layanan/MasterSyarat";
import DaftarSyarat from "./pages/Layanan/DaftarSyarat";

import Settings from "./pages/User/Settings/Edit";
import EditProfile from "./pages/User/Profile/Edit";

import CreateDaftarPelayanan from "./pages/Layanan/DaftarPelayanan/CreateDaftarPelayanan";
import UpdateDaftarPelayanan from "./pages/Layanan/DaftarPelayanan/UpdateDaftarPelayanan";

import DaftarNotifikasi from "./pages/User/Notifications/DaftarNotifikasi";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser); 
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/lacak-berkas/:no_reg" element={<LacakBerkas />} />
        <Route path="/lacak-berkas" element={<LacakBerkas />} />
        <Route path="/zona-integritas" element={<ZonaIntegritas />} />
        <Route path="/lacak-permohonan" element={<LacakPermohonan />} />
        <Route path="/lacak-permohonan/:no_reg" element={<LacakPermohonan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/layanan/daftar-pelayanan" element={<DaftarPelayanan />} />
        <Route path="/layanan/arsip-layanan" element={<ArsipLayanan />} />
        <Route path="/surat/surat-masuk" element={<SuratMasuk />} />
        <Route path="/surat/surat-keluar" element={<SuratKeluar />} />
        <Route
          path="/disposisi/master-disposisi"
          element={<MasterDisposisi />}
        />
        <Route
          path="/disposisi/daftar-disposisi"
          element={<DaftarDisposisi />}
        />
        <Route
          path="/disposisi/detail-disposisi/:no_reg"
          element={<DetailDisposisi />}
        />
        <Route path="/user/users" element={<DaftarPengguna />} />
        <Route path="/user/users/daftar-peran" element={<DaftarPeran />} />
        <Route path="/user/unit-pengolah" element={<UnitPengolah />} />
        <Route path="/user/daftar-notifikasi" element={<DaftarNotifikasi />} />
        <Route path="/layanan/jenis-layanan" element={<JenisLayanan />} />
        <Route path="/layanan/daftar-layanan" element={<DaftarLayanan />} />
        <Route path="/layanan/output-layanan" element={<OutputLayanan />} />
        <Route path="/layanan/master-syarat" element={<MasterSyarat />} />
        <Route path="/layanan/daftar-syarat" element={<DaftarSyarat />} />
        <Route path="/user/settings" element={<Settings />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/create-daftar-pelayanan"element={<CreateDaftarPelayanan />}/>
        <Route path="/update-daftar-pelayanan/:id"element={<UpdateDaftarPelayanan />}/>
      </Routes>
    </Router>
  );
}

export default App;
