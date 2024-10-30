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

                console.log('Output Response:', outputResponse);
                console.log('Daftar Response:', daftarResponse);

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
        <div className="bg-white shadow rounded-lg w-full md:w-1/2 mr-3 p-4 text-left">
            <b>Diagram Pelayanan</b>
            <div className="flex flex-col bg-white w-96 text-xs mt-2 legend">
                {chartData.labels.map((label, index) => (
                    <div key={index} className="flex items-center mb-1">
                        <div className="w-6 h-3 mr-2" style={{ background: chartData.backgroundColor[index] }}></div>
                        {label}
                    </div>
                ))}
            </div>
            <canvas ref={chartRef} className="text-left h-64"></canvas>
        </div>
    );
};

export default DiagramPelayanan;
