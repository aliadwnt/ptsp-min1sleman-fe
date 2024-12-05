export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null; 
};

export const isAdmin = () => {
  const userRole = localStorage.getItem("userRole");
  return userRole === "admin";
};

export const isSuperAdmin = () => {
  const userRole = localStorage.getItem("userRole");
  return userRole === "superadmin";
};

export const isKepalaMadrasah = () => {
  const userRole = localStorage.getItem("userRole");
  return userRole === "kepala madrasah";
};

export const isStaff = () => {
  const userRole = localStorage.getItem("userRole");
  return userRole === "staff";
};

export const isNotUser = () => {
  const userRole = localStorage.getItem("userRole");
  return (
    !userRole ||
    !["admin", "user", "superadmin", "staff", "kepala madrasah"].includes(
      userRole
    )
  );
};
