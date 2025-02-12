import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface AddEquipmentFormProps {
onAddSuccess: () => void; // Callback para notificar que se agregó un equipo
}

const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({ onAddSuccess }) => {
const [name, setName] = useState('');
const [serial, setSerial] = useState('');
const [model, setModel] = useState('');
const [brand, setBrand] = useState('');
const [status, setStatus] = useState<'active' | 'discontinued' | 'damaged'>('active');
const [categoryId, setCategoryId] = useState<number | null>(null);
const [locationId, setLocationId] = useState<number | null>(null);
const [issue, setIssue] = useState(''); // Observación o descripción del problema
const [discontinuedDate, setDiscontinuedDate] = useState('');

// Nuevos campos
const [room, setRoom] = useState('');
const [decoSerial, setDecoSerial] = useState('');
const [decoId, setDecoId] = useState('');
const [accessCard, setAccessCard] = useState('');
const [numeroActivo, setNumeroActivo] = useState('');

const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);

// Cargar categorías desde Supabase
useEffect(() => {
const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('id, name');
    if (error) console.error(error);
    else setCategories(data);
};
fetchCategories();
}, []);

// Cargar ubicaciones desde Supabase
useEffect(() => {
const fetchLocations = async () => {
    const { data, error } = await supabase.from('locations').select('id, name');
    if (error) console.error(error);
    else setLocations(data);
};
fetchLocations();
}, []);

// Manejar el envío del formulario
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

if (!name || !serial || !model || !brand || !categoryId || !locationId) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
}

const newEquipment = {
    name,
    serial,
    model,
    brand,
    status,
    category_id: categoryId,
    location_id: locationId,
    issue: status === 'damaged' ? issue : null, // Solo para equipos dañados
    discontinued_date: status === 'discontinued' ? discontinuedDate : null, // Solo para equipos descontinuados
    room: categoryId === categories.find(c => c.name === 'Decodificadores')?.id ? room : null,
    deco_serial: categoryId === categories.find(c => c.name === 'Decodificadores')?.id ? decoSerial : null,
    deco_id: categoryId === categories.find(c => c.name === 'Decodificadores')?.id ? decoId : null,
    access_card: categoryId === categories.find(c => c.name === 'Decodificadores')?.id ? accessCard : null,
    numero_activo: categoryId === categories.find(c => c.name === 'Decodificadores')?.id ? numeroActivo : null,
};

const { error } = await supabase.from('equipment').insert(newEquipment);
if (error) {
    console.error(error);
    alert('Hubo un error al agregar el equipo.');
} else {
    alert('Equipo agregado exitosamente.');
    onAddSuccess(); // Notificar que se agregó un equipo
    setName('');
    setSerial('');
    setModel('');
    setBrand('');
    setStatus('active');
    setCategoryId(null);
    setLocationId(null);
    setIssue('');
    setDiscontinuedDate('');
    setRoom('');
    setDecoSerial('');
    setDecoId('');
    setAccessCard('');
    setNumeroActivo('');
}
};

const isDecodificadores = categoryId === categories.find(c => c.name === 'Decodificadores')?.id;

return (
<form onSubmit={handleSubmit} className="container mt-4">
    <h2>Agregar Nuevo Equipo</h2>

    {/* Nombre */}
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Nombre del Equipo</label>
    <input
        type="text"
        className="form-control"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
    />
    </div>

    {/* Serial */}
    <div className="mb-3">
    <label htmlFor="serial" className="form-label">Serial</label>
    <input
        type="text"
        className="form-control"
        id="serial"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        required
    />
    </div>

    {/* Modelo */}
    <div className="mb-3">
    <label htmlFor="model" className="form-label">Modelo</label>
    <input
        type="text"
        className="form-control"
        id="model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
    />
    </div>

    {/* Marca */}
    <div className="mb-3">
    <label htmlFor="brand" className="form-label">Marca</label>
    <input
        type="text"
        className="form-control"
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
    />
    </div>

    {/* Estado */}
    <div className="mb-3">
    <label htmlFor="status" className="form-label">Estado</label>
    <select
        className="form-select"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as 'active' | 'discontinued' | 'damaged')}
    >
        <option value="active">Activo</option>
        <option value="discontinued">Descontinuado</option>
        <option value="damaged">Dañado</option>
    </select>
    </div>

    {/* Categoría */}
    <div className="mb-3">
    <label htmlFor="category" className="form-label">Categoría</label>
    <select
        className="form-select"
        id="category"
        value={categoryId || ''}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        required
    >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
        ))}
    </select>
    </div>

    {/* Ubicación */}
    <div className="mb-3">
    <label htmlFor="location" className="form-label">Ubicación</label>
    <select
        className="form-select"
        id="location"
        value={locationId || ''}
        onChange={(e) => setLocationId(Number(e.target.value))}
        required
    >
        <option value="">Selecciona una ubicación</option>
        {locations.map((location) => (
        <option key={location.id} value={location.id}>
            {location.name}
        </option>
        ))}
    </select>
    </div>

    {/* Nuevos campos (solo para Decodificadores) */}
    {isDecodificadores && (
    <>
        <div className="mb-3">
        <label htmlFor="room" className="form-label">Room</label>
        <input
            type="text"
            className="form-control"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
        />
        </div>

        <div className="mb-3">
        <label htmlFor="decoSerial" className="form-label">Deco Serial</label>
        <input
            type="text"
            className="form-control"
            id="decoSerial"
            value={decoSerial}
            onChange={(e) => setDecoSerial(e.target.value)}
        />
        </div>

        <div className="mb-3">
        <label htmlFor="decoId" className="form-label">Deco ID</label>
        <input
            type="text"
            className="form-control"
            id="decoId"
            value={decoId}
            onChange={(e) => setDecoId(e.target.value)}
        />
        </div>

        <div className="mb-3">
        <label htmlFor="accessCard" className="form-label">Access Card</label>
        <input
            type="text"
            className="form-control"
            id="accessCard"
            value={accessCard}
            onChange={(e) => setAccessCard(e.target.value)}
        />
        </div>

        <div className="mb-3">
        <label htmlFor="numeroActivo" className="form-label">Número Activo</label>
        <input
            type="text"
            className="form-control"
            id="numeroActivo"
            value={numeroActivo}
            onChange={(e) => setNumeroActivo(e.target.value)}
        />
        </div>
    </>
    )}

    {/* Observación (solo para equipos dañados) */}
    {status === 'damaged' && (
    <div className="mb-3">
        <label htmlFor="issue" className="form-label">Observación o Descripción del Problema</label>
        <textarea
        className="form-control"
        id="issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        required
        />
    </div>
    )}

    {/* Fecha de Descontinuación (solo para equipos descontinuados) */}
    {status === 'discontinued' && (
    <div className="mb-3">
        <label htmlFor="discontinuedDate" className="form-label">Fecha de Descontinuación</label>
        <input
        type="date"
        className="form-control"
        id="discontinuedDate"
        value={discontinuedDate}
        onChange={(e) => setDiscontinuedDate(e.target.value)}
        required
        />
    </div>
    )}

    {/* Botón de Envío */}
    <button type="submit" className="btn btn-primary">Agregar Equipo</button>
</form>
);
};

export default AddEquipmentForm;