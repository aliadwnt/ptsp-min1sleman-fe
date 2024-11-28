import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { motion } from "framer-motion";
import backgroundImage from "../../images/backgroundLoginRegister.jpg";
import Favicon from "../../components/Favicon";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Daftar Akun";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, dan angka."
      );
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Format email tidak valid. example@gmail.com");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok");
      return;
    }

    try {
      await register({ name, email, password });

      setSuccessMessage(
        "Pendaftaran berhasil! Anda akan diarahkan ke halaman login."
      );
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="select-none h-screen flex items-center justify-center bg-center bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Favicon />
      <motion.div
        className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full mx-auto relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <div className="flex justify-center mb-2">
            <img
              src={require("../../../src/images/logo_min_1.png")}
              alt="Logo"
              className="w-16 h-16 transition-transform transform hover:scale-110 hover:duration-300"
            />
          </div>
        </Link>

        <motion.h2
          className="font-family text-2xl font-bold text-center text-gray-800 mb-2 tracking-wide"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          PTSP MIN 1 SLEMAN
        </motion.h2>
        <motion.h5
          className="font-family text-sm font-light text-center text-gray-700 mb-3"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          - Buat akun untuk melakukan login -
        </motion.h5>

        {errorMessage && (
          <motion.div
            className="flex items-center bg-red-600 text-white p-3 rounded-md mb-4 font-family"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ExclamationCircleIcon className="h-6 w-6 mr-2" />
            <p className="font-normal text-sm">{errorMessage}</p>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            className="flex items-center bg-green-600 text-white p-3 rounded-md mb-4 font-family"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-normal text-sm">{successMessage}</p>
          </motion.div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-family mt-2 w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-green-500"
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
              className="font-family mt-2 w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-green-500"
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
              className="font-family mt-2 w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-green-500"
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
              className="font-family mt-2 w-full p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-green-500"
              placeholder="Ulangi Password"
              required
            />
          </div>
          <button
            type="submit"
            className="font-family mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Daftar
          </button>
          <div
            className="font-family mt-4 text-center text-gray-700 cursor-pointer transition-colors duration-300"
            onClick={() => navigate("/login")}
          >
            Sudah punya akun?{" "}
            <span className="text-green-600 hover:underline">Masuk di sini</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
