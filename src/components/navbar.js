import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import Link dan useLocation
import logo from '../images/logo-kemenag.png'; 
import '../App.css'; 
import UserNav from '../components/user-nav'

const Navbar = () => {
  const location = useLocation();  // Mendapatkan path saat ini
  
  return (
    <nav className="nav-des">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="PTSP Logo" className="w-12 h-12 rounded-full" />
          <p className="text-center font-bold">PTSP MIN 1 SLEMAN</p>
        </div>

        <div className="flex items-center space-x-4">
          <ul className="flex space-x-5">
            <li>
              <Link 
                to="/" 
                className={`txt ${location.pathname === '/' ? 'active' : ''}`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link 
                to="/layanan" 
                className={`txt ${location.pathname === '/layanan' ? 'active' : ''}`}
              >
                Layanan
              </Link>
            </li>
            <li>
              <Link 
                to="/visi-misi" 
                className={`txt ${location.pathname === '/visi-misi' ? 'active' : ''}`}
              >
                Visi Misi
              </Link>
            </li>
            <li>
              <Link 
                to="/lacak-berkas" 
                className={`txt ${location.pathname === '/lacak-berkas' ? 'active' : ''}`}
              >
                Lacak Berkas
              </Link>
            </li>
            <li>
              <Link 
                to="/zona-integritas" 
                className={`txt ${location.pathname === '/zona-integritas' ? 'active' : ''}`}
              >
                Zona Integritas
              </Link>
            </li>
          </ul>
          <UserNav/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
