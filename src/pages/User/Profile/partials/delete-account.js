import React, { useState } from "react";

function DeleteAccount() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const [success, setSuccess] = useState(""); // State for success messages

    // Function to handle the confirmation of deletion
    const confirmUserDeletion = () => {
        setIsModalOpen(true);
        setError(""); // Reset any previous error messages
        setSuccess(""); // Reset any previous success messages
    };

    // Function to handle the actual deletion
    const deleteUser = () => {
        if (password) {
            // Logic to delete the user account (mocked for this example)
            console.log("Account deleted"); // Replace this with actual deletion logic
            setSuccess("Your account has been successfully deleted."); // Set success message
            setIsModalOpen(false); // Close modal after deletion
            setPassword(""); // Clear the password field
        } else {
            setError("Password is required to delete your account."); // Set error message
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="text-lg font-semibold">
                <h2>Delete Account</h2>
            </div>

            <div className="card-description">
                <p>Permanently delete your account.</p>
            </div>

            <div className="card-content">
                <div className="max-w-lg text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </div>

                <div className="mt-4">
                    <button 
                        className="danger-button" 
                        onClick={confirmUserDeletion}
                    >
                        Delete Account
                    </button>
                </div>

                {/* Modal for confirming account deletion */}
                {isModalOpen && (
                    <div className="dialog-modal">
                        <div className="modal-title">
                            <h3>Delete Account</h3>
                        </div>

                        <div className="modal-content">
                            <div className="max-w-lg text-sm text-gray-600 dark:text-gray-400">
                                Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                            </div>

                            <div className="mt-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    autoComplete="current-password" 
                                />
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                            </div>
                        </div>

                        <div className="modal-footer mt-4">
                            <button 
                                className="secondary-button" 
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="danger-button ml-3" 
                                onClick={deleteUser}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}

                {success && <p className="mt-4 text-sm text-green-600">{success}</p>} {/* Success message after deletion */}
            </div>
        </div>
    );
}

export default DeleteAccount;
