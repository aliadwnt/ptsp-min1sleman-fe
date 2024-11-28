import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_min_1 copy.png";

const Footer = () => {
  return (
    <footer className="select-none font-family bg-green-700 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="PTSP Logo"
                className="w-16 h-16 rounded-full mr-4"
              />
              <h4 className="font-bold text-2xl text-white">MIN 1 SLEMAN</h4>
            </div>
            <h5 className="font-semibold text-lg mb-2">Hubungi Kami :</h5>
            <p className="text-sm text-left sm:text-left mb-2">Jl. Magelang Km. 4, Sinduadi, Mlati, Sleman, Daerah Istimewa Yogyakarta, 55223</p>
            <p className="text-sm text-center sm:text-left mb-2">Phone: (0274) 557464</p>
            <p className="text-sm text-center sm:text-left mb-2">Email: minsatu.yk@gmail.com</p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h6 className="font-bold text-lg text-white mt-10 mb-4">LINK TERKAIT</h6>
            <ul className="space-y-2">
              <li>
                <Link to="https://min1sleman.sch.id/sejarah-pendirian/" className="hover:text-green-900">
                  Sejarah Singkat
                </Link>
              </li>
              <li>
                <Link to="https://min1sleman.sch.id/visi-misi/" className="hover:text-green-900">
                  Visi Misi
                </Link>
              </li>
              <li>
                <Link to="https://min1sleman.sch.id/fasilitas/" className="hover:text-green-900">
                  Sarana dan Prasarana
                </Link>
              </li>
              <li>
                <Link to="https://min1sleman.sch.id/gtk/" className="hover:text-green-900">
                  Guru dan Staff
                </Link>
              </li>
              <li>
                <Link to="https://min1sleman.sch.id/struktur-organisasi/" className="hover:text-green-900">
                  Struktur MIN 1 Sleman
                </Link>
              </li>
            </ul>
          </div>

          {/* Related Websites */}
          <div className="flex flex-col items-center sm:items-start">
          <h6 className="font-bold text-lg text-white mt-10 mb-4">WEBSITE TERKAIT</h6>
            <ul className="space-y-2">
              <li>
                <Link to="https://idcard.min1sleman.sch.id/login" className="hover:text-green-900">
                  Kartu Digital Siswa
                </Link>
              </li>
              <li>
                <Link to="https://min1sleman.sch.id/e-learning-min-1-sleman/" className="hover:text-green-900">
                  e-learning
                </Link>
              </li>
              <li>
                <Link to="https://perpusdigital.min1sleman.sch.id/" className="hover:text-green-900">
                  Perpustakaan
                </Link>
              </li>
              <li>
                <Link to="https://rapordigital.min1sleman.sch.id/" className="hover:text-green-900">
                  Rapor Digital
                </Link>
              </li>
              <li>
                <Link to="https://min1sleman.sch.id/" className="hover:text-green-900">
                  Website MIN 1 SLEMAN
                </Link>
              </li>
            </ul>
          </div>

          {/* Related Information */}
          <div className="flex flex-col items-center sm:items-start">
          <h6 className="font-bold text-lg text-white mt-10 mb-4">INFORMASI TERKAIT</h6>
            <p className="text-sm text-left sm:text-left mb-2">
              Sistem Informasi Pelayanan Publik Terpadu Satu Pintu merupakan Program Unggulan Sekolah Cerdas Mandiri Yogyakarta.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-3 bg-green-800 py-4 text-center text-white">
        <p>
          © {new Date().getFullYear()} <span className="p-2 font-semibold">MIN 1 SLEMAN</span> All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;