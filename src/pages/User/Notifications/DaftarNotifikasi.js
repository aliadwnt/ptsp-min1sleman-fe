import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/header";
import { fetchNotification } from "../../../services/notificationService";
import "../../../App.css";

const Notifications = () => {
  const [Notifications, setNotifications] = useState([]);
  const [message] = useState("");

  useEffect(() => {
    fetchData(); // Panggil fetchData saat komponen dimuat
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchNotification();
      console.log("Fetched notifications:", response);
      setNotifications(response.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="bodyadmin flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div>
          <div className="texttitle">Daftar Notifikasi</div>

          {message && (
            <div
              className="p-4 m-8 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Sukses </span>
              {message}
            </div>
          )}

          <div className="flex flex-col mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Notifikasi
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {Notifications.length > 0 ? (
                        Notifications.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 text-center">
                              {index + 1}
                            </td>
                            <td className="px-6 py-2 text-center">
                              {new Date(item.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-2 text-center">
                              {item.message.perihal}
                            </td>
                            <td className="px-6 py-2 text-center">
                              <button
                                type="button"
                                className="ml-2 mr-2 flex items-center justify-center bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-colors duration-200"
                              >
                                <i className="fas fa-search"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; // Pastikan mengekspor dengan nama yang benar
