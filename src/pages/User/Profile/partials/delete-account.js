import React, { useState } from "react";
import { deleteDaftarPengguna } from '../../../../services/daftarPenggunaService';

function DeleteAccount({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const confirmUserDeletion = () => {
        setIsModalOpen(true);
        setError(""); 
        setSuccess(""); 
    };

    const deleteUser = async () => {
        if (password) {
            try {
                await deleteDaftarPengguna(id, password); 
                setSuccess("Your account has been successfully deleted."); 
                setIsModalOpen(false); 
                setPassword("");
            } catch (err) {
                setError("Failed to delete your account. Please try again."); 
            }
        } else {
            setError("Password is required to delete your account.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-2">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
                <h2 className="text-lg font-semibold">Delete Account</h2>
                <p className="text-sm text-gray-600">
                    Permanently delete your account.
                </p>
                <div className="max-w-lg text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </div>
                <div className="mt-4">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={confirmUserDeletion}
                    >
                        Delete Account
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <div className="modal-title">
                                <h3 className="text-lg font-semibold">Delete Account</h3>
                            </div>
                            <div className="mt-4 text-sm text-gray-600">
                                Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                            </div>
                            <div className="mt-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                    onClick={deleteUser}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {success && <p className="mt-4 text-sm text-green-600">{success}</p>} {/* Success message after deletion */}
            </div>
        </div>
    );
}

export default DeleteAccount;
