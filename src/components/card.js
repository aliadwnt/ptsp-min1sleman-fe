import React from 'react';

const Card = ({ title, count, iconColor, bgColor, iconPath }) => (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8"> {/* Padding yang responsif */}
        <div>
            <span className="block text-gray-500 text-sm sm:text-base">{title}</span> {/* Ukuran teks responsif */}
        </div>
        <div className="flex items-center mt-4"> {/* Menambahkan margin atas untuk pemisah */}
            <div className={`inline-flex flex-shrink-0 items-center justify-center h-12 w-12 sm:h-16 sm:w-16 ${iconColor} ${bgColor} rounded-full mr-4`}>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 sm:h-6 sm:w-6"> {/* Ukuran ikon responsif */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                </svg>
            </div>
            <div>
                <span className="block text-4xl sm:text-6xl font-bold pb-1">{count}</span> {/* Ukuran teks responsif untuk count */}
            </div>
        </div>
    </div>
);

export default Card;
