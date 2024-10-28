import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { createDaftarPengguna } from '../../services/daftarPenggunaService'; 
import Navbar from '../../components/navbar';
import { motion } from 'framer-motion';

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
    <div>
      <Navbar/>
      <motion.div 
        className="bg-white pr-5 pl-5 pt-3 pb-3 rounded-lg shadow-lg max-w-md w-full mx-auto mt-3" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
    <div>
      <h2 className="font-family font-bold text-2xl text-center text-gray-800 mb-2 ">REGISTER</h2>
      <h5 className="font-family text-center text-gray-900 text-base mb-3 font-bold">PTSP MIN 1 SLEMAN</h5>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-2 font-poppins">
          <label htmlFor="name" className="font-family text-m block mb-1 font-medium text-gray-800">Nama Lengkap :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-base box-border focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2 font-poppins">
          <label htmlFor="email" className="font-family text-m block mb-1 font-medium text-gray-800">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-base box-border focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2 font-poppins">
          <label htmlFor="password" className="font-family text-m block mb-1 font-medium text-gray-800">Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-base box-border focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2 font-poppins">
          <label htmlFor="confirmPassword" className="font-family text-m block mb-1 font-medium text-gray-800">Konfirmasi Password :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-base box-border focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="font-family w-full py-2 bg-blue-500 text-white border-none rounded transition duration-300 ease-in-out hover:bg-blue-700">Register</button>
        <div className="font-family mt-2 text-center text-grey-900 cursor-pointer hover:text-blue-500">
        <span
            onClick={() => navigate('/login')}
          >
            Sudah punya akun? Login di sini
          </span>
        </div>
      </form>
    </div>
    </motion.div>
    </div>
  );
};

export default RegisterForm;
