import React from 'react';

const TextInput = React.forwardRef(({ disabled = false, className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      disabled={disabled}
      className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
      {...props}
    />
  );
});

export default TextInput;
