import React, { useState, useEffect } from 'react';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // TODO: Fetch carrito data from API
    // fetch('/api/cliente/carrito').then(res => res.json()).then(setCarrito);
  }, []);

  const actualizarCantidad = (platoId, cantidad) => {
    // TODO: Call API to update quantity and update state
    alert(`Actualizar cantidad del plato ${platoId} a ${cantidad}. Implementar llamada API.`);
  };

  const eliminarPlato = (platoId) => {
    if (window.confirm('¿Estás seguro de eliminar este plato del carrito?')) {
      // TODO: Call API to delete item and update state
      alert(`Eliminar plato ${platoId} del carrito. Implementar llamada API.`);
    }
  };

  const confirmarPedido = () => {
    // TODO: Call API to confirm order and pay
    alert('Confirmar pedido y pagar. Implementar llamada API.');
  };

  return (
    <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="text-center my-6">
        <a href="/">
          <img src="/images/logo.png" alt="Rinconcito Logo" className="h-24 mx-auto" />
        </a>
      </div>

      <header className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-2xl text-gray-800">🛒 Carrito de Compras</h2>
        <a href="/cliente" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al panel
        </a>
      </header>

      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        {successMessage && (
          <div className="bg-green-600 text-white rounded-md px-4 py-2 shadow">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-600 text-white rounded-md px-4 py-2 shadow">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        {carrito.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Plato</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Precio Unitario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Subtotal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {carrito.map((item) => {
                    const isEnOferta = item.plato.isEnOferta;
                    const precioUnitario = isEnOferta ? item.plato.precioConDescuento : item.plato.precio;
                    const subtotal = precioUnitario * item.cantidad;

                    return (
                      <tr key={item.plato.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.plato.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const cantidad = e.target.cantidad.value;
                              actualizarCantidad(item.plato.id, cantidad);
                            }}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="number"
                              name="cantidad"
                              defaultValue={item.cantidad}
                              min="1"
                              className="w-16 border-gray-300 rounded-md shadow-sm text-center"
                              required
                            />
                            <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                              Actualizar
                            </button>
                          </form>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {isEnOferta ? (
                            <>
                              <span className="line-through text-red-500">${item.plato.precio.toFixed(2)}</span>
                              <span className="ml-2 font-bold text-green-600">${item.plato.precioConDescuento.toFixed(2)}</span>
                            </>
                          ) : (
                            <>${item.plato.precio.toFixed(2)}</>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {isEnOferta ? (
                            <>
                              <span className="line-through text-red-500">${(item.plato.precio * item.cantidad).toFixed(2)}</span>
                              <span className="ml-2 font-bold text-green-600">${(item.plato.precioConDescuento * item.cantidad).toFixed(2)}</span>
                            </>
                          ) : (
                            <>${(item.plato.precio * item.cantidad).toFixed(2)}</>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => eliminarPlato(item.plato.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={confirmarPedido}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
              >
                Confirmar Pedido y Pagar 💳
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 text-lg">Tu carrito está vacío 🛒</div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
