import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">Perfil</h2>

      <div className="bg-white shadow sm:rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Perfil</h3>
        <p>Aquí puedes ver y editar la información de tu perfil.</p>

        <div className="mt-6 flex justify-end">
          <Link
            to="/profile/show"
            className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Regresar a Perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
