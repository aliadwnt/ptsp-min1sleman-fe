import React from 'react';
import { Link } from 'react-router-dom'; // Import Link if using React Router
import logo from '../images/logo_man_1.png'
const Footer = () => {
  return (
    <footer className="bg-white-800 text-center text-blue lg:text-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Main container div: holds the entire content of the footer */}
      <div className="mx-16 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Tailwind Elements section */}
          <div>
            <div className="flex">
            <img src={logo} alt="PTSP Logo" className="w-12 h-12 rounded-full center" />
              <h4 className="mb-4 mx-5 flex items-center justify-start font-bold uppercase md:justify-start">
                MAN 1 YOGYAKARTA
              </h4>
            </div>
            <h5 className="mb-4 flex items-center justify-start font-semibold md:justify-start">
              Hubungi Kami :
            </h5>
            <h5 className="mb-4 flex items-start justify-start font-semibold text-left md:justify-start">
    Jalan C. Simanjutak No. 60 Kota Yogyakarta, Daerah Istimewa Yogyakarta, 55223
</h5>

            <h5 className="mb-4 flex items-center justify-start font-semibold md:justify-start">
              Phone: +62 858-6924-0876
            </h5>
            <h5 className="mb-4 flex items-start justify-start font-semibold text-left md:justify-start">
              Email: info@man1yogyakarta.sch.id
            </h5>
          </div>

          {/* Useful links section */}
          <div className="ml-10">
            <h6 className="mb-4 flex justify-center font-bold uppercase md:justify-start">
              Link Terkait
            </h6>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://man1yogyakarta.sch.id/profil/sejarah-singkat" className="text-blue">Sejarah Singkat</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://man1yogyakarta.sch.id/profil/visi-misi" className="text-blue">Visi Misi</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://man1yogyakarta.sch.id/profil/sarana-dan-prasarana" className="text-blue">Sarana dan Prasarana</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://man1yogyakarta.sch.id/profil/kepala-madrasah" className="text-blue">Kepala Madrasah</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://man1yogyakarta.sch.id/profil/struktur-man-1-yogyakarta" className="text-blue">Struktur MAN 1 Yogyakarta</Link>
            </h5>
          </div>

          {/* Related Websites section */}
          <div className="ml-10">
            <h6 className="mb-4 flex justify-center font-bold uppercase md:justify-start">
              WEBSITE TERKAIT
            </h6>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://ppdb.man1yogyakarta.sch.id/" className="text-blue">PPDB</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://sidimas.man1yogyakarta.sch.id/" className="text-blue">SIDIMAS</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://library.man1yogyakarta.sch.id/" className="text-blue">Perpustakaan</Link>
            </h5>
            <h5 className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <Link to="https://man1yogyakarta.sch.id/" className="text-blue">Website MAN 1 Yogyakarta </Link>
            </h5>
          </div>

          {/* Related Information section */}
          <div className="ml-10">
            <h6 className="mb-4 flex items-start justify-start font-bold text-left md:justify-start">
              INFORMASI TERKAIT
            </h6>
            <h5 className="mb-4 flex items-start justify-start font-semibold text-left md:justify-start">
              <a href="#!" className="text-black">
                Sistem Informasi Pelayanan Publik Terpadu Satu Pintu merupakan Program Unggulan Sekolah Cerdas Mandiri Yogyakarta.
              </a>
            </h5>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-blue-100 p-6 text-center">
        <span>© Copyright</span>
        <a className="font-semibold text-blue ml-1 mr-1" href="#">
    MAN 1 YOGYAKARTA
</a>

        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
