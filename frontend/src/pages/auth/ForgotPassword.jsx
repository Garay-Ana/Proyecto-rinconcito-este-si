import React, { useState } from 'react';
import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import InputError from '../components/InputError';
import PrimaryButton from '../components/PrimaryButton';
import AuthSessionStatus from '../components/AuthSessionStatus';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setStatus('');

    try {
      const response = await fetch('/password/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors?.email || ['Error sending password reset email']);
      } else {
        const data = await response.json();
        setStatus(data.status || 'Password reset link sent to your email.');
      }
    } catch (error) {
      setErrors(['Network error']);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
      </div>

      <AuthSessionStatus className="mb-4" status={status} />

      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            className="block mt-1 w-full"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <InputError messages={errors} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton>Email Password Reset Link</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
