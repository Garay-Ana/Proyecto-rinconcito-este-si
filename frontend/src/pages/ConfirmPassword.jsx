import React, { useState } from 'react';
import InputLabel from './components/InputLabel';
import TextInput from './components/TextInput';
import InputError from './components/InputError';
import PrimaryButton from './components/PrimaryButton';

const ConfirmPassword = () => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await fetch('/password/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors?.password || ['Error confirming password']);
      } else {
        // Handle successful confirmation, e.g., redirect or show message
      }
    } catch (error) {
      setErrors(['Network error']);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            className="block mt-1 w-full"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <InputError messages={errors} className="mt-2" />
        </div>

        <div className="flex justify-end mt-4">
          <PrimaryButton>Confirm</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ConfirmPassword;
