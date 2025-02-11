// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar el colapso

// Función para alternar el estado del menú
const toggleCollapse = () => {
setIsCollapsed(!isCollapsed);
};

return (
<nav className="bg-dark text-white vh-100 p-3" style={{ width: isCollapsed ? '80px' : '250px', transition: 'width 0.3s' }}>
    {/* Botón de Hamburguesa y Título */}
    <div className="d-flex justify-content-between align-items-center mb-4">
    {/* Botón de Hamburguesa (Visible en Pantallas Pequeñas) */}
    <button
        className="btn btn-light d-flex align-items-center justify-content-center toggle-button"
        onClick={toggleCollapse}
        title="Toggle Menu"
    >
        <i className={`bi ${isCollapsed ? 'bi-arrow-right-square-fill' : 'bi-list'}`}></i>
    </button>

    {/* Título "Inventario" (Oculto en Pantallas Pequeñas) */}
    {!isCollapsed && <h4 className="mb-0 d-none d-md-block">Inventario</h4>}
    </div>

    {/* Lista de Enlaces */}
    <ul className="list-unstyled">
    <li className="mb-2">
        <Link
        to="/"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Inicio"
        >
        <i className="bi bi-house me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Inicio</span>}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/categories"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Categorías"
        >
        <i className="bi bi-tags me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Categorías</span>}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/active-inventory"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Equipos Activos"
        >
        <i className="bi bi-check-circle me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Equipos Activos</span>}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/discontinued"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Descontinuados"
        >
        <i className="bi bi-x-circle me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Descontinuados</span>}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/damaged"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Dañados"
        >
        <i className="bi bi-exclamation-triangle me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Dañados</span>}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/locations"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Ubicaciones"
        >
        <i className="bi bi-geo-alt me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Ubicaciones</span>}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/add-equipment"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Agregar Equipo"
        >
        <i className="bi bi-plus-circle me-2"></i>
        {!isCollapsed && <span className="d-none d-md-inline">Agregar Equipo</span>}
        </Link>
    </li>
    </ul>
</nav>
);
};

export default Navbar;