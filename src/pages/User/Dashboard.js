import React from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import DonutChart from '../../components/donut-chart'; // Ensure this path is correct
import TableService from '../../components/table-service'; // Ensure this path is correct
import AppCard from '../../components/app-card'; // Ensure this path is correct
import Card from '../../components/card'; // Import the Card component if it's in a separate file

const DashboardAdmin = () => {
    return (
        <div className="flex">
            {/* Sidebar with fixed width */}
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="flex-1 bg-gray-100">
                <Header />
                <div className="texttitle">
                    Dashboard Admin
                </div>

                <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Reusable Card components */}
                    <Card title="Total Pendaftar" count={62} iconColor="text-blue-600" bgColor="bg-blue-100" iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    <Card title="Total Diproses" count={53} iconColor="text-yellow-600" bgColor="bg-yellow-100" iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    <Card title="Total Diterima" count={48} iconColor="text-green-600" bgColor="bg-green-100" iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    <Card title="Total Ditolak" count={5} iconColor="text-red-600" bgColor="bg-red-100" iconPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </section>

                <div className="flex mx-auto max-w-7xl sm:px-6 lg:px-8 my-6">
                    <DonutChart />
                    <TableService />
                </div>

                <div className="py-2 space-y-2 sm:py-8 sm:space-y-8" style={{ width: '100%' }}>
                    <AppCard title="Welcome to PTSP MIN 1 SLEMAN" description={`You are logged in as User Name.`} />
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
