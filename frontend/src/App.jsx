import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/layouts/AppLayout.jsx';
import Welcome from './pages/Welcome.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/SelectAuth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import NotificarEntrega from './pages/NotificarEntrega.jsx';
import RecogerPedido from './pages/RecogerPedido.jsx';
import Carrito from './pages/cliente/Carrito.jsx';
import Resenas from './pages/cliente/Resenas.jsx';
import AgregarPlato from './pages/chef/AgregarPlato.jsx';
import EditarPlato from './pages/chef/EditarPlato.jsx';
import ChefDashboard from './pages/ChefDashboard.jsx';
import Inventario from './pages/Inventario.jsx';
import ReportsIndex from './pages/ReportsIndex.jsx';
import RegisterWithFechaNacimiento from './pages/RegisterWithFechaNacimiento.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminChefDetails from './pages/AdminChefDetails.jsx';
import AdminCreateUser from './pages/AdminCreateUser.jsx';
import AdminEditUser from './pages/AdminEditUser.jsx';
import AdminReportes from './pages/AdminReportes.jsx';
import MenuManagement from './pages/MenuManagement.jsx';
import OrdersAssigned from './pages/OrdersAssigned.jsx';
import Repartidor from './pages/Repartidor.jsx';
import ResolverIncidencias from './pages/ResolverIncidencias.jsx';
import SelectAuth from './pages/SelectAuth.jsx';
import Cliente from './pages/Cliente.jsx';
import ChefOriginal from './pages/ChefOriginal.jsx';
import AceptarPedido from './pages/AceptarPedido.jsx';
import ActualizarEstado from './pages/ActualizarEstado.jsx';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notificar-entrega" element={<NotificarEntrega />} />
          <Route path="/recoger-pedido" element={<RecogerPedido />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/resenas" element={<Resenas />} />
          <Route path="/chef/agregar-plato" element={<AgregarPlato />} />
          <Route path="/chef/editar-plato" element={<EditarPlato />} />
          <Route path="/chef/dashboard" element={<ChefDashboard />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/reports" element={<ReportsIndex />} />
          <Route path="/register-fecha-nacimiento" element={<RegisterWithFechaNacimiento />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/chef-details" element={<AdminChefDetails />} />
          <Route path="/admin/create-user" element={<AdminCreateUser />} />
          <Route path="/admin/edit-user" element={<AdminEditUser />} />
          <Route path="/admin/reportes" element={<AdminReportes />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/orders-assigned" element={<OrdersAssigned />} />
          <Route path="/repartidor" element={<Repartidor />} />
          <Route path="/resolver-incidencias" element={<ResolverIncidencias />} />
          <Route path="/select-auth" element={<SelectAuth />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/chef-original" element={<ChefOriginal />} />
          <Route path="/aceptar-pedido" element={<AceptarPedido />} />
          <Route path="/actualizar-estado" element={<ActualizarEstado />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
