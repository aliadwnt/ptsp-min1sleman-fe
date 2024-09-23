import React from 'react';
import { Link } from 'react-router-dom'; 
import jumbotronImage from '../images/jumbotron.png'; 
import groupImage from '../images/group0.svg'; 
import vectorImage from '../images/vector0.svg'; 
import vectorImage2 from '../images/vector1.svg'; 
import '../App.css'; 

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <img src={jumbotronImage} alt="Background Image" className="jumbotron-bg" />

      <div className="heading">
        {/* Replace this with your main navigation component */}
        {/* <LivewireMainNavigation /> */}

        <div className="txt">
          <div className="selamat-datang-di-ptsp">Selamat Datang di</div>
          <div className="ptsp-container">
            <div className="ptsp">PTSP</div>
            <div className="man-1">MAN 1 YOGYAKARTA</div>
          </div>
        </div>

        <div className="pelayanan-terpadu-satu-pintu">Pelayanan Terpadu Satu Pintu</div>
        <div className="box">
          <div className="cont-1">
            <img className="group" src={groupImage} alt="Group Icon" />
            <div className="daftar-pelayanan">Daftar Pelayanan</div>
            <div className="description mr-5">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>
          <div className="cont-2">
            <img className="vector" src={vectorImage} alt="Vector Icon" />
            <div className="lacak-permohonan">Lacak Permohonan</div>
            <div className="description mr-5">
              Lacak dan Pantau kemajuan Proses permohonan yang anda ajukan dari manapun kapanpun
            </div>
          </div>
          <div className="cont-3">
            <img className="group2" src={groupImage} alt="Group Icon" />
            <div className="buat-permohonan-layanan">Buat Permohonan Layanan</div>
            <div className="description mr-5">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>
          <div className="cont-4">
            <img className="vector2" src={vectorImage2} alt="Vector Icon" />
            <div className="help-desk">Help Desk</div>
            <div className="description mr-5">
              Pelajari dan persiapkan kelengkapan dokumen sebelum melakukan Pengajuan Permohonan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
