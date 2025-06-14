import React, { useState, useEffect } from 'react';

const Welcome = () => {
  // State for filters
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // State for dishes and platos (mock or fetched from API)
  const [dishes] = useState([
    { image: '1747522559_bandeja-paisa.png', alt: 'Bandeja Paisa tradicional colombiana', title: 'Bandeja Paisa' },
    { image: '1747522514_plato-pescado.png', alt: 'Plato de pescado frito con guarnición', title: 'Pescado Frito' },
    { image: '1747522453_arepas-rellenas.png', alt: 'Arepas rellenas típicas', title: 'Arepas Rellenas' }
  ]);
  const [platosEnOferta, setPlatosEnOferta] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [reseñas, setResenas] = useState([]);

  // Fetch platosEnOferta, platos, reseñas from API on mount
  useEffect(() => {
    // TODO: Replace with actual API calls
    // Example:
    // fetch('/api/platos-en-oferta').then(res => res.json()).then(setPlatosEnOferta);
    // fetch('/api/platos').then(res => res.json()).then(setPlatos);
    // fetch('/api/reseñas').then(res => res.json()).then(setResenas);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search/filter logic or API call with minPrice and maxPrice
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3" style={{ backgroundColor: '#f4eedb' }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/images/logo.png"
              alt="Rinconcito Logo"
              title="Rinconcito - Sabor que llega hasta tu puerta"
              className="me-2 logo-hover"
              style={{ height: '100px', transition: 'transform 0.3s ease' }}
            />
            <span className="fs-4 fw-bold"></span>
          </a>

          <form onSubmit={handleSearch} className="d-flex gap-2 align-items-center">
            <div className="input-group input-group-sm" style={{ maxWidth: '140px' }}>
              <span className="input-group-text" id="min-price-label">Precio Mín</span>
              <input
                type="number"
                step="0.01"
                className="form-control form-control-sm"
                id="min_price"
                name="min_price"
                aria-label="Precio mínimo"
                aria-describedby="min-price-label"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="input-group input-group-sm" style={{ maxWidth: '140px' }}>
              <span className="input-group-text" id="max-price-label">Precio Máx</span>
              <input
                type="number"
                step="0.01"
                className="form-control form-control-sm"
                id="max_price"
                name="max_price"
                aria-label="Precio máximo"
                aria-describedby="max-price-label"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Buscar</button>
          </form>

          <div className="d-none d-lg-flex ms-3 gap-3">
            <a className="btn btn-usuario px-3 py-2 rounded fw-bold fs-6" href="/register?rol=cliente">Usuario</a>
            <a className="btn btn-chef px-3 py-2 rounded fw-bold fs-6" href="/register?rol=chef">Chef</a>
            <a className="btn btn-repartidor px-3 py-2 rounded fw-bold fs-6" href="/acceso/repartidor">Repartidor</a>
            <a className="btn btn-admin px-3 py-2 rounded fw-bold fs-6" href="/admin/dashboard">Administrador</a>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {dishes.map((dish, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-lg h-100">
                <img
                  src={`/images/${dish.image}`}
                  className="card-img-top"
                  alt={dish.alt}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{dish.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="ofertas-especiales py-5" style={{ backgroundColor: 'rgb(239, 224, 188)', borderTop: '4px solid #a11c2f', borderBottom: '4px solid #a11c2f' }}>
        <div className="container">
          {platosEnOferta.length > 0 && (
            <>
              <h2 className="text-center mb-4 fw-semibold">Ofertas Especiales</h2>
              <div id="carouselOfertas" className="carousel slide mb-5" data-bs-ride="carousel">
                <div className="carousel-inner rounded shadow" style={{ height: '400px' }}>
                  {platosEnOferta.map((plato, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} key={plato.id}>
                      <img src={plato.imagen_url} className="d-block w-100 h-100 object-fit-cover" alt={plato.nombre} />
                      <div className="carousel-caption bg-dark bg-opacity-50 rounded p-3">
                        <h5 className="text-white fw-bold">{plato.nombre}</h5>
                        <p className="text-light">{plato.descripcion}</p>
                        <p className="text-warning fw-bold">
                          Oferta: {plato.descuento_porcentaje}% de descuento
                        </p>
                        <p className="text-decoration-line-through" style={{ color: '#e5e7eb' }}>
                          Precio original: <span style={{ color: '#f87171' }}>${plato.precio.toFixed(2)}</span>
                        </p>
                        <p className="fw-bold" style={{ color: '#22c55e' }}>
                          Precio con descuento: ${plato.precioConDescuento.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselOfertas" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselOfertas" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="container mt-5">
        {platos.length > 0 && (
          <>
            <h2 className="mb-4 text-center">Platos Destacados</h2>
            <div id="carouselPlatos" className="carousel slide mb-5" data-bs-ride="carousel">
              <div className="carousel-inner rounded shadow" style={{ height: '400px' }}>
                {platos.slice(0, 3).map((plato, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} key={plato.id}>
                    <img src={plato.imagen_url} className="d-block w-100 h-100 object-fit-cover" alt={plato.nombre} />
                    <div className="carousel-caption p-3">
                      <h5 className="text-white fw-bold">{plato.nombre}</h5>
                      <p className="text-light">{plato.descripcion}</p>
                      <p className="text-light fw-bold">Precio: ${plato.precio.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselPlatos" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselPlatos" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
            <h2 className="mb-4 text-center">Menú</h2>
            <div className="row">
              {platos.map((plato) => (
                <div className="col-md-4 mb-4" key={plato.id}>
                  <div className="card shadow-sm h-100">
                    <img src={plato.imagen_url} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt={plato.nombre} />
                    <div className="card-body">
                      <h5 className="card-title">{plato.nombre}</h5>
                      <p className="card-text">{plato.descripcion}</p>
                      <p className="card-text precio fw-bold">Precio: ${plato.precio.toFixed(2)}</p>
                      {plato.ingredientes && (
                        <div className="mb-2">
                          <strong>Ingredientes:</strong>
                          <ul className="list-unstyled ms-3 mt-1">
                            {plato.ingredientes.split(',').map((ingrediente, idx) => (
                              <li key={idx}><i className="bi bi-dot"></i> {ingrediente.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {plato.cantidad !== undefined && (
                        <p className="card-text"><strong>Cantidad disponible:</strong> {plato.cantidad > 0 ? plato.cantidad : 'Agotado'}</p>
                      )}
                      <a href="/login" className="btn btn-primary w-100">Ver más</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-semibold">Reseñas de Clientes</h2>

        {/* TODO: Implement authentication check */}
        <form method="POST" action="/guardarResena" className="mb-4">
          <div className="mb-3">
            <label htmlFor="plato_id" className="form-label">Selecciona un platillo</label>
            <select className="form-select" id="plato_id" name="plato_id" required>
              <option value="" disabled defaultValue>Elige un platillo</option>
              {platos.map((plato) => (
                <option key={plato.id} value={plato.id}>{plato.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Calificación</label>
            <select className="form-select" name="calificacion" required>
              {[1, 2, 3, 4, 5].map((i) => (
                <option key={i} value={i}>{i} estrella{i > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="comentario" className="form-label">Comentario (opcional)</label>
            <textarea className="form-control" id="comentario" name="comentario" rows="3" maxLength="1000"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar Reseña</button>
        </form>

        {reseñas.map((resena) => (
          <div className="reseña" key={resena.id}>
            <div className="usuario">{resena.user?.name || 'Usuario'}</div>
            <div className="calificacion">
              {[...Array(resena.calificacion).keys()].map((i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
              {[...Array(5 - resena.calificacion).keys()].map((i) => (
                <i key={i} className="bi bi-star"></i>
              ))}
            </div>
            <div className="comentario">{resena.comentario}</div>
            <div className="plato text-muted mt-1">Platillo: {resena.plato?.nombre || 'Desconocido'}</div>
          </div>
        ))}
      </div>

      <footer className="mt-5 pt-5 pb-4" style={{ backgroundColor: 'white', borderTop: '3px solid #fad14a' }}>
        <div className="container text-center">
          <h4 className="mb-4">Contáctanos</h4>
          <div className="row justify-content-center mb-3 text-start">
            <div className="col-md-3 mb-3">
              <a href="https://wa.me/573001112233" target="_blank" rel="noreferrer" className="text-decoration-none text-dark d-flex align-items-center gap-2 justify-content-center">
                <i className="bi bi-whatsapp fs-4 text-success"></i>
                <span>+57 310 3718829</span>
              </a>
            </div>
            <div className="col-md-3 mb-3">
              <a href="mailto:soporte@rinconcito.com" className="text-decoration-none text-dark d-flex align-items-center gap-2 justify-content-center">
                <i className="bi bi-envelope-fill fs-4 text-danger"></i>
                <span>soporte@rinconcito.com</span>
              </a>
            </div>
            <div className="col-md-3 mb-3">
              <a href="https://instagram.com/rinconcitoapp" target="_blank" rel="noreferrer" className="text-decoration-none text-dark d-flex align-items-center gap-2 justify-content-center">
                <i className="bi bi-instagram fs-4 text-warning"></i>
                <span>@rinconcitoapp</span>
              </a>
            </div>
          </div>
          <p className="text-muted mt-3 mb-0">&copy; {new Date().getFullYear()} Rinconcito. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Welcome;
