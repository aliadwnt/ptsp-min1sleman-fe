import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import DonutChart from "../../components/DonutChartPelayanan";
import TableService from "../../components/TablePelayanan";
import AppCard from "../../components/app-card";
import Card from "../../components/card";
import { fetchDaftarPelayanan } from "../../services/daftarPelayananService";
import LoadingPage from "../../components/loadingPage";
import Favicon from "../../components/Favicon";

const DashboardAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [totalPendaftar, setTotalPendaftar] = useState(0);
  const [totalDiproses, setTotalDiproses] = useState(0);
  const [totalDiterima, setTotalDiterima] = useState(0);
  const [totalDitolak, setTotalDitolak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(""); // state for userRole
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prevState) => !prevState);

  const fetchData = async () => {
    try {
      const dataPelayanan = await fetchDaftarPelayanan();
      setTotalPendaftar(dataPelayanan.length);
      setTotalDiproses(dataPelayanan.filter((item) => item.status === "Proses").length);
      setTotalDiterima(dataPelayanan.filter((item) => item.status === "Diambil").length);
      setTotalDitolak(dataPelayanan.filter((item) => item.status === "Ditolak").length);
      setIsLoading(false); // Make sure this is called after data is fetched
    } catch (error) {
      console.error("Failed to fetch data", error);
      setIsLoading(false); // Disable loading if there is an error
    }
  };

  useEffect(() => {
    // Get token and userRole from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      const userRoleFromStorage = localStorage.getItem("userRole");
      setUserRole(userRoleFromStorage); // Set the userRole from localStorage
    }

    // Fetch data if needed
    fetchData();
    document.title = `PTSP MIN 1 SLEMAN - Dashboard`;
  }, []); // Empty dependency array so it runs only once

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "superadmin":
          return "Super Admin";
      case "staff":
        return "Staff Sekolah";
      case "kepala madrasah":
        return "Kepala Madrasah";
      default:
        return "Unknown Role";
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="h-screen flex relative">
      <Favicon />
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg w-64 z-50`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "lg:ml-64" : "ml-0"} pl-0 lg:pl-64`}
      >
        <Header />
        <div className="p-4">
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="w-full bg-white shadow-lg rounded-lg px-6 py-8 mx-auto max-w-5xl">
                <div className="select-none text-xl font-semibold text-gray-800 mb-4">
                  Dashboard PTSP MIN 1 SLEMAN
                </div>
                <section className="select-none grid grid-cols-2 gap-4 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4 sm:px-0 lg:px-8">
                  <Card
                    title="Total Pendaftar"
                    count={totalPendaftar}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-100"
                    iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <Card
                    title="Total Diproses"
                    count={totalDiproses}
                    iconColor="text-yellow-600"
                    bgColor="bg-yellow-100"
                    iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                  <Card
                    title="Total Diterima"
                    count={totalDiterima}
                    iconColor="text-green-600"
                    bgColor="bg-green-100"
                    iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                  <Card
                    title="Total Ditolak"
                    count={totalDitolak}
                    iconColor="text-red-600"
                    bgColor="bg-red-100"
                    iconPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </section>
                <div className="flex flex-col lg:flex-row gap-4 mx-auto max-w-7xl sm:px-0 lg:px-8 my-6">
                  <DonutChart />
                  <TableService />
                </div>
                <div className="py-4 space-y-4 sm:py-8 sm:space-y-8 w-full">
                  <AppCard
                    title="Welcome to PTSP MIN 1 SLEMAN"
                    description={`You're logged in as ${getRoleText(userRole)}.`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
