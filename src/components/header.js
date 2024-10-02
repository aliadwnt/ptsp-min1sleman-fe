import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import fetchDaftarPengguna from '../services/daftarPenggunaService';

const UserProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({ name: '(name user)', email: '(email user)', isImpersonating: false });
    const navigate = useNavigate();

    // Mengambil data pengguna saat komponen pertama kali dimuat
    useEffect(() => {
        const fetchDaftarPengguna = async () => {
            try {
                const userData = await fetchDaftarPengguna(); // Ambil data pengguna
                setUser({
                    name: userData.name || '(name user)', // Atur nama pengguna
                    email: userData.email || '(email user)', // Atur email pengguna
                    isImpersonating: userData.isImpersonating || false, // Atur status impersonasi
                });
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchDaftarPengguna();
    }, []); // Hanya dijalankan sekali saat komponen dimuat

    const toggleDropdown = () => {
        setIsOpen(prev => !prev); // Gunakan fungsi updater untuk memperbarui state
    };

    const handleLogout = () => {
        console.log('User logged out');
        // Hapus data pengguna dari localStorage (jika diperlukan)
        localStorage.removeItem('first_name');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        navigate('/'); // Arahkan ke halaman utama setelah logout
    };

    return (
        <header className="headerr">
            {/* Left side: Title or logo */}
            <div className="textheader"></div>
            {/* Right side: Button */}
            <div className="relative inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {user.name} 
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
                                onClick={handleLogout}
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
