import React, { useState } from 'react';
import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import InputError from '../components/InputError';
import PrimaryButton from '../components/PrimaryButton';

const UpdatePasswordForm = () => {
  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    // TODO: Implement API call to update password
    alert('Update password submitted. Implement API call.');
  };

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Actualizar Contraseña</h2>
        <p className="mt-1 text-sm text-gray-600">
          Asegúrate de que tu cuenta use una contraseña larga y aleatoria para mantenerla segura.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="current_password" value="Contraseña Actual" />
          <TextInput
            id="current_password"
            name="current_password"
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
            value={formData.current_password}
            onChange={handleChange}
            required
          />
          <InputError messages={errors.current_password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Nueva Contraseña" />
          <TextInput
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputError messages={errors.password} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
          <TextInput
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <InputError messages={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton>Guardar</PrimaryButton>
          {status === 'password-updated' && (
            <p className="text-sm text-gray-600" style={{ transition: 'opacity 0.5s' }}>
              Guardado.
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default UpdatePasswordForm;
