import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { fetchOutputLayanan } from '../services/outputLayananService';
import { fetchDaftarLayanan } from '../services/daftarLayananService';

const DiagramPelayanan = () => {
    const [chartData, setChartData] = useState({ labels: [], data: [], backgroundColor: [] });
    const chartRef = useRef(null);
    const usedColors = new Set(); 

    const generateRandomColor = () => {
        let color;
        do {
            const hue = Math.floor(Math.random() * 360); 
            const saturation = 70 + Math.random() * 30;  
            const lightness = 30 + Math.random() * 20;  
            color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        } while (usedColors.has(color)); 
        usedColors.add(color); 
        return color;
    };
    
    useEffect(() => {
        const getData = async () => {
            try {
                const outputResponse = await fetchOutputLayanan();
                const daftarResponse = await fetchDaftarLayanan();

                const labels = outputResponse.map(item => item.name);
                const countMap = {};
                labels.forEach(label => {
                    countMap[label] = daftarResponse.filter(item => item.output === label).length;
                });

                const values = labels.map(label => countMap[label] || 0);
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
                }
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [chartData]);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Diagram Pelayanan</h2>
            <canvas ref={chartRef} className="h-64 w-full"></canvas>
            <div className="mt-4 text-xs">
                {chartData.labels.length > 0 && (
                    <div className="flex flex-col">
                        {chartData.labels.map((label, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <div className="w-4 h-4 mr-2" style={{ background: chartData.backgroundColor[index] }}></div>
                                <span className="truncate">{label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagramPelayanan;
