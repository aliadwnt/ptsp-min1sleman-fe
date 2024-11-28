import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationMenu = ({ menuPaths, isMobile = false }) => {
  const location = useLocation();

  return (
    <ul className={isMobile ? "flex flex-col space-y-4" : "flex space-x-5"}>
      {menuPaths.map(({ path, label }, index) => (
        <li key={index}>
          <Link
            to={path}
            className={`flex flex-col gap-2 my-2 font-poppins transition-colors duration-300 ease-in-out ${
              location.pathname === path
                ? isMobile
                  ? "text-green-600 font-bold"
                  : "text-white font-bold"
                : isMobile
                ? "text-gray-800 hover:text-green-500"
                : "text-white hover:text-green-600"
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
