import React, { useState } from "react";

function UpdatePassword() {
    // State management for passwords
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [updated, setUpdated] = useState(false); // For success message

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== newPasswordConfirmation) {
            alert("New password and confirmation do not match!");
            return;
        }
        // Logic to handle password update here, e.g., API call to update password
        console.log("Password updated successfully");
        setUpdated(true); // Show success message
        // Clear form fields
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirmation("");
    };

    return (
        <div className="form-card">
            <div className="card-title">
                <h2>Update Password</h2>
            </div>

            <div className="card-description">
                <p>Ensure your account is using a long, random password to stay secure.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Current Password */}
                <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="block w-full mt-1"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                {/* New Password */}
                <div className="col-span-6 sm:col-span-4 mt-4">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        className="block w-full mt-1"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                {/* New Password Confirmation */}
                <div className="col-span-6 sm:col-span-4 mt-4">
                    <label htmlFor="newPasswordConfirmation">New Password Confirmation</label>
                    <input
                        id="newPasswordConfirmation"
                        type="password"
                        className="block w-full mt-1"
                        value={newPasswordConfirmation}
                        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                        required
                    />
                </div>

                {/* Actions */}
                <div className="actions mt-4">
                    <button type="submit" className="button" disabled={!currentPassword || !newPassword || !newPasswordConfirmation}>
                        Save
                    </button>

                    {/* Success message */}
                    {updated && (
                        <span className="action-message ml-3">
                            Updated.
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}

export default UpdatePassword;
