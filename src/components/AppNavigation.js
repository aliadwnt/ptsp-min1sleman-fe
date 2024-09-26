import React, { useState, useEffect } from 'react';
import { fetchDaftarPengguna } from '../services/daftarPenggunaService'; // Adjust the import path as needed

const AppNavigation = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null); // State to hold user data
    const [error, setError] = useState(null); // State to hold error messages

    useEffect(() => {
        // Fetch user data from the service
        const fetchUserData = async () => {
            try {
                const data = await fetchDaftarPengguna(); // Use the service function
                // Assuming the API returns an array and we want the first user
                setUser(data[0]); // Adjust this according to your API response structure
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data.');
            }
        };

        fetchUserData();
    }, []); // Runs once when the component mounts

    if (error) {
        return <div>{error}</div>; // Render error message if fetching fails
    }

    if (!user) {
        return <div>Loading...</div>; // Render loading state while fetching user data
    }

    return (
        <nav className="bg-green-500 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="lg:hidden flex items-center shrink-0">
                            <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-8" />
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:flex">
                            <a href="/user/dashboard" className="text-gray-500 hover:text-gray-700">
                                Dashboard
                            </a>
                            <a href="/user/users" className="text-gray-500 hover:text-gray-700">
                                Users
                            </a>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {/* Settings Dropdown */}
                        <div className="relative ml-3">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700"
                            >
                                {user.first_name} {/* Use the first_name property */}
                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1">
                                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-400 px-4">
                                        {user.email}
                                    </div>

                                    {/* Dropdown Links */}
                                    <a href="/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Home
                                    </a>
                                    <a href="/user/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Settings
                                    </a>
                                    <a href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        Profile
                                    </a>
                                    <button
                                        onClick={() => console.log('Logout')}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="flex items-center -mr-2 sm:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400"
                        >
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

            {/* Mobile Menu */}
            {open && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <a href="/user/dashboard" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Dashboard
                        </a>
                        <a href="/user/users" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Users
                        </a>
                    </div>

                    {/* Mobile Settings */}
                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center px-4">
                            <div>
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <a href="/home" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Home
                            </a>
                            <a href="/user/settings" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Settings
                            </a>
                            <a href="/user/profile" className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Profile
                            </a>
                            <button
                                onClick={() => console.log('Logout')}
                                className="block w-full px-4 py-2 text-base font-medium text-left text-gray-600 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AppNavigation;
