import React from 'react';

const DropdownLink = ({ children, ...props }) => {
  return (
    <a
      className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
      {...props}
    >
      {children}
    </a>
  );
};

export default DropdownLink;
