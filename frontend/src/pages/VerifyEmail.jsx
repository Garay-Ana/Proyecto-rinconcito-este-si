import React, { useState } from 'react';

const VerifyEmail = () => {
  const [status, setStatus] = useState('');

  const resendVerificationEmail = async () => {
    // TODO: Implement API call to resend verification email
    alert('Resend verification email clicked. Implement API call.');
    setStatus('A new verification link has been sent to the email address you provided during registration.');
  };

  const logout = async () => {
    // TODO: Implement API call to logout
    alert('Logout clicked. Implement logout logic.');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <a href="/">
        <img src="/images/logo.png" alt="Rinconcito Logo" style={{ height: '90px' }} className="mx-auto mb-4" />
      </a>

      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </div>

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={resendVerificationEmail}
          className="btn btn-primary"
        >
          Resend Verification Email
        </button>

        <button
          onClick={logout}
          className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
