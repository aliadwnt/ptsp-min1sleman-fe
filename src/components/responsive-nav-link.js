import React from 'react';

const ResponsiveNavLink = ({ active, children, ...props }) => {
    const baseClasses = 'flex items-center w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out';
    const activeClasses = 'border-green-400 text-green-700 bg-green-50 focus:outline-none focus:text-green-800 focus:bg-green-100 focus:border-green-700';
    const inactiveClasses = 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600';

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
