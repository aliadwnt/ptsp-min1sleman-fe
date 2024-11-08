import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const NavLink = ({ active, children, ...props }) => {
  const classes = classNames(
    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out',
    {
      'border-indigo-400 text-white focus:outline-none focus:border-indigo-700 hover:text-gray-300': active,
      'border-transparent text-gray-100 hover:text-gray-300 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300': !active
    }
  );

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};

NavLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired
};

NavLink.defaultProps = {
  active: false
};

export default NavLink;
