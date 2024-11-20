import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { fetchDaftarPelayanan } from '../services/daftarPelayananService';

const DiagramPelayanan = () => {
    const [chartData, setChartData] = useState({ labels: [], data: [], backgroundColor: [] });
    const chartRef = useRef(null);
    const usedColors = new Set(); 

    const generateRandomColor = () => {
        let color;
        do {
            const hue = Math.floor(Math.random() * 360); 
            const saturation = 70 + Math.random() * 20;  
            const lightness = 50 + Math.random() * 20;  
            color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        } while (usedColors.has(color)); 
        
        usedColors.add(color); 
        return color;
    };
    
    useEffect(() => {
        const getData = async () => {
            try {
                const daftarResponse = await fetchDaftarPelayanan();

                // Get unique 'nama_pelayanan' labels
                const labels = [...new Set(daftarResponse.map(item => item.nama_pelayanan))];

                // Count occurrences of each 'nama_pelayanan'
                const values = labels.map(label => 
                    daftarResponse.filter(item => item.nama_pelayanan === label).length
                );
                
                const backgroundColor = labels.map(() => generateRandomColor());

                setChartData({ labels, data: values, backgroundColor });
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        
        if (ctx) {
            const chartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Total',
                        data: chartData.data,
                        backgroundColor: chartData.backgroundColor,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [chartData]);

    return (
        <div className="bg-white shadow rounded-lg w-full md:w-1/2 lg:w-2/3 p-4 text-left mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Diagram Pelayanan</h2>
            
            <div className="flex flex-wrap items-start justify-center md:justify-start bg-white text-xs mt-2">
                {chartData.labels.map((label, index) => (
                    <div key={index} className="flex items-center mb-1 md:mr-4">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: chartData.backgroundColor[index] }}></div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
            
            <div className="relative w-full h-64 md:h-72 lg:h-80 mt-4">
                <canvas ref={chartRef} className="h-full w-full"></canvas>
            </div>
        </div>
    );
};

export default DiagramPelayanan;
