import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto'; // Make sure you install chart.js using npm

const DiagramPelayanan = () => {

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        
        // Create the chart
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Surat TU',
                    'Surat Rekomendasi',
                    'Surat Izin Peminjaman Ruang',
                    'Surat Osis',
                    'Surat Izin Penelitian',
                    'Surat Tugas Guru',
                    'Surat Tugas Siswa'
                ],
                datasets: [{
                    label: 'Total',
                    data: [1, 2, 3, 4, 5, 6, 7],
                    backgroundColor: [
                        '#9747FF',
                        '#FF0000',
                        '#74C541',
                        '#FFB800',
                        '#0075FF',
                        '#FB47FF',
                        '#47FFF4'
                    ],
                    hoverOffset: 4
                }]
            }
        });
    }, []);

    return (
        <div className="bg-white shadow rounded-lg w-full md:w-1/2 mr-3 p-4 text-left">
            <b>Diagram Pelayanan</b>
            <div className="flex absolute bg-white w-96 h-20 text-xs mt-2 legend">
                <div className="w-full md:w-3/5">
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#9747FF' }}></div>Surat TU
                    <br />
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#FF0000' }}></div>Surat Rekomendasi
                    <br />
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#74C541' }}></div>Surat Izin Peminjaman Ruang
                    <br />
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#FFB800' }}></div>Surat Osis
                </div>
                <div className="w-full md:w-2/5">
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#0075FF' }}></div>Surat Izin Penelitian
                    <br />
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#FB47FF' }}></div>Surat Tugas Guru
                    <br />
                    <div className="inline-block w-6 h-3 mr-2" style={{ background: '#47FFF4' }}></div>Surat Tugas Siswa
                </div>
            </div>
            <canvas id="myChart" className="text-left"></canvas>
        </div>
    );
};

export default DiagramPelayanan;
