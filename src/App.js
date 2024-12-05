import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import NotFoundPage from "./components/NotFoundPage";

// Komponen Halaman
import Home from "./pages/Home";
import Layanan from "./pages/Layanan";
import VisiMisi from "./pages/VisiMisi";
import LacakBerkas from "./pages/LacakBerkas";
import ZonaIntegritas from "./pages/ZonaIntegritas";
import LacakPermohonan from "./pages/LacakPermohonan";
import EditUser from "./pages/User/Profile/EditUser";

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

import DaftarSettings from "./pages/Settings/DaftarSettings";
import DashboardStaff from "./pages/DashboardStaff"
import {
  isSuperAdmin,
  isAuthenticated,
  isAdmin,
  isKepalaMadrasah,
  isStaff,
  isNotUser,
} from "./utils/auth";

function App() {
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const userRole = localStorage.getItem("userRole");

    // console.log("Token:", token, "Role:", userRole);

    // Jika user tidak valid, hapus data token
    if (isNotUser()) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      console.log("User tidak dikenali, data dihapus.");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        {isNotUser() && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/lacak-permohonan/:no_reg"
              element={<LacakPermohonan />}
            />
            <Route path="/visi-misi" element={<VisiMisi />} />
            <Route path="/zona-integritas" element={<ZonaIntegritas />} />
          </>
        )}

        <Route
          path="/"
          element={
            isAuthenticated() ? (
              isAdmin() || isKepalaMadrasah() || isStaff() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/home" />
              )
            ) : (
              <Home />
            )
          }
        />

        {/* Halaman untuk user */}
        {isAuthenticated() &&
          !isSuperAdmin () &&
          !isAdmin() &&
          !isKepalaMadrasah() &&
          !isStaff() && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/lacak-permohonan" element={<LacakPermohonan />} />
              <Route
                path="/lacak-permohonan/:no_reg"
                element={<LacakPermohonan />}
              />
              <Route path="/layanan" element={<Layanan />} />
              <Route path="/visi-misi" element={<VisiMisi />} />
              <Route path="/lacak-berkas" element={<LacakBerkas />} />
              <Route path="/zona-integritas" element={<ZonaIntegritas />} />
              <Route path="/edit-user" element={<EditUser />} />
            </>
          )}

        {/* Halaman untuk admin */}
        {isAuthenticated() && isAdmin() && (
          <>
           <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/layanan/daftar-pelayanan" element={<DaftarPelayanan />}/>
            <Route path="/layanan/arsip-layanan" element={<ArsipLayanan />} />
            <Route path="/layanan/jenis-layanan" element={<JenisLayanan />} />
            <Route path="/layanan/daftar-layanan" element={<DaftarLayanan />} />
            <Route path="/layanan/output-layanan" element={<OutputLayanan />} />
            <Route path="/layanan/master-syarat" element={<MasterSyarat />} />
            <Route path="/layanan/daftar-syarat" element={<DaftarSyarat />} />
            <Route path="/surat/surat-masuk" element={<SuratMasuk />} />
            <Route path="/surat/surat-keluar" element={<SuratKeluar />} />
            <Route path="/disposisi/master-disposisi" element={<MasterDisposisi />}/>
            <Route path="/disposisi/daftar-disposisi" element={<DaftarDisposisi />}/>
            <Route path="/disposisi/detail-disposisi/:no_reg" element={<DetailDisposisi />}/>
            <Route path="/user/users" element={<DaftarPengguna />} />
            <Route path="/user/users/daftar-peran" element={<DaftarPeran />} />
            <Route path="/user/unit-pengolah" element={<UnitPengolah />} />
            <Route path="/user/daftar-notifikasi" element={<DaftarNotifikasi />}/>
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/create-daftar-pelayanan" element={<CreateDaftarPelayanan />}/>
            <Route path="/update-daftar-pelayanan/:id" element={<UpdateDaftarPelayanan />}/>
          </>
        )}

        {/* Halaman untuk kepala madrasah */}
        {isAuthenticated() && isKepalaMadrasah() && (
          <>
            <Route path="/dashboard-staff" element={<DashboardStaff />} />
            <Route path="/surat/surat-masuk" element={<SuratMasuk />} />
            <Route path="/surat/surat-keluar" element={<SuratKeluar />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/user/settings" element={<Settings />} />
          </>
        )}

        {/* Halaman untuk staff */}
        {isAuthenticated() && isStaff() && (
          <>
            <Route path="/dashboard-staff" element={<DashboardStaff />} />
            <Route path="/surat/surat-masuk" element={<SuratMasuk />} />
            <Route path="/surat/surat-keluar" element={<SuratKeluar />} />
            <Route path="/settings/daftar-settings" element={<DaftarSettings/>}/>
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/profile/edit" element={<EditProfile/>} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
