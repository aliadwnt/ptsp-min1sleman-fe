import React from 'react';

const Card = ({ title, count, iconColor, bgColor, iconPath }) => (
    <div className="bg-white shadow rounded-lg">
        <div>
            <span className="block text-gray-500 ml-4 mt-4">{title}</span>
        </div>
        <div className="flex items-center p-4">
            <div className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 ${iconColor} ${bgColor} rounded-full mr-6`}>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                </svg>
            </div>
            <div>
                <span className="block text-6xl font-bold pb-2">{count}</span>
            </div>
        </div>
    </div>
);

export default Card;
