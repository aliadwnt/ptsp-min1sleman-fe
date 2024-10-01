import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { createDaftarPengguna } from '../../services/daftarPenggunaService'; 

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

    // Simple validation for password confirmation
    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      // Pass an object with required fields to createDaftarPengguna
      await createDaftarPengguna({ name, email, password });
      
      // Set success message and reset form
      setSuccessMessage('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to login page after a short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      // Display error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-form-ptsp">
      <h2 className="register-heading font-poppins">REGISTER</h2>
      <h5 className="register-title">PTSP MAN 1 Yogyakarta</h5>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group-ptsp">
          <label htmlFor="name" className="label-ptsp">Nama Lengkap:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-ptsp"
            required
          />
        </div>
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
        <div className="form-group-ptsp">
          <label htmlFor="confirmPassword" className="label-ptsp">Konfirmasi Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-ptsp"
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        <div className="backlogin">
          <span
            className='backlogin'
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer' }}
          >
            Sudah punya akun? Login di sini
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
