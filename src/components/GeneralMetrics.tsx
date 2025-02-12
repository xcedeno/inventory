// src/components/GeneralMetrics.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const GeneralMetrics: React.FC = () => {
const [metrics, setMetrics] = useState({
total: 0,
active: 0,
damaged: 0,
discontinued: 0,
});

useEffect(() => {
const fetchMetrics = async () => {
    const { data, error } = await supabase.rpc('get_equipment_metrics');
    if (error) console.error(error);
    else {
    setMetrics(data[0]);
    }
};
fetchMetrics();
}, []);

return (
<div className="row">
    <div className="col-md-3">
    <div className="card text-center p-3 bg-primary text-white">
        <h5>Total de Equipos</h5>
        <p>{metrics.total}</p>
    </div>
    </div>
    <div className="col-md-3">
    <div className="card text-center p-3 bg-success text-white">
        <h5>Equipos Activos</h5>
        <p>{metrics.active}</p>
    </div>
    </div>
    <div className="col-md-3">
    <div className="card text-center p-3 bg-warning text-white">
        <h5>Equipos Dañados</h5>
        <p>{metrics.damaged}</p>
    </div>
    </div>
    <div className="col-md-3">
    <div className="card text-center p-3 bg-danger text-white">
        <h5>Descontinuados</h5>
        <p>{metrics.discontinued}</p>
    </div>
    </div>
</div>
);
};

export default GeneralMetrics;