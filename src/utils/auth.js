export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log("Token ditemukan:", token); 
  return token !== null;
};