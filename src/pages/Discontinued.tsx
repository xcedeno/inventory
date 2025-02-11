// src/pages/Discontinued.tsx
import React, { useEffect, useState } from 'react';
import InventoryTable from '../components/InventoryTable';
import ExportToExcel from '../components/ExportToExcel';
import { supabase } from '../supabaseClient';

interface Equipment {
id: number;
name: string;
category: string;
location: string;
discontinuedDate: string; // Fecha de descontinuación
[key: string]: string | number | boolean;
}

const Discontinued: React.FC = () => {
const [discontinuedEquipment, setDiscontinuedEquipment] = useState<Equipment[]>([]);

// Obtener equipos descontinuados de Supabase
useEffect(() => {
    const fetchDiscontinuedEquipment = async () => {
    const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'discontinued');
    if (error) console.error(error);
    else setDiscontinuedEquipment(data);
    };
    fetchDiscontinuedEquipment();
}, []);


const columns = ['id', 'name', 'category', 'location', 'discontinuedDate'];

return (
<div className="container mt-4">
<h1 className="mb-4">Equipos Descontinuados</h1>
<ExportToExcel data={discontinuedEquipment} fileName="DiscontinuedEquipment" />
<InventoryTable data={discontinuedEquipment} columns={columns} />
</div>
);
};

export default Discontinued;