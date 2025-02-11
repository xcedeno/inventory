// src/pages/Locations.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Locations: React.FC = () => {
const [locations, setLocations] = useState<string[]>([]);
const [newLocation, setNewLocation] = useState('');

// Obtener ubicaciones de Supabase
useEffect(() => {
const fetchLocations = async () => {
    const { data, error } = await supabase.from('locations').select('name');
    if (error) console.error(error);
    else setLocations(data.map((item) => item.name));
};
fetchLocations();
}, []);

// Agregar una nueva ubicación
const handleAddLocation = async () => {
if (!newLocation.trim()) return;

const { error } = await supabase.from('locations').insert({ name: newLocation });
if (error) console.error(error);
else {
    setLocations([...locations, newLocation]);
    setNewLocation('');
}
};

return (
<div className="container mt-4">
    <h1 className="mb-4">Gestión de Ubicaciones</h1>
    <div className="input-group mb-3">
    <input
        type="text"
        className="form-control"
        placeholder="Nueva ubicación"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
    />
    <button className="btn btn-primary" onClick={handleAddLocation}>
        Agregar Ubicación
    </button>
    </div>
    <ul className="list-group">
    {locations.map((location, index) => (
        <li key={index} className="list-group-item">
        {location}
        </li>
    ))}
    </ul>
</div>
);
};

export default Locations;