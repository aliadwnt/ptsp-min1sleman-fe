import React from 'react';

const ResponsiveNavLink = ({ active, children, ...props }) => {
    const baseClasses = 'flex items-center w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out';
    const activeClasses = 'border-green-400 text-green-700 bg-green-50 focus:outline-none focus:text-green-800 focus:bg-green-100 focus:border-green-700';
    const inactiveClasses = 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50  focus:border-gray-300 ';

    const classes = active ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;

    return (
        <a className={classes} {...props}>
            {children}
        </a>
    );
};

export default ResponsiveNavLink;
<ResponsiveNavLink active={true} href="/dashboard">
    Dashboard
</ResponsiveNavLink>
