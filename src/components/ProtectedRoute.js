import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole'); // Ambil userRole dari localStorage

  // Cek apakah userRole adalah 1 atau 2, jika tidak, arahkan ke halaman utama
  if (userRole !== '1' && userRole !== '2') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
