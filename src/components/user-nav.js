
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../src/services/authService';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState(null); 

    useEffect(() => {
        const userData = {
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
        };
        if (userData.name) {
            setUser(userData); 
        }
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            console.log("User logged out");
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
      
            setUser(null);
            window.location.href = "/home";
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return (
        <nav className>
            <div className="px-2 mx-auto w-full sm:px-3 lg:px-5">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <div className="lg:hidden flex items-center shrink-0">
                            <img src="/path-to-your-logo.png" alt="Logo" />
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {user ? (
                            <div className="relative ml-3">
                                <div>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
                                        >
                                            {user.name} 
                                            <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="block px-4 py-2 text-sm text-gray-700">
                                            {user.name} 
                                            <div className="text-xs text-gray-400">{user.email}</div> 
                                        </div>
                                        <div className="border-t border-gray-200"></div>
                                        <button
                                            onClick={handleLogout} 
                                            className="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')} 
                                className="inline-flex items-center px-4 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none focus:bg-gray-50"
                            >
                                LOGIN
                            </button>
                        )}
                    </div>

                    <div className="flex items-center -mr-2 sm:hidden">
                        <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                            <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={`${open ? 'hidden' : 'inline-flex'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={`${open ? 'inline-flex' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${open ? 'block' : 'hidden'} sm:hidden`}>
                <div className="pt-2 pb-3 space-y-1">
                    <a href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Dashboard</a>
                    <a href="/users" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Users</a>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="flex items-center px-4">
                        {user ? (
                            <div>
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div> 
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="text-gray-700 hover:bg-gray-100">Login</button>
                        )}
                    </div>
                    <div className="mt-3 space-y-1">
                        {user ? (
                            <>
                                <a href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Home</a>
                                <a href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Settings</a>
                                <button onClick={handleLogout} className="block w-full py-2 pl-3 pr-4 text-base font-medium text-left text-gray-600 hover:text-gray-800">Log Out</button>
                            </>
                        ) : (
                            <button onClick={() => navigate('/login')} className="block w-full py-2 pl-3 pr-4 text-base font-medium text-left text-gray-600 hover:text-gray-800">Login</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;