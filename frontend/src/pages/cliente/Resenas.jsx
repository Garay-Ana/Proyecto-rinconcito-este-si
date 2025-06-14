import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Resenas = () => {
  const [platos, setPlatos] = useState([]);
  const [formData, setFormData] = useState({
    plato_id: '',
    calificacion: '',
    comentario: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // TODO: Fetch platos from API
    // fetch('/api/platos').then(res => res.json()).then(setPlatos);
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // TODO: Implement API call to save reseña
    // Example:
    // try {
    //   const response = await fetch('/api/guardarResena', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     const data = await response.json();
    //     setErrors(data.errors || {});
    //   } else {
    //     // Success handling
    //   }
    // } catch (error) {
    //   console.error('Error saving reseña:', error);
    // }

    alert('Reseña enviada. Implementar llamada API.');
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-semibold text-2xl text-gray-800 leading-tight mb-6 text-center">
          Calificar y Reseñar Platillo
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="plato_id" className="block text-gray-700 font-medium mb-2">
              Selecciona un platillo
            </label>
            <select
              id="plato_id"
              name="plato_id"
              value={formData.plato_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="" disabled>Elige un platillo</option>
              {platos.map((plato) => (
                <option key={plato.id} value={plato.id}>{plato.nombre}</option>
              ))}
            </select>
            {errors.plato_id && <p className="text-red-600 mt-1">{errors.plato_id}</p>}
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Calificación</label>
            <select
              name="calificacion"
              value={formData.calificacion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="" disabled>Elige una calificación</option>
              {[1, 2, 3, 4, 5].map((i) => (
                <option key={i} value={i}>{i} estrella{i > 1 ? 's' : ''}</option>
              ))}
            </select>
            {errors.calificacion && <p className="text-red-600 mt-1">{errors.calificacion}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="comentario" className="block text-gray-700 font-medium mb-2">
              Comentario (opcional)
            </label>
            <textarea
              id="comentario"
              name="comentario"
              rows="4"
              maxLength="1000"
              placeholder="Escribe tu comentario aquí..."
              value={formData.comentario}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.comentario && <p className="text-red-600 mt-1">{errors.comentario}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md shadow transition duration-300"
          >
            Enviar Reseña
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link
            to="/cliente/dashboard"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md shadow transition duration-300"
          >
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resenas;
