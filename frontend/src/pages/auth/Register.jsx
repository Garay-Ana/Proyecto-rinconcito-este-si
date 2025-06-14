import React, { useState } from 'react';

const Register = () => {
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
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // TODO: Implement API call to register user
    // Example:
    // try {
    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     const data = await response.json();
    //     setErrors(data.errors || {});
    //   } else {
    //     // Registration successful, redirect or show message
    //   }
    // } catch (error) {
    //   console.error('Registration error:', error);
    // }

    alert('Registration form submitted. Implement API call.');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block font-medium mb-1">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="text"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.telefono && <p className="text-red-600 mt-1">{errors.telefono}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="fecha_nacimiento" className="block font-medium mb-1">Fecha de nacimiento</label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.fecha_nacimiento && <p className="text-red-600 mt-1">{errors.fecha_nacimiento}</p>}
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

        <div className="mb-4">
          <label htmlFor="tipo_usuario" className="block font-medium mb-1">Tipo de Usuario</label>
          <select
            id="tipo_usuario"
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="cliente">Cliente</option>
            <option value="chef">Chef</option>
            <option value="repartidor">Repartidor</option>
          </select>
          {errors.tipo_usuario && <p className="text-red-600 mt-1">{errors.tipo_usuario}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
