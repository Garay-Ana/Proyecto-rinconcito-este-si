import React from 'react';
import NavLink from '../components/NavLink.jsx';

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink href="/" active={true}>
              Inicio
            </NavLink>
            <NavLink href="/dashboard" active={false}>
              Dashboard
            </NavLink>
            {/* Agrega más enlaces de navegación según sea necesario */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
