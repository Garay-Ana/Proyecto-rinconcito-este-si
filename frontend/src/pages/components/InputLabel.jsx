import React from 'react';

const InputLabel = ({ value, children, ...props }) => {
  return (
    <label className="block font-medium text-sm text-gray-700" {...props}>
      {value || children}
    </label>
  );
};

export default InputLabel;
