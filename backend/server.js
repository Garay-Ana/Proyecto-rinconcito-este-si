const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la base de datos (ajustar según entorno)
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// Definición de modelos (simplificados, ajustar según migraciones Laravel)
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  tipo_usuario: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: true },
  fecha_nacimiento: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'users',
  timestamps: true,
});

const Plato = sequelize.define('Plato', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  // Otros campos según migraciones
}, {
  tableName: 'platos',
  timestamps: true,
});

const Pedido = sequelize.define('Pedido', {
  plato_id: { type: DataTypes.INTEGER, allowNull: false },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_con_descuento: { type: DataTypes.FLOAT, allowNull: true },
  // Otros campos según migraciones
}, {
  tableName: 'pedidos',
  timestamps: true,
});

// Relaciones
Plato.belongsTo(User, { foreignKey: 'user_id' });
Pedido.belongsTo(Plato, { foreignKey: 'plato_id' });
Pedido.belongsTo(User, { foreignKey: 'cliente_id', as: 'cliente' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Rutas Admin (similar a Laravel AdminApiController)

// Listar usuarios con filtro tipo_usuario
app.get('/api/admin/users', async (req, res) => {
  try {
    const tipo = req.query.tipo;
    const where = tipo ? { tipo_usuario: tipo } : {};
    const users = await User.findAll({ where });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear usuario
app.post('/api/admin/users', async (req, res) => {
  try {
    const { name, email, password, tipo_usuario, role, fecha_nacimiento } = req.body;
    // Aquí se debería hashear la contraseña, se omite para simplificar
    const user = await User.create({ name, email, password, tipo_usuario, role, fecha_nacimiento });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar usuario
app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, tipo_usuario, role, fecha_nacimiento } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    user.name = name;
    user.email = email;
    if (password) user.password = password; // Hashear en producción
    user.tipo_usuario = tipo_usuario;
    user.role = role;
    user.fecha_nacimiento = fecha_nacimiento;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar usuario
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar pedidos con filtros de fecha
app.get('/api/admin/pedidos', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const where = {};
    if (start_date) where.createdAt = { [Sequelize.Op.gte]: new Date(start_date) };
    if (end_date) {
      where.createdAt = where.createdAt || {};
      where.createdAt[Sequelize.Op.lte] = new Date(end_date);
    }
    const pedidos = await Pedido.findAll({
      where,
      include: [{ model: Plato }, { model: User, as: 'cliente' }],
    });
    // Calcular totalCalculado
    const pedidosConTotal = pedidos.map(pedido => {
      const precio = pedido.Plato ? pedido.Plato.precio : 0;
      const cantidad = pedido.cantidad || 1;
      return { ...pedido.toJSON(), totalCalculado: precio * cantidad };
    });
    res.json(pedidosConTotal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar platos
app.get('/api/admin/platos', async (req, res) => {
  try {
    const platos = await Plato.findAll();
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detalles de chef
app.get('/api/admin/chefs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const chef = await User.findOne({ where: { id, tipo_usuario: 'chef' } });
    if (!chef) return res.status(404).json({ error: 'Chef no encontrado' });
    const platos = await Plato.findAll({ where: { user_id: chef.id } });
    const ventasPorPlato = [];
    for (const plato of platos) {
      const pedidos = await Pedido.findAll({ where: { plato_id: plato.id } });
      const cantidadVendida = pedidos.reduce((sum, p) => sum + p.cantidad, 0);
      const totalVentas = pedidos.reduce((sum, p) => sum + ((p.precio_con_descuento || 0) * p.cantidad), 0);
      ventasPorPlato.push({ plato, cantidad_vendida: cantidadVendida, total_ventas: totalVentas });
    }
    res.json({ chef, ventasPorPlato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reportes
app.get('/api/admin/reportes', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const where = {};
    if (start_date) where.createdAt = { [Sequelize.Op.gte]: new Date(start_date) };
    if (end_date) {
      where.createdAt = where.createdAt || {};
      where.createdAt[Sequelize.Op.lte] = new Date(end_date);
    }
    const pedidos = await Pedido.findAll({
      where,
      include: [{ model: Plato }, { model: User, as: 'cliente' }],
    });
    const pedidosConTotal = pedidos.map(pedido => {
      const precio = pedido.Plato ? pedido.Plato.precio : 0;
      const cantidad = pedido.cantidad || 1;
      return { ...pedido.toJSON(), totalCalculado: precio * cantidad };
    });
    const platos = await Plato.findAll();
    // Agrupar totales por plato
    const totalesPorPlato = {};
    pedidosConTotal.forEach(pedido => {
      const platoId = pedido.plato_id;
      if (!totalesPorPlato[platoId]) {
        totalesPorPlato[platoId] = { nombre: pedido.Plato ? pedido.Plato.nombre : 'N/A', cantidad_total: 0, total_valor: 0 };
      }
      totalesPorPlato[platoId].cantidad_total += pedido.cantidad;
      totalesPorPlato[platoId].total_valor += pedido.totalCalculado;
    });
    res.json({ pedidos: pedidosConTotal, platos, totalesPorPlato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión a la base de datos y arranque del servidor
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
