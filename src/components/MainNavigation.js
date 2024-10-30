import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const MainNavigation = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-opacity-0 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">
        <div className="flex justify-between h-30">
          <div className="flex items-center shrink-0">
            <div className="navbar-brand">
              <Link to="/" className="pl-4 py-2">
                <img src="/path/to/logo.png" alt="Logo" /> 
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="hidden space-x-8 sm:-my-px sm:flex">
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Beranda
              </NavLink>
              <NavLink to="/lacak-permohonan" className={({ isActive }) => (isActive ? 'active' : '')}>
                Layanan
              </NavLink>
              <NavLink to="#visi-misi">Visi Misi</NavLink>
              <NavLink to="/lacak-berkas" className={({ isActive }) => (isActive ? 'active' : '')}>
                Lacak Berkas
              </NavLink>
              <NavLink to="#zi">Zona Integritas</NavLink>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center">
            {user ? (
              <div className="relative ml-3">
                <div className="inline-flex rounded-md">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md"
                  >
                    {user.firstName}
                    <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white">
                    <div className="block px-4 py-2">
                      <div className="text-sm text-gray-700">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                    <NavLink to="/user/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</NavLink>
                    <NavLink to="/user/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</NavLink>
                    <button onClick={logout} className="block w-full py-2 text-left hover:bg-gray-100">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2">
                <NavLink to="/login" className="btn-secondary">
                  Log In
                </NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center -mr-2 sm:hidden">
            <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2">
              <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/layanan" className={({ isActive }) => (isActive ? 'active' : '')}>
              Layanan
            </NavLink>
          </div>
          {user && (
            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div>
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <NavLink to="/user/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</NavLink>
              <NavLink to="/user/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</NavLink>
              <button onClick={logout} className="block w-full py-2 text-left hover:bg-gray-100">
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
