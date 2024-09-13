import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if using react-router-dom
import '../../index.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    // Simulate login success
    navigate('/dashboard'); // Redirect to dashboard or another page
  };

  return (
      <div className="login-form-ptsp">
        <h2 className="login-heading">LOGIN</h2>
        <h5 className="login-title">PTSP MAN 1 Yogyakarta</h5>
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
            <text className="signup">Belum Punya Akun?</text>
          <br></br>
          <text className="signup">Hubungi Pihak Sekolah</text>
          </div>
          
          <div className="backhome">
      <span
        className='backhome'
        onClick={() => window.location.href = '/'} // Redirect to home on click
        style={{ cursor: 'pointer' }} // Optional: Change cursor to pointer
      >
        Kembali ke halaman beranda
      </span>
    </div>
        </form>
      </div>
  );
};

export default LoginForm;
