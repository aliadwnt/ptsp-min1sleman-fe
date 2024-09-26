import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Placeholder for Authenticated User Data
const user = {
    name: '(name user)',
    email: '(email user)',
    isImpersonating: true,
};

const UserProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log('User logged out');
        navigate('/');
    };

    return (
<header className="headerr">

            {/* Left side: Title or logo */}
            <div className="textheader">
                </div>
            {/* Right side: Button */}
            <div className="relative inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    @username
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <div className="px-4 py-2">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>

                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => navigate('/')}
                            >
                                Dashboard
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => navigate('/user/settings')}
                            >
                                Settings
                            </button>

                            <div className="border-t border-gray-100"></div>
                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => navigate('/profile/edit')}
                            >
                                Profile
                            </button>
                            <div className="border-t border-gray-100"></div>
                            <button
                                onClick={() => navigate('/')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default UserProfileMenu;
