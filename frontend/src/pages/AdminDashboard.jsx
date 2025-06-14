import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [clientes, setClientes] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [platos, setPlatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch clientes, chefs, repartidores, platos from backend API
  }, []);

  const handleLogout = async () => {
    // TODO: Call backend API to logout and redirect to login page
  };

  const handleDeleteUser = (id, type) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      // TODO: Call backend API to delete user and update state accordingly
    }
  };

  const handleDeletePlato = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este plato?')) {
      // TODO: Call backend API to delete plato and update state
    }
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido, Administrador</h2>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none transition duration-200"
          >
            Cerrar sesión
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
          </button>
        </div>

        {/* Panel de Administración */}
        <div className="bg-white p-8 shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Panel de Administración</h3>
          <p className="text-gray-600">
            Gestiona usuarios, chefs, repartidores y el estado general de la plataforma Rinconcito.
          </p>
          <div className="mt-4 flex space-x-4">
            <Link
              to="/admin/users/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none transition duration-200"
            >
              + Crear Nuevo Usuario
            </Link>
            <Link
              to="/admin/reportes"
              target="_blank"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none transition duration-200"
            >
              Ver reportes
            </Link>
          </div>
        </div>

        {/* Usuarios Registrados */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">👥 Usuarios Registrados</h4>
          {clientes.length === 0 ? (
            <p className="text-gray-500">No hay usuarios registrados.</p>
          ) : (
            <ul className="space-y-1 text-gray-700">
              {clientes.map((usuario) => (
                <li key={usuario.id} className="flex justify-between items-center">
                  <span>
                    - {usuario.name} <span className="text-sm text-gray-500">({usuario.email})</span>
                  </span>
                  <span className="space-x-2">
                    <Link to={`/admin/users/edit/${usuario.id}`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(usuario.id, 'cliente')}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chefs */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">👨‍🍳 Chefs</h4>
          {chefs.length === 0 ? (
            <p className="text-gray-500">No hay chefs registrados.</p>
          ) : (
            <ul className="space-y-1 text-gray-700">
              {chefs.map((chef) => (
                <li key={chef.id} className="flex justify-between items-center">
                  <span>
                    - {chef.name} <span className="text-sm text-gray-500">({chef.email})</span>
                  </span>
                  <span className="space-x-2">
                    <Link to={`/admin/users/edit/${chef.id}`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    <Link to={`/admin/chef/details/${chef.id}`} className="text-green-600 hover:underline">
                      Ver detalles
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(chef.id, 'chef')}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Repartidores */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">🚴 Repartidores</h4>
          {repartidores.length === 0 ? (
            <p className="text-gray-500">No hay repartidores registrados.</p>
          ) : (
            <ul className="space-y-1 text-gray-700">
              {repartidores.map((repartidor) => (
                <li key={repartidor.id} className="flex justify-between items-center">
                  <span>
                    - {repartidor.name} <span className="text-sm text-gray-500">({repartidor.email})</span>
                  </span>
                  <span className="space-x-2">
                    <Link to={`/admin/users/edit/${repartidor.id}`} className="text-blue-600 hover:underline">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(repartidor.id, 'repartidor')}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Platos */}
        <div className="bg-white p-6 shadow rounded-lg mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">🍽️ Platos</h4>
          {platos.length === 0 ? (
            <p className="text-gray-500">No hay platos registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">Nombre</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">Descripción</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">Precio</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-center">Cantidad</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {platos.map((plato) => (
                    <tr key={plato.id} className="border-b border-gray-300">
                      <td className="py-2 px-4">{plato.id}</td>
                      <td className="py-2 px-4">{plato.nombre}</td>
                      <td className="py-2 px-4">{plato.descripcion}</td>
                      <td className="py-2 px-4">{plato.precio}</td>
                      <td className="py-2 px-4 text-center">{plato.cantidad}</td>
                      <td className="py-2 px-4 text-center space-x-2">
                        <button
                          onClick={() => handleDeletePlato(plato.id)}
                          className="text-red-600 hover:underline"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
