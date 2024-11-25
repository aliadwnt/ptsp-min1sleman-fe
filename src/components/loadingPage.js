import React from 'react';
import { motion } from 'framer-motion';
import logo from '../images/logo_min_1.png';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <motion.div
        className="flex flex-col items-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Logo MIN 1"
          className="w-24 h-24 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Nama Sistem */}
        <motion.h1
          className="font-poppins text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        >
          Pelayanan Terpadu Satu Pintu
        </motion.h1>

        {/* Deskripsi Sistem */}
        <motion.h2
          className="font-poppins text-xl font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
        >
          MIN 1 SLEMAN
        </motion.h2>

        {/* Teks Memuat dengan Titik Tiga Berkedip */}
        <motion.div
          className="font-poppins text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Memuat
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1,
              times: [0, 0.33, 0.66, 1],
            }}
          >.</motion.span>
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1,
              times: [0, 0.33, 0.66, 1],
            }}
          >.</motion.span>
          <motion.span
            className="inline-block ml-1"
            animate={{ opacity: [0, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1,
              times: [0, 0.33, 0.66, 1],
            }}
          >.</motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
