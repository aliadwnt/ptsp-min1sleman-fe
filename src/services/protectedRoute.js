import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Periksa apakah token ada

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace /> // Redirect ke halaman login jika tidak ada token
  );
};

export default ProtectedRoute;
