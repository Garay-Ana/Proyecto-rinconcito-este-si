import React, { useState } from 'react';
import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';

const AgregarPlato = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descuento_porcentaje: '',
    fecha_inicio_oferta: '',
    fecha_fin_oferta: '',
    descripcion: '',
    precio: '',
    ingredientes: '',
    cantidad: 0,
    imagen: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission to backend API
    // Validate inputs and setErrors if any
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <div className="py-12 max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
          <h2 className="font-semibold text-2xl text-gray-800 leading-tight mb-6">
            👨‍🍳 Agregar Nuevo Plato
          </h2>

          {errors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <ul className="list-disc list-inside text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <div>
              <InputLabel htmlFor="nombre" value="🍽️ Nombre del Plato" />
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

            <div>
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

            <div>
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

            <div>
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

            <div>
              <InputLabel htmlFor="descripcion" value="📝 Descripción" />
              <textarea
                name="descripcion"
                id="descripcion"
                rows="3"
                placeholder="Describe el plato..."
                value={formData.descripcion}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <InputLabel htmlFor="precio" value="💲 Precio" />
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

            <div>
              <InputLabel htmlFor="ingredientes" value="🧾 Ingredientes" />
              <textarea
                name="ingredientes"
                id="ingredientes"
                rows="3"
                placeholder="Lista de ingredientes..."
                value={formData.ingredientes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
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

            <div>
              <InputLabel htmlFor="imagen" value="📷 Imagen del Plato" />
              <input
                type="file"
                name="imagen"
                id="imagen"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vista previa de la imagen"
                  className="mt-4 max-h-48 rounded-md"
                />
              )}
            </div>

            <div className="text-right">
              <PrimaryButton>➕ Agregar Plato</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarPlato;
