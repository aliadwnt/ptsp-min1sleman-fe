import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDaftarPengguna } from '../../services/daftarPenggunaService'; 
import { motion } from 'framer-motion';
import backgroundImage from '../../images/backgroundLoginRegister.jpg';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      await createDaftarPengguna({ name, email, password });
      
      setSuccessMessage('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div 
    className="h-screen flex items-center justify-center bg-center bg-cover" 
    style={{ backgroundImage: `url(${backgroundImage})` }}
    
  >
    
      <motion.div 
        className="bg-white px-5 py-3 rounded-lg shadow-lg max-w-md w-full mx-auto"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="font-family text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-wide"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          REGISTER
        </motion.h2>
        <motion.h5 
          className="font-family text-lg font-semibold text-center text-gray-700 mb-3"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          PTSP MIN 1 SLEMAN
        </motion.h5>

        {errorMessage && <p className="text-red-500 mb-2 font-bold">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-2 font-bold">{successMessage}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-family  mt-2 w-full p-1 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Nama Lengkap"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-family mt-2 w-full p-1 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-family mt-2 w-full p-1 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="font-family mt-2 w-full p-1 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Ulangi Password"
              required
            />
          </div>
          <button 
            type="submit" 
            className="font-family mt-3 w-full py-2 bg-blue-500 text-white font-semibold rounded transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            Register
          </button>
          <div 
            className="font-family mt-2 text-center text-gray-700 cursor-pointer hover:text-blue-500 transition-colors duration-300"
            onClick={() => navigate('/login')}
          >
            Sudah punya akun? Login di sini
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
