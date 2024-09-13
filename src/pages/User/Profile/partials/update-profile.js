import React, { useState } from "react";

function UpdateProfile({ user, sendEmailVerification }) {
    // State for form fields
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [emailVerified, setEmailVerified] = useState(user.hasVerifiedEmail);
    const [saved, setSaved] = useState(false);
    const [nothingChanged, setNothingChanged] = useState(false);
    const [resent, setResent] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === user.name && email === user.email) {
            setNothingChanged(true);
            setSaved(false);
        } else {
            // Logic to handle profile update (e.g., API call)
            console.log("Profile updated:", { name, email });
            setSaved(true);
            setNothingChanged(false);
        }
    };

    // Resend email verification
    const handleResendVerification = () => {
        sendEmailVerification();
        setResent(true);
    };

    return (
        <div className="form-card">
            <div className="card-title">
                <h2>Profile Information</h2>
            </div>

            <div className="card-description">
                <p>Update your account's profile information and email address.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="block w-full mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
                </div>

                {/* Email */}
                <div className="col-span-6 sm:col-span-4 mt-4">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="block w-full mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                {/* Email Verification */}
                {!emailVerified && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-white">
                            Your email address is unverified.
                            <button
                                type="button"
                                className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                onClick={handleResendVerification}
                            >
                                Click here to re-send the verification email.
                            </button>
                        </p>

                        {resent && (
                            <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="actions mt-4">
                    <button type="submit" className="button">
                        Save
                    </button>

                    {/* Success messages */}
                    {saved && (
                        <span className="action-message ml-3">
                            Saved.
                        </span>
                    )}
                    {nothingChanged && (
                        <span className="action-message ml-3">
                            Nothing Changed.
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;
