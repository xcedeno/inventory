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
    {/* Botón de Hamburguesa */}
    <div className="d-flex justify-content-between align-items-center mb-4">
    <button
        className="btn btn-light d-block d-md-none toggle-button"
        onClick={toggleCollapse}
        title="Toggle Menu"
    >
        <i className={`bi ${isCollapsed ? 'bi-arrow-right-square' : 'bi-list'}`}></i>
    </button>
    {!isCollapsed && <h4>Inventario</h4>}
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
        {!isCollapsed && 'Inicio'}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/categories"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Categorías"
        >
        <i className="bi bi-tags me-2"></i>
        {!isCollapsed && 'Categorías'}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/active-inventory"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Equipos Activos"
        >
        <i className="bi bi-check-circle me-2"></i>
        {!isCollapsed && 'Equipos Activos'}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/discontinued"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Descontinuados"
        >
        <i className="bi bi-x-circle me-2"></i>
        {!isCollapsed && 'Descontinuados'}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/damaged"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Dañados"
        >
        <i className="bi bi-exclamation-triangle me-2"></i>
        {!isCollapsed && 'Dañados'}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/locations"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Ubicaciones"
        >
        <i className="bi bi-geo-alt me-2"></i>
        {!isCollapsed && 'Ubicaciones'}
        </Link>
    </li>
    <li className="mb-2">
        <Link
        to="/add-equipment"
        className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
        title="Agregar Equipo"
        >
        <i className="bi bi-plus-circle me-2"></i>
        {!isCollapsed && 'Agregar Equipo'}
        </Link>
    </li>
    </ul>
</nav>
);
};

export default Navbar;