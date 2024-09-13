import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Layanan from './pages/Layanan';
import LacakPermohonan from './pages/LacakPermohonan';
import LacakBerkas from './pages/LacakBerkas';
import CreateLayanan from './pages/Layanan/CreateLayanan';
import AddLayanan from './pages/Layanan/AddLayanan';
import ListLayanan from './pages/Layanan/ListLayanan';
import JenisLayanan from './pages/Layanan/JenisLayanan';
import ArsipLayanan from './pages/Layanan/ArsipLayanan';
import DaftarSyarat from './pages/Layanan/DaftarSyarat';
import DaftarLayanan from './pages/Layanan/DaftarLayanan';
import OutputLayanan from './pages/Layanan/OutputLayanan';
import EditLayanan from './pages/Layanan/EditLayanan';
import UpdateLayanan from './pages/Layanan/UpdateLayanan';
import SyaratLayanan from './pages/Layanan/SyaratLayanan';
import MasterDisposisi from './pages/Disposisi/MasterDisposisi';
import DaftarDisposisi from './pages/Disposisi/DaftarDisposisi';
import SuratMasuk from './pages/Surat/SuratMasuk';
import SuratKeluar from './pages/Surat/SuratKeluar';
import CreateSuratMasuk from './pages/Surat/CreateSuratMasuk';
import CreateSuratKeluar from './pages/Surat/CreateSuratKeluar';
import Permohonan from './pages/Permohonan/Permohonan';
import EditProfile from './pages/User/Profile/Edit';
import Settings from './pages/User/Settings/Edit';
import UsersIndex from './pages/User/Users/Index';
import DaftarPeran from './pages/User/Users/DaftarPeran';
import UnitPengolah from './pages/User/Users/UnitPengolah';
import Login from './pages/User/Login';
import VisiMisi from './pages/visi-misi';
import ZonaIntegritas from './pages/zona-integritas';
import Dashboard from './pages/User/Dashboard';
import Setting from './pages/User/Settings/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/lacak-permohonan" element={<LacakPermohonan />} />
        <Route path="/lacak-berkas" element={<LacakBerkas />} />
        <Route path="/layanan/create-layanan" element={<CreateLayanan />} />
        <Route path="/layanan/add-layanan" element={<AddLayanan />} />
        <Route path="/layanan/list-layanan" element={<ListLayanan />} />
        <Route path="/layanan/jenis-layanan" element={<JenisLayanan />} />
        <Route path="/layanan/arsip-layanan" element={<ArsipLayanan />} />
        <Route path="/layanan/daftar-syarat" element={<DaftarSyarat />} />
        <Route path="/layanan/daftar-layanan" element={<DaftarLayanan />} />
        <Route path="/layanan/output-layanan" element={<OutputLayanan />} />
        <Route path="/layanan/:id/edit-layanan" element={<EditLayanan />} />
        <Route path="/layanan/:id/update-layanan" element={<UpdateLayanan />} />
        <Route path="/layanan/syarat-layanan" element={<SyaratLayanan />} />
        <Route path="/disposisi/master-disposisi" element={<MasterDisposisi />} />
        <Route path="/disposisi/daftar-disposisi" element={<DaftarDisposisi />} />
        <Route path="/surat/surat-masuk" element={<SuratMasuk />} />
        <Route path="/surat/surat-keluar" element={<SuratKeluar />} />
        <Route path="/surat/create-surat-masuk" element={<CreateSuratMasuk />} />
        <Route path="/surat/create-surat-keluar" element={<CreateSuratKeluar />} />
        <Route path="/permohonan" element={<Permohonan />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/user/settings" element={<Settings />} />
        <Route path="/user/users" element={<UsersIndex />} />
        <Route path="/user/users/daftar-peran" element={<DaftarPeran />} />
        <Route path="/user/unit-pengolah" element={<UnitPengolah />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/zona-integritas" element={<ZonaIntegritas />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting/>}/>
      </Routes>
    </Router>
  );
}

export default App;