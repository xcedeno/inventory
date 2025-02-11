import React, { useEffect, useState } from 'react';
import InventoryTable from '../components/InventoryTable';
import ExportToExcel from '../components/ExportToExcel';
import { supabase } from '../supabaseClient';;

interface Equipment {
id: number;
name: string;
category: string;
location: string;
serial: string;
model: string;
brand: string;
category_id: number;
location_id: number;
issue: string; // Descripción del problema
[key: string]: string | number;
}

const Damaged: React.FC = () => {
const [damagedEquipment, setDamagedEquipment] = useState<Equipment[]>([]);

// Obtener equipos dañados de Supabase
useEffect(() => {
    const fetchDamagedEquipment = async () => {
    const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'damaged');
    if (error) console.error(error);
    else setDamagedEquipment(data);
    };
    fetchDamagedEquipment();
}, []);
const columns = ['id', 'name', 'serial', 'model', 'brand', 'Categoría', 'Ubicación', 'issue'];

return (
<div className="container mt-4">
<h1 className="mb-4">Equipos Dañados</h1>
<ExportToExcel data={damagedEquipment} fileName="DamagedEquipment" />
<InventoryTable data={damagedEquipment} columns={columns} />
</div>
);
};

export default Damaged;