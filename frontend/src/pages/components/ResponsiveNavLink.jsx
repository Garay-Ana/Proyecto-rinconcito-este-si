import React from 'react';
import classNames from 'classnames';

const ResponsiveNavLink = ({ active = false, children, className = '', ...props }) => {
  const classes = classNames(
    'block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium focus:outline-none transition duration-150 ease-in-out',
    {
      'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700': active,
      'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300': !active,
    },
    className
  );

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
};

export default ResponsiveNavLink;
