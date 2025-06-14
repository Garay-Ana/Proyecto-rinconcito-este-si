import React from 'react';
import PrimaryButton from './components/PrimaryButton';

const NotificarEntrega = () => {
  const handleNotify = () => {
    // TODO: Implement notify delivery API call
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">Notificar Entrega</h2>
      <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded shadow">
          <p>Confirma que el pedido ha sido entregado al cliente.</p>
          <PrimaryButton className="mt-4" onClick={handleNotify}>
            Notificar Entrega
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default NotificarEntrega;
