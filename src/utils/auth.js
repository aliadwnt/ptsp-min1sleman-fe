export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log("Token ditemukan:", token);
  return token !== null;
};

export const isAdmin = () => {
  const userRole = parseInt(localStorage.getItem("userRole"), 10);
  console.log("userRole ditemukan:", userRole);
  return userRole === 1 || userRole === 2; // Admin dan Superadmin
};

export const isNotUser = () => {
  const userRole = parseInt(localStorage.getItem("userRole"), 10);
  console.log("userRole ditemukan:", userRole);
  return ![0, 1, 2].includes(userRole); // Bukan User/Admin/Superadmin
};
