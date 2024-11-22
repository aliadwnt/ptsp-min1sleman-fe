import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { fetchDaftarPelayanan } from "../services/daftarPelayananService";

const DiagramPelayanan = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
    backgroundColor: [],
  });
  const chartRef = useRef(null);
  const usedColors = useRef(new Set());

  // Fungsi untuk menghasilkan warna acak unik
  const generateRandomColor = () => {
    let color;
    do {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 70 + Math.random() * 20;
      const lightness = 50 + Math.random() * 20;
      color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } while (usedColors.current.has(color));

    usedColors.current.add(color);
    return color;
  };

  // Mengambil data layanan dan memprosesnya
  useEffect(() => {
    const getData = async () => {
      try {
        const daftarResponse = await fetchDaftarPelayanan();

        const labels = [
          ...new Set(daftarResponse.map((item) => item.nama_pelayanan)),
        ];

        const values = labels.map((label) =>
          daftarResponse.filter((item) => item.nama_pelayanan === label).length
        );

        const backgroundColor = labels.map(() => generateRandomColor());

        setChartData({ labels, data: values, backgroundColor });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    getData();
  }, []);

  // Menginisialisasi diagram saat data tersedia
  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      const chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Total",
              data: chartData.data,
              backgroundColor: chartData.backgroundColor,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) =>
                  `${tooltipItem.label}: ${tooltipItem.raw} layanan`,
              },
            },
            legend: {
              display: false,
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData]);

  return (
<div className="bg-white shadow-lg rounded-lg w-full md:w-1/2 lg:w-2/3 p-6 mx-auto">
  {/* Judul */}
  <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
    Diagram Pelayanan
  </h2>

  {/* Seksi Diagram */}
  <div className="relative w-full h-64 md:h-72 lg:h-80 mt-6">
    <canvas ref={chartRef} className="h-full w-full"></canvas>
  </div>

  {/* Seksi Label di Bawah */}
  <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-white text-xs mt-4">
    {chartData.labels.map((label, index) => (
      <div
        key={index}
        className="flex items-center space-x-2 px-2 py-1 transform transition-transform duration-200 hover:scale-105 hover:shadow-md"
      >
        <div
          className="w-3 h-3 rounded-full shadow"
          style={{ backgroundColor: chartData.backgroundColor[index] }}
        ></div>
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
    ))}
  </div>
</div>

  );
};

export default DiagramPelayanan;
