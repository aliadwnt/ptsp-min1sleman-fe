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
    <div>
      <Navbar />
      <motion.div 
        className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full mx-auto mt-16" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-family font-bold text-2xl text-center text-gray-800 mb-2">LOGIN</h2>
        <h5 className="font-family text-center text-gray-900 text-base mb-3 font-bold">PTSP MIN 1 SLEMAN</h5>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <label htmlFor="email" className="font-family text-m block mb-1 font-medium text-gray-800">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-family w-full p-2 border border-gray-300 rounded-md text-base box-border focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2  ">
            <label htmlFor="password" className="font-family text-m block mb-1 font-medium text-gray-800">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-base box-border focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="mb-2 font-family w-full py-2 bg-blue-500 text-white border-none rounded transition duration-300 ease-in-out hover:bg-blue-700">Login</button>
          <div>
          <div className='text-center'>
            <span
              className="font-family text-gray-900 cursor-pointer hover:text-blue-500"
              onClick={() => navigate('/register')}
            >
              Belum Punya Akun? Daftar di sini
            </span>
          </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
