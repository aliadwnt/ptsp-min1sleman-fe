import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import { loginPengguna } from "../../services/daftarPenggunaService";
import { fetchSettings } from "../../services/settingsService";
import { motion } from "framer-motion";
import Favicon from "../../components/Favicon";
import backgroundImage from "../../images/backgroundLoginRegister.jpg";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import DEFAULT_LOGO_URL from "../../images/logo_min_1 copy.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(DEFAULT_LOGO_URL); 
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "PTSP MIN 1 SLEMAN - Masuk Akun";
  }, []);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetchSettings();

        if (Array.isArray(response)) {
          const logoSetting = response.find((item) => item.key === "app_logo");

          if (logoSetting && logoSetting.value) {
            setLogo(logoSetting.value); 
          }
        }
      } catch (error) {
        console.error("Error fetching logo:", error); 
      }
    };
    fetchLogo();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const data = await loginPengguna({ email, password });
  
      // Memastikan data lengkap dan memiliki role
      if (
        !data ||
        !data.token ||
        !data.user ||
        typeof data.user.role === "undefined"
      ) {
        throw new Error("Data tidak lengkap");
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
  
      setUserName(data.user.name);
  
      setShowModal(true);
  
      setTimeout(() => {
        if (
          data.user.role === "staff" ||
          data.user.role === "kepala madrasah"
        ) {
          window.location.href = "/dashboard-staff";
        } else if (
          data.user.role === "admin" ||
          data.user.role === "superadmin"
        ) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      }, 3000);
    } catch (error) {
      if (error.message.includes("email")) {
        setErrorMessage("Email tidak ditemukan.");
      } else if (error.message.includes("password")) {
        setErrorMessage("Password yang Anda masukkan salah.");
      } else {
        setErrorMessage("Data yang Anda masukkan salah.");
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
              src={logo}
              alt="App Logo"
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
            />
          </div>
          <div className="flex items-center w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-family mt-2 flex-1 p-2 border-b border-gray-300 text-base focus:outline-none focus:ring-0 focus:border-green-500"
              placeholder="Password"
            />
            <span
              role="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-3 mt-2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </span>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex justify-center items-center mb-4">
              <motion.img
                src={logo}
                alt="App Logo"
                className="w-16 h-16 rounded-full shadow-md"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </div>
            <motion.h2
              className="font-family text-3xl font-bold text-green-600 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome Back!
            </motion.h2>
            <motion.p
              className="font-family text-gray-700 text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Hi,{" "}
              <span className="text-green-600 font-semibold">{userName}</span>!
              Selamat datang kembali.
            </motion.p>
            <motion.div
              className="w-12 h-12 mx-auto mb-3 border-4 border-green-500 rounded-full border-t-transparent animate-spin"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            ></motion.div>
            <p className="font-family text-xs text-gray-500">
              Anda akan diarahkan ke halaman selanjutnya...
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
