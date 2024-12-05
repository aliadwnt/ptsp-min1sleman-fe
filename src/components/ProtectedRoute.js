const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    window.location.href = "/";
    return null; 
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    window.location.href = "/";
    return null;
  }

  return children;
};

export default ProtectedRoute;
