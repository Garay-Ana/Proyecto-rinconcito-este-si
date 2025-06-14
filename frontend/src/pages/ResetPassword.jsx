import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token') || '';

  const [formData, setFormData] = useState({
    token: token,
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // TODO: Implement API call to reset password
    // Example:
    // try {
    //   const response = await fetch('/api/password/reset', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     const data = await response.json();
    //     setErrors(data.errors || {});
    //   } else {
    //     // Password reset successful, redirect or show message
    //   }
    // } catch (error) {
    //   console.error('Reset password error:', error);
    // }

    alert('Reset password form submitted. Implement API call.');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="text-center mb-4">
        <a href="/">
          <img src="/images/logo.png" alt="Rinconcito Logo" style={{ height: '90px' }} className="mx-auto" />
        </a>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="token" value={formData.token} />

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.password && <p className="text-red-600 mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password_confirmation" className="block font-medium mb-1">Confirm Password</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.password_confirmation && <p className="text-red-600 mt-1">{errors.password_confirmation}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
