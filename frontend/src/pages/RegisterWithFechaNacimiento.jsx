import React, { useState } from 'react';
import InputLabel from './components/InputLabel';
import TextInput from './components/TextInput';
import InputError from './components/InputError';
import PrimaryButton from './components/PrimaryButton';
import { Link } from 'react-router-dom';

const RegisterWithFechaNacimiento = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    password: '',
    password_confirmation: '',
    tipo_usuario: 'cliente',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission to backend API
    // Validate inputs and setErrors if any
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
            className="block mt-1 w-full"
          />
          <InputError messages={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block mt-1 w-full"
          />
          <InputError messages={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="telefono" value="Teléfono" />
          <TextInput
            id="telefono"
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="block mt-1 w-full"
          />
          <InputError messages={errors.telefono} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="fecha_nacimiento" value="Fecha de nacimiento" />
          <TextInput
            id="fecha_nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
            className="block mt-1 w-full"
          />
          <InputError messages={errors.fecha_nacimiento} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="block mt-1 w-full"
          />
          <InputError messages={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="block mt-1 w-full"
          />
          <InputError messages={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="tipo_usuario" value="Tipo de Usuario" />
          <select
            id="tipo_usuario"
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md"
          >
            <option value="cliente">Cliente</option>
            <option value="chef">Chef</option>
            <option value="repartidor">Repartidor</option>
          </select>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            to="/login"
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ms-4">Register</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterWithFechaNacimiento;
