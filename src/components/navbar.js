import React from 'react';
import logo from '../images/logo_man_1.png'; 
import '../App.css'; 

const Navbar = () => {
  return (
    <nav className="nav-des">
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex flex-col items-center space-y-4">
    <img src={logo} alt="PTSP Logo" className="w-12 h-12 rounded-full" />
    <p className="text-center font-bold">PTSP MAN 1 Yogyakarta</p>
</div>


        <div className="flex items-center space-x-4">
          <ul className="flex space-x-3">
            <li><a href="/" className="txt ">Beranda</a></li>
            <li><a href="/layanan" className="txt">Layanan</a></li>
            <li><a href="/visi-misi" className="txt">Visi Misi</a></li>
            <li><a href="/lacak-berkas" className="txt">Lacak Berkas</a></li>
            <li><a href="/zona-integritas" className="txt">Zona Integritas</a></li>
          </ul>
          <a href="/login" className="login-button-navbar">
  LOG IN
</a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
