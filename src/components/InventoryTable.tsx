// src/components/InventoryTable.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface InventoryTableProps {
data: Record<string, string | number | boolean>[];
columns: string[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data, columns }) => {
const [categories, setCategories] = useState<Record<number, string>>({});
const [locations, setLocations] = useState<Record<number, string>>({});

// Obtener nombres de categorías
useEffect(() => {
const fetchCategories = async () => {
    const { data: categoriesData, error } = await supabase.from('categories').select('id, name');
    if (error) console.error(error);
    else {
    const categoriesMap = categoriesData.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    }, {} as Record<number, string>);
    setCategories(categoriesMap);
    }
};
fetchCategories();
}, []);

// Obtener nombres de ubicaciones
useEffect(() => {
const fetchLocations = async () => {
    const { data: locationsData, error } = await supabase.from('locations').select('id, name');
    if (error) console.error(error);
    else {
    const locationsMap = locationsData.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    }, {} as Record<number, string>);
    setLocations(locationsMap);
    }
};
fetchLocations();
}, []);

return (
<div className="table-responsive">
    <table className="table table-bordered table-hover">
    {/* Encabezado de la tabla */}
    <thead className="table-dark">
        <tr>
        {columns.map((column, index) => (
            <th key={index} scope="col">{column}</th>
        ))}
        </tr>
    </thead>
    {/* Cuerpo de la tabla */}
    <tbody>
        {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {columns.map((column, colIndex) => {
            if (column === 'Categoría') {
                return <td key={colIndex}>{categories[row['category_id'] as number] || 'N/A'}</td>;
            }
            if (column === 'Ubicación') {
                return <td key={colIndex}>{locations[row['location_id'] as number] || 'N/A'}</td>;
            }
            return <td key={colIndex}>{row[column]}</td>;
            })}
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
};

export default InventoryTable;