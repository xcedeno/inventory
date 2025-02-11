// src/pages/AddEquipment.tsx
import React from 'react';
import AddEquipmentForm from '../components/AddEquipmentForm';

const AddEquipment: React.FC = () => {
const handleAddSuccess = () => {
// Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
console.log('Equipo agregado exitosamente.');
};

return (
<div className="container mt-4">
    <h1 className="mb-4">Agregar Nuevo Equipo</h1>
    <AddEquipmentForm onAddSuccess={handleAddSuccess} />
</div>
);
};

export default AddEquipment;