import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './components/PrimaryButton';

const ReportsIndex = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    // TODO: Fetch pedidos, totalPedidos, totalVentas from backend API based on startDate and endDate
  }, [startDate, endDate]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // TODO: Trigger data fetch with filter dates
  };

  return (
    <div className="py-12" style={{ backgroundColor: '#f4eedb' }}>
      <div className="container py-5">
        <h2 className="font-semibold text-2xl text-gray-900 leading-tight mb-6">
          📈 Generar Reportes Financieros y de Consumo
        </h2>

        {/* Date filter form */}
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-body">
            <form onSubmit={handleFilterSubmit}>
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label htmlFor="start_date" className="form-label fw-semibold">
                    📅 Fecha inicio
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="end_date" className="form-label fw-semibold">
                    📅 Fecha fin
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4 d-grid">
                  <PrimaryButton type="submit">
                    <i className="bi bi-funnel-fill me-1"></i> Filtrar
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Download buttons */}
        {startDate && endDate && (
          <div className="mb-3 d-flex gap-2">
            <a
              href={`/reports/pdf?start_date=${startDate}&end_date=${endDate}`}
              className="btn btn-outline-danger"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-file-earmark-pdf-fill me-1"></i> PDF
            </a>
            {/* Excel button commented out in original */}
          </div>
        )}

        {/* Summary and table */}
        {pedidos.length > 0 && (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3 text-primary">📊 Resumen de Ventas</h4>
              <ul className="list-unstyled mb-4">
                <li>
                  <strong>Total de pedidos:</strong> {totalPedidos}
                </li>
                <li>
                  <strong>Total de ventas:</strong> ${totalVentas.toLocaleString('es-ES')}
                </li>
              </ul>

              <h5 className="fw-bold mb-3 text-secondary">🧾 Detalle de Pedidos</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle shadow-sm">
                  <thead className="table-light text-center">
                    <tr>
                      <th>
                        <i className="bi bi-hash"></i> ID
                      </th>
                      <th>
                        <i className="bi bi-person-fill"></i> Cliente
                      </th>
                      <th>
                        <i className="bi bi-egg-fried"></i> Plato
                      </th>
                      <th>
                        <i className="bi bi-stack"></i> Cantidad
                      </th>
                      <th>
                        <i className="bi bi-currency-dollar"></i> Total
                      </th>
                      <th>
                        <i className="bi bi-calendar-event"></i> Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id}>
                        <td className="fw-semibold">{pedido.id}</td>
                        <td>{pedido.cliente?.nombre || 'N/A'}</td>
                        <td>{pedido.plato?.nombre || 'N/A'}</td>
                        <td>{pedido.cantidad}</td>
                        <td className="text-success fw-bold">
                          ${pedido.totalValor?.toLocaleString('es-ES') || 0}
                        </td>
                        <td>{new Date(pedido.created_at).toLocaleDateString('es-ES')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <Link to="/chef/inventario" className="btn btn-secondary mt-3">
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default ReportsIndex;
