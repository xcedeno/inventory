// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import GeneralMetrics from '../components/GeneralMetrics';
import EquipmentStatusChart from '../components/EquipmentStatusChart';
import EquipmentCategoryChart from '../components/EquipmentCategoryChart';

const Home: React.FC = () => {
return (
<div className="container text-center mt-5">
    {/* Bienvenida */}
    <h1 className="mb-4">Bienvenido al Sistema de Inventario</h1>
    <p className="lead">
    Aquí puedes gestionar el inventario de equipos del departamento de tecnología.
    </p>

    {/* Sección de Tarjetas */}
    <div className="row mt-5">
    <div className="col-md-4">
        <div className="card bg-primary text-white p-4 mb-3">
        <h3>Equipos Activos</h3>
        <Link to="/active-inventory" className="btn btn-light">
            Ver Equipos Activos
        </Link>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card bg-warning text-white p-4 mb-3">
        <h3>Descontinuados</h3>
        <Link to="/discontinued" className="btn btn-light">
            Ver Equipos Descontinuados
        </Link>
        </div>
    </div>
    <div className="col-md-4">
        <div className="card bg-danger text-white p-4 mb-3">
        <h3>Dañados</h3>
        <Link to="/damaged" className="btn btn-light">
            Ver Equipos Dañados
        </Link>
        </div>
    </div>
    </div>

    {/* Sección de Dashboard (Gráficas y Métricas) */}
    <div className="row mt-5">
    {/* Métricas Generales */}
    <div className="col-md-12">
        <h2 className="text-center mb-4">Métricas Generales</h2>
        <GeneralMetrics />
    </div>

    {/* Gráfica de Equipos por Estado */}
    <div className="col-md-6 mt-4">
        <EquipmentStatusChart />
    </div>

    {/* Gráfica de Equipos por Categoría */}
    <div className="col-md-6 mt-4">
        <EquipmentCategoryChart />
    </div>
    </div>
</div>
);
};

export default Home;