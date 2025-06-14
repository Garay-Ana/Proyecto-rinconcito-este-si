import React, { useState } from 'react';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import InputError from '../InputError';
import PrimaryButton from '../PrimaryButton';

const UpdateProfileInformationForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    // TODO: Implement API call to update profile information
    alert('Update profile information submitted. Implement API call.');
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Información del Perfil</h2>
        <p className="mt-1 text-sm text-gray-600">
          Actualiza la información de tu cuenta y dirección de correo electrónico.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Nombre" />
          <TextInput
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
            autoComplete="name"
          />
          <InputError messages={errors.name} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Correo Electrónico" />
          <TextInput
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* TODO: Add email verification resend button and status message */}

        <div className="flex items-center gap-4">
          <PrimaryButton>Guardar</PrimaryButton>
          {status === 'profile-updated' && (
            <p className="text-sm text-gray-600" style={{ transition: 'opacity 0.5s' }}>
              Guardado.
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default UpdateProfileInformationForm;
