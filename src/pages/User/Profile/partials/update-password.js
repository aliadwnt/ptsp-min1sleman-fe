import React, { useEffect, useState } from "react";
import {
  changePassword,
  getUserById,
} from "../../../../services/daftarPenggunaService";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordValidate: "",
  });

  const [saved, setSaved] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userId = JSON.parse(atob(token.split(".")[1])).userId;
          const data = await getUserById(userId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages({});
    setSuccessMessage("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(formData.newPassword)) {
      setErrorMessages({
        newPassword:
          "Password harus terdiri dari minimal 8 karakter, mengandung huruf besar, dan angka.",
      });
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.newPasswordValidate) {
      setErrorMessages({ newPasswordValidate: "Passwords do not match" });
      setLoading(false);
      return;
    }

    try {
      const DaftarPengguna = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        newPasswordValidate: formData.newPasswordValidate,
      };

      console.log("Sending data to API:", DaftarPengguna);

      const response = await changePassword(DaftarPengguna);
      setSaved(true);
      setSuccessMessage("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessages({
        api: error.response?.data?.message || "Failed to update password",
      });
      setSaved(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-full mx-auto">
        <h2 className="text-lg font-semibold">{"Update Password"}</h2>
        <p className="text-sm text-gray-600">
          {
            "Ensure your account is using a long, random password to stay secure."
          }
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              {"Current Password"}
            </label>
            <input
              type="password"
              id="oldPassword"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
              required
            />
            {errorMessages.oldPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errorMessages.oldPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              {"New Password"}
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              required
            />
            {errorMessages.newPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errorMessages.newPassword}
              </p>
            )}
          </div>

          {/* New Password Confirmation */}
          <div>
            <label
              htmlFor="newPasswordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              {"New Password Confirmation"}
            </label>
            <input
              type="password"
              id="newPasswordConfirmation"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              value={formData.newPasswordValidate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPasswordValidate: e.target.value,
                })
              }
              required
            />
            {errorMessages.newPasswordValidate && (
              <p className="mt-1 text-sm text-red-600">
                {errorMessages.newPasswordValidate}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            {successMessage && (
              <p className="text-sm text-green-600">{successMessage}</p>
            )}
            {errorMessages.api && (
              <p className="text-sm text-red-600">{errorMessages.api}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
