// src/components/NotFoundPage.js
import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="font-family text-center bg-white p-8 rounded-xl shadow-md max-w-lg mx-auto">
        <ExclamationCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="font-family text-2xl font-bold text-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="font-family text-gray-600 text-base mb-6">
          Maaf, halaman yang Anda cari tidak ditemukan atau mungkin telah dihapus.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-white text-base font-medium bg-green-600 rounded-full shadow-md hover:bg-green-700 transition duration-300"
        >
          Kembali ke Halaman Utama
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
