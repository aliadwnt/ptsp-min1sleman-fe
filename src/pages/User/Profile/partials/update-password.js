import React, { useState } from 'react';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessages({});
        setSuccessMessage('');

        // Form validation (you can customize this as needed)
        const errors = {};
        if (!currentPassword) errors.currentPassword = 'Current password is required.';
        if (!newPassword) errors.newPassword = 'New password is required.';
        if (newPassword !== newPasswordConfirmation) {
            errors.newPasswordConfirmation = 'New passwords do not match.';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            setLoading(false);
            return;
        }

        // Simulating API call
        try {
            // Replace with your API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSuccessMessage('Password updated successfully.');
            // Reset form fields if needed
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordConfirmation('');
        } catch (error) {
            setErrorMessages({ api: 'Failed to update password.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-2">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-full mx-auto">
                <h2 className="text-lg font-semibold">{'Update Password'}</h2>
                <p className="text-sm text-gray-600">{'Ensure your account is using a long, random password to stay secure.'}</p>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                            {'Current Password'}
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        {errorMessages.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{errorMessages.currentPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            {'New Password'}
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {errorMessages.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{errorMessages.newPassword}</p>
                        )}
                    </div>

                    {/* New Password Confirmation */}
                    <div>
                        <label htmlFor="newPasswordConfirmation" className="block text-sm font-medium text-gray-700">
                            {'New Password Confirmation'}
                        </label>
                        <input
                            type="password"
                            id="newPasswordConfirmation"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                            value={newPasswordConfirmation}
                            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                            required
                        />
                        {errorMessages.newPasswordConfirmation && (
                            <p className="mt-1 text-sm text-red-600">{errorMessages.newPasswordConfirmation}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                        {errorMessages.api && <p className="text-sm text-red-600">{errorMessages.api}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
