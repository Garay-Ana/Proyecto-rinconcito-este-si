import React from 'react';
import PrimaryButton from './components/PrimaryButton';

const RecogerPedido = () => {
  const handleConfirmPickup = () => {
    // TODO: Implement confirm pickup API call
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">Recoger Pedido</h2>
      <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded shadow">
          <p>Confirma que has recogido el pedido en el negocio.</p>
          <PrimaryButton className="mt-4" onClick={handleConfirmPickup}>
            Confirmar Recogida
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default RecogerPedido;
