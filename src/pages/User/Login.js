import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import { loginPengguna } from "../../services/daftarPenggunaService";
import { motion } from "framer-motion";
import Favicon from "../../components/Favicon";
import backgroundImage from "../../images/backgroundLoginRegister.jpg";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Masuk Akun";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginPengguna({ email, password });

      if (!data || !data.token || !data.user || typeof data.user.is_admin === "undefined") {
        throw new Error("Data tidak lengkap");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.is_admin);

      console.log("Token disimpan:", localStorage.getItem("token"));
      console.log("UserRole disimpan:", localStorage.getItem("userRole"));

      if (data.user.is_admin === 1 || data.user.is_admin === 2) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      if (error.message.includes("email")) {
        setErrorMessage("Email tidak ditemukan.");
      } else if (error.message.includes("password")) {
        setErrorMessage("Password yang Anda masukkan salah.");
      } else {
        setErrorMessage("Data yang anda masukkan salah.");
      }
    }
  };

  return (
    <div
      className="select-none h-screen flex items-center justify-center bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${backgroundImage})`, 
      }}
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
          - Masuk PTSP MIN 1 SLEMAN -
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

        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="font-family mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Masuk
          </button>
          <div
            className="font-family mt-4 text-center text-gray-700 cursor-pointer transition-colors duration-300"
            onClick={() => navigate("/register")}
          >
            Belum punya akun?{" "}
            <span className="text-green-600 hover:underline">
              Daftar di sini
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
