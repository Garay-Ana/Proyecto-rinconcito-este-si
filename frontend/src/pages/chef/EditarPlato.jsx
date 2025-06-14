import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';

const EditarPlato = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    ingredientes: '',
    cantidad: 0,
    descuento_porcentaje: '',
    fecha_inicio_oferta: '',
    fecha_fin_oferta: '',
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // TODO: Fetch plato data by id from backend API and setFormData
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission to backend API for updating plato
    // Validate inputs and setErrors if any
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">
            Editar Plato
          </h2>

          {errors.length > 0 && (
            <div className="mb-4">
              <ul className="list-disc list-inside text-sm text-red-600">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputLabel htmlFor="nombre" value="Nombre" />
              <TextInput
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="descripcion" value="Descripción" />
              <textarea
                name="descripcion"
                id="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="border-gray-300 rounded-md shadow-sm mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="precio" value="Precio" />
              <TextInput
                type="number"
                step="0.01"
                name="precio"
                id="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="ingredientes" value="🧾 Ingredientes" />
              <textarea
                name="ingredientes"
                id="ingredientes"
                rows="3"
                value={formData.ingredientes}
                onChange={handleChange}
                className="border-gray-300 rounded-md shadow-sm mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="cantidad" value="📦 Cantidad Disponible" />
              <TextInput
                type="number"
                name="cantidad"
                id="cantidad"
                min="0"
                value={formData.cantidad}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="descuento_porcentaje" value="📉 Descuento (%)" />
              <TextInput
                type="number"
                name="descuento_porcentaje"
                id="descuento_porcentaje"
                min="0"
                max="100"
                value={formData.descuento_porcentaje}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="fecha_inicio_oferta" value="📅 Fecha Inicio Oferta" />
              <TextInput
                type="date"
                name="fecha_inicio_oferta"
                id="fecha_inicio_oferta"
                value={formData.fecha_inicio_oferta}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <InputLabel htmlFor="fecha_fin_oferta" value="📅 Fecha Fin Oferta" />
              <TextInput
                type="date"
                name="fecha_fin_oferta"
                id="fecha_fin_oferta"
                value={formData.fecha_fin_oferta}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => navigate('/chef')}
                className="inline-block bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600 mr-4"
              >
                Regresar
              </button>
              <PrimaryButton>Actualizar Plato</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarPlato;
