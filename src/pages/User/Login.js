import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { loginPengguna } from '../../services/daftarPenggunaService';
import Navbar from '../../components/navbar';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginPengguna({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-center bg-cover relative" 
        style={{ backgroundImage: `url(${require('../../images/backgroundLoginRegister.jpg')})` }}>
      
      <motion.div 
        className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full mx-auto mt-6 relative"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-2">
          <img 
            src={require('../../../src/images/logo_min_1.png')}
            alt="Logo"
            className="w-16 h-16" 
          />
        </div>

        <motion.h2
          className="font-family text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-wide"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          LOGIN
        </motion.h2>
        <motion.h5 
          className="font-family text-lg font-semibold text-center text-gray-700 mb-2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          PTSP MIN 1 SLEMAN
        </motion.h5>

        {errorMessage && <p className="text-red-500 mb-2 font-bold">{errorMessage}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-family mt-2 w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-blue-500"
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
              className="font-family mt-2 w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button 
            type="submit" 
            className="font-family mt-3 w-full py-2 bg-blue-500 text-white font-semibold rounded transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            Login
          </button>
          <div className="font-family mt-2 text-center text-gray-700 cursor-pointer hover:text-blue-500 transition-colors duration-300"
            onClick={() => navigate('/register')}
          >
            Belum punya akun? Daftar di sini
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
