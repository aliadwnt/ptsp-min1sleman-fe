import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { loginPengguna } from '../../services/daftarPenggunaService'; 
import Navbar from '../../components/navbar';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Pass an object with email and password to loginPengguna
      const data = await loginPengguna({ email, password });

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Navigate to the dashboard upon successful login
      navigate('/dashboard');
    } catch (error) {
      // Display error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
            <Navbar />
    <div className="login-form-ptsp">
      <h2 className="login-heading">LOGIN</h2>
      <h5 className="login-title">PTSP MAN 1 Yogyakarta</h5>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group-ptsp">
          <label htmlFor="email" className="label-ptsp">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-ptsp"
            required
          />
        </div>
        <div className="form-group-ptsp">
          <label htmlFor="password" className="label-ptsp">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-ptsp"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="unmember">
          <span
            className="signup"
            onClick={() => navigate('/register')}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            Belum Punya Akun? Daftar di sini
          </span>
        </div>
        <div className="backhome">
          <span
            className='backhome'
            onClick={() => window.location.href = '/'}
            style={{ cursor: 'pointer' }}
          >
            Kembali ke halaman beranda
          </span>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
