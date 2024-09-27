import React, { useState, useEffect } from "react";
import { getUserData, updateUserData, sendEmailVerification } from "../../../../services/daftarPenggunaService";

function UpdateProfile() {
    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [saved, setSaved] = useState(false);
    const [nothingChanged, setNothingChanged] = useState(false);
    const [resent, setResent] = useState(false);

    const [initialUserData, setInitialUserData] = useState({ name: "", email: "" });

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData();
                setName(userData.name);
                setEmail(userData.email);
                setEmailVerified(userData.hasVerifiedEmail);
                setInitialUserData({ name: userData.name, email: userData.email });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { name, email };

        // Check if the data has changed
        if (name === initialUserData.name && email === initialUserData.email) {
            setNothingChanged(true);
            setSaved(false);
        } else {
            try {
                await updateUserData(userData); // Update user data via service
                setSaved(true);
                setNothingChanged(false);
            } catch (error) {
                console.error("Error updating user data:", error);
                setSaved(false); // Reset saved state if update fails
            }
        }
    };

    // Resend email verification
    const handleResendVerification = async () => {
        try {
            await sendEmailVerification(); // Trigger email verification via service
            setResent(true);
        } catch (error) {
            console.error("Error resending verification email:", error);
            setResent(false); // Reset resent state if resend fails
        }
    };

    return (
        <div className="container mx-auto px-4 py-2">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
                <div className="text-lg font-semibold">
                    <h2>Profile Information</h2>
                </div>

                <div className="card-description mb-4">
                    <p>Update your account's profile information and email address.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="col-span-6 sm:col-span-4 mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>

                    {/* Email */}
                    <div className="col-span-6 sm:col-span-4 mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    {/* Email Verification */}
                    {!emailVerified && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                Your email address is unverified.
                                <button
                                    type="button"
                                    className="text-sm text-green-600 underline hover:text-green-900"
                                    onClick={handleResendVerification}
                                >
                                    Click here to re-send the verification email.
                                </button>
                            </p>

                            {resent && (
                                <p className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="actions mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        >
                            Save
                        </button>

                        {/* Success messages */}
                        {saved && (
                            <span className="action-message ml-3 text-green-600">
                                Saved.
                            </span>
                        )}
                        {nothingChanged && (
                            <span className="action-message ml-3 text-yellow-600">
                                Nothing Changed.
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
