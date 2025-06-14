import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import InputLabel from './components/InputLabel';
import TextInput from './components/TextInput';
import InputError from './components/InputError';
import PrimaryButton from './components/PrimaryButton';
import AuthSessionStatus from './components/AuthSessionStatus';

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rol = queryParams.get('rol') || 'cliente';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setStatus('');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({ email, password, remember }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors?.email || data.errors?.password || ['Login failed']);
      } else {
        // Handle successful login, e.g., redirect
      }
    } catch (error) {
      setErrors(['Network error']);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="text-center mb-4">
        {/* Logo placeholder */}
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
            autoComplete="username"
          />
          <InputError messages={errors} className="mt-2" />
        </div>

        <div className="mt-4">
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

        <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <Link
              to="/forgot-password"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>
          </div>

          <PrimaryButton className="ms-3">Log in</PrimaryButton>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p>¿No tienes cuenta?</p>
        <Link
          to={`/register?rol=${encodeURIComponent(rol)}`}
          className="btn btn-outline-danger mt-2"
        >
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
