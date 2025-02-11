// src/pages/ActiveInventory.tsx
import React, { useEffect, useState } from 'react';
import InventoryTable from '../components/InventoryTable';
import ExportToExcel from '../components/ExportToExcel';
import { supabase } from '../supabaseClient';

interface Equipment {
id: number;
name: string;
serial: string;
model: string;
brand: string;
category_id: number;
location_id: number;
[key: string]: string | number | boolean;
}

const ActiveInventory: React.FC = () => {
const [inventory, setInventory] = useState<Equipment[]>([]);

// Obtener equipos activos de Supabase
useEffect(() => {
const fetchActiveInventory = async () => {
    const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .eq('status', 'active');
    if (error) console.error(error);
    else setInventory(data);
};
fetchActiveInventory();
}, []);

const columns = ['id', 'name', 'serial', 'model', 'brand',  'Categoría', 'Ubicación'];


return (
<div className="container mt-4">
    <h1 className="mb-4">Equipos Activos</h1>
    <div className="d-flex justify-content-between mb-3">
    <ExportToExcel data={inventory} fileName="ActiveInventory" />
    </div>
    <InventoryTable data={inventory} columns={columns} />
</div>
);
};

export default ActiveInventory;