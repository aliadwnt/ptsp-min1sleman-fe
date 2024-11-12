import React, { useState, useEffect } from "react";
import {
  getUserById,
  updateDaftarPengguna,
  sendEmailVerification,
} from "../../../../services/daftarPenggunaService";
import LoadingPage from "../../../../components/loadingPage";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [saved, setSaved] = useState(false);
  const [nothingChanged, setNothingChanged] = useState(false);
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [resent, setResent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userId = JSON.parse(atob(token.split(".")[1])).userId;
          const data = await getUserById(userId);
          setFormData({
            name: data.name,
            email: data.email,
          });
          setInitialData({
            name: data.name,
            email: data.email,
          });
          setEmailVerified(data.emailVerified);
        }
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).userId;

    if (
      formData.name === initialData.name &&
      formData.email === initialData.email
    ) {
      setNothingChanged(true);
      setSaved(false);
    } else {
      try {
        setIsLoading(true); // Set loading to true when updating data
        const updatedData = await updateDaftarPengguna(userId, formData);
        console.log("Data yang berhasil diupdate:", updatedData);
        setSaved(true);
        setNothingChanged(false);
        setError(null);

        if (formData.email !== initialData.email) {
          await sendEmailVerification(userId, formData.email);
          setVerificationSent(true);
          setEmailVerified(false);
        }
        setIsLoading(false); // Set loading to false after update is done
      } catch (error) {
        console.error("Error updating user data:", error);
        setSaved(false);
        setNothingChanged(false);
        setError("Gagal memperbarui data pengguna. Cek kembali input Anda.");
        setIsLoading(false); // Set loading to false in case of an error
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = JSON.parse(atob(token.split(".")[1])).userId;
      setIsLoading(true); // Set loading to true while resending verification
      await sendEmailVerification(userId, formData.email);
      setResent(true);
      setVerificationSent(false);
      setIsLoading(false); // Set loading to false after sending the verification
    } catch (error) {
      console.error("Error resending verification email:", error);
      setError("Gagal mengirim ulang email verifikasi.");
      setIsLoading(false); 
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      
      {!isLoading && (
        <div className="container mx-auto px-4 py-2">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
            <div className="text-lg font-semibold">
              <h2>Profile Information</h2>
            </div>

            <div className="card-description mb-4">
              <p>Update your account's profile information and email address.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="col-span-6 sm:col-span-4 mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  autoComplete="name"
                />
              </div>

              <div className="col-span-6 sm:col-span-4 mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  autoComplete="email"
                />
              </div>

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
                  disabled={isLoading} 
                >
                  Save
                </button>

                {saved && (
                  <span className="action-message ml-3 text-green-600">
                    Update Profile Berhasil!
                  </span>
                )}
                {nothingChanged && (
                  <span className="action-message ml-3 text-yellow-600">
                    Tidak ada perubahan pada profil
                  </span>
                )}
                {error && (
                  <span className="action-message ml-3 text-red-600">{error}</span>
                )}
                {verificationSent && (
                  <span className="action-message ml-3 text-green-600">
                    Email verifikasi telah dikirim.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
