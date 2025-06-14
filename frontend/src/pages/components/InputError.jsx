import React from 'react';

const InputError = ({ messages = [], className = '' }) => {
  if (!messages.length) return null;

  return (
    <ul className={`text-sm text-red-600 space-y-1 ${className}`}>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};

export default InputError;
