import React from "react";

const TentangPTSP = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-4xl text-center font-semibold text-green-800 mb-6">
        Tentang PTSP
      </h1>
      <p className="text-black font-family-poppins text-start">
            Pelayanan Terpadu Satu Pintu (PTSP) merupakan salah satu program
            pemerintah dalam rangka peningkatan pelayanan publik, memangkas
            birokrasi pelayanan perizinan dan non perizinan, sebagai upaya
            mencapai good governance/kepemerintahan yang baik. PTSP dapat
            meminimalisir interaksi antara pengguna layanan dengan petugas dalam
            rangka terciptanya tata kelola pemerintahan yang baik dan bersih.
          </p>

          <div className="additional-content mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg shadow-md p-6 transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition duration-300">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Tujuan PTSP</h2>
              <p className="text-black mb-4">
                Dengan konsep ini, pengguna layanan cukup datang ke PTSP dan bertemu dengan petugas front office (FO) 
                kemudian menunggu proses selanjutnya. 
                <p>Adapun Tujuan dari PTSP Adalah: </p>
              </p>
              <ul className="list-disc ml-5 text-black space-y-2">
                <li>Mendekatkan Pelayanan Kepada Masyarakat</li>
                <li>Menyederhanakan Proses Pelayanan</li>
                <li>Mewujudkan Proses Pelayanan yang cepat, mudah, transparan, pasti, dan akuntabel</li>
                <li>Memberikan Akses yang lebih baik kepada masyarakat untuk memperoleh pelayanan</li>
              </ul>
            </div>

        {/* Sasaran PTSP */}
        <div className="bg-green-50 rounded-lg shadow-md p-6 transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition duration-300">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Sasaran PTSP</h2>
          <p className="text-black mb-4">
            Sasaran PTSP: Terwujudnya pelayanan publik yang cepat, mudah, transparan, pasti dan akuntabel dalam upaya meningkatkan 
            hak-hak masyarakat terhadap pelayanan publik.
          </p>
          <ul className="list-disc ml-5 text-black space-y-2">
            <li>Mendapatkan kemudahan layanan</li>
            <li>Memperoleh pelayanan yang lebih baik</li>
            <li>Mendapatkan kepastian & jaminan hukum</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TentangPTSP;
