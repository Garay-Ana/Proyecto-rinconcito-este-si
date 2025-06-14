import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './components/PrimaryButton';

const Inventario = () => {
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    // TODO: Fetch platos from backend API
  }, []);

  const handleUpdateCantidad = (id, cantidad) => {
    // TODO: Call backend API to update cantidad and update state
  };

  const handleDeletePlato = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este plato?')) {
      // TODO: Call backend API to delete plato and update state
    }
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Link
            to="/chef"
            className="inline-block bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600 mb-4"
          >
            Regresar
          </Link>
        </div>

        <div className="mb-4">
          <Link
            to="/reports"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Generar Reportes
          </Link>
        </div>

        {platos.length === 0 ? (
          <p>No hay platos en el inventario.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Imagen</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Cantidad Disponible</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {platos.map((plato) => (
                <tr key={plato.id}>
                  <td className="py-2 px-4 border-b">
                    {plato.imagen ? (
                      <img
                        src={plato.imagen}
                        alt={plato.nombre}
                        style={{ height: 50, width: 'auto', objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : (
                      <span>No hay imagen</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{plato.nombre}</td>
                  <td className="py-2 px-4 border-b">{plato.descripcion}</td>
                  <td className="py-2 px-4 border-b">{plato.precio}</td>
                  <td className="py-2 px-4 border-b">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const cantidad = e.target.cantidad.value;
                        handleUpdateCantidad(plato.id, cantidad);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="number"
                        name="cantidad"
                        defaultValue={plato.cantidad ?? 10}
                        min="0"
                        className="border rounded px-2 py-1 w-20"
                      />
                      <PrimaryButton type="submit">Guardar</PrimaryButton>
                    </form>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeletePlato(plato.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventario;
