import React, { useState } from "react";

function DeleteAccount() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [password, setPassword] = useState("");
    
    // Function to handle the confirmation of deletion
    const confirmUserDeletion = () => {
        setIsModalOpen(true);
    };

    // Function to handle the actual deletion
    const deleteUser = () => {
        if (password) {
            // Logic to delete the user account
            console.log("Account deleted");
            setIsModalOpen(false); // Close modal after deletion
        } else {
            console.log("Password is required");
        }
    };

    return (
        <div className="app-card">
            <div className="card-title">
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
                                <label htmlFor="password">Password</label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    className="block w-full mt-1" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    autoComplete="password" 
                                />
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
            </div>
        </div>
    );
}

export default DeleteAccount;
