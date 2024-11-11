import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_min_1 copy.png";

const Footer = () => {
  return (
    <footer
      className="bg-white-800 text-center text-blue lg:text-left"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-16 py-10 text-center md:text-left">
        <div className="grid grid-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="ml-2">
            <div className="flex items-center">
              <img
                src={logo}
                alt="PTSP Logo"
                className="w-12 h-12 rounded-full"
              />
              <h4 className="mb-4 mx-5 flex items-center font-bold uppercase">
                MIN 1 SLEMAN
              </h4>
            </div>
            <h5 className="mb-4 font-bold uppercase">Hubungi Kami :</h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              Jl. Magelang Km. 4, Sinduadi, Mlati, Sleman, Daerah Istimewa
              Yogyakarta, 55223
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              Phone: (0274) 557464
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              Email: minsatu.yk@gmail.com
            </h5>
          </div>

          {/* Useful links section */}
          <div className="ml-2">
            <h6 className="mb-4 font-bold uppercase">Link Terkait</h6>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://min1sleman.sch.id/sejarah-pendirian/"
                className="text-blue"
              >
                Sejarah Singkat
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://min1sleman.sch.id/visi-misi/"
                className="text-blue"
              >
                Visi Misi
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://min1sleman.sch.id/fasilitas/"
                className="text-blue"
              >
                Sarana dan Prasarana
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link to="https://min1sleman.sch.id/gtk/" className="text-blue">
                Guru dan Staff
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://min1sleman.sch.id/struktur-organisasi/"
                className="text-blue"
              >
                Struktur MIN 1 Sleman
              </Link>
            </h5>
          </div>

          <div className="ml-2">
            <h6 className="mb-4 font-bold uppercase">WEBSITE TERKAIT</h6>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://idcard.min1sleman.sch.id/login"
                className="text-blue"
              >
                Kartu Digital Siswa
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://min1sleman.sch.id/e-learning-min-1-sleman/"
                className="text-blue"
              >
                e-learning
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://perpusdigital.min1sleman.sch.id/"
                className="text-blue"
              >
                Perpustakaan
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link
                to="https://rapordigital.min1sleman.sch.id/"
                className="text-blue"
              >
                Rapor Digital
              </Link>
            </h5>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <Link to="https://min1sleman.sch.id/" className="text-blue">
                Website MIN 1 SLEMAN
              </Link>
            </h5>
          </div>

          <div className="ml-2">
            <h6 className="mb-4 font-bold uppercase">INFORMASI TERKAIT</h6>
            <h5 className="mb-4 text-center font-semibold md:text-left">
              <a href="#!" className="text-black">
                Sistem Informasi Pelayanan Publik Terpadu Satu Pintu merupakan
                Program Unggulan Sekolah Cerdas Mandiri Yogyakarta.
              </a>
            </h5>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 p-6 text-center">
        <span>© Copyright</span>
        <a className="font-semibold text-blue ml-1 mr-1" href="#">
          MIN 1 SLEMAN
        </a>

        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;