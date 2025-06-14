import React from 'react';
import classNames from 'classnames';

const NavLink = ({ active = false, children, className = '', ...props }) => {
  const classes = classNames(
    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out',
    {
      'border-indigo-400 text-gray-900 focus:border-indigo-700': active,
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300': !active,
    },
    className
  );

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};

export default NavLink;
