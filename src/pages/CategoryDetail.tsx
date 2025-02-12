import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const CategoryDetail: React.FC = () => {
const { categoryName } = useParams<{ categoryName: string }>();

interface Item {
id: number;
name: string;
description: string;
category: string;
serial: string;
model: string;
brand: string;
category_id: number;
location_id: number;
issue: string; // Descripción del problema
status: string;
room: string;
deco_serial: string;
deco_id: string;
access_card: string;
numero_activo: string;
}

interface Location {
id: number;
name: string;
}

const [items, setItems] = useState<Item[]>([]);
const [locations, setLocations] = useState<{ [key: number]: string }>({});

// Obtener elementos relacionados con la categoría
useEffect(() => {
const fetchCategoryItems = async () => {
    // Primero obtenemos el ID de la categoría basándonos en el nombre
    if (!categoryName) {
    console.error('Category name is undefined');
    return;
    }

    const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('name', decodeURIComponent(categoryName || ''))
    .single();

    if (categoryError) {
    console.error(categoryError);
    return;
    }

    const categoryId = categoryData?.id;

    // Luego obtenemos los equipos relacionados con el ID de la categoría
    const { data: equipmentData, error: equipmentError } = await supabase
    .from('equipment')
    .select('*')
    .eq('category_id', categoryId);

    if (equipmentError) {
    console.error(equipmentError);
    } else {
    setItems(equipmentData || []);
    }

    // Obtener los nombres de las ubicaciones
    const { data: locationData, error: locationError } = await supabase
    .from('locations')
    .select('*');

    if (locationError) {
    console.error(locationError);
    } else {
    const locationMap: { [key: number]: string } = {};
    locationData.forEach((location: Location) => {
        locationMap[location.id] = location.name;
    });
    setLocations(locationMap);
    }
};

fetchCategoryItems();
}, [categoryName]);

const isDecodificadores = categoryName === 'Decodificadores';

return (
<div className="container mt-4">
    <h1 className="mb-4">Contenido de la Categoría: {decodeURIComponent(categoryName || '')}</h1>

    {/* Mostrar los elementos en una tabla */}
    <table className="table table-striped">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Serial</th>
        <th scope="col">Modelo</th>
        <th scope="col">Marca</th>
        <th scope="col">Estado</th>
        <th scope="col">Ubicación</th>
        {isDecodificadores && (
            <>
            <th scope="col">Room</th>
            <th scope="col">Deco Serial</th>
            <th scope="col">Deco ID</th>
            <th scope="col">Access Card</th>
            <th scope="col">Número Activo</th>
            </>
        )}
        </tr>
    </thead>
    <tbody>
        {items.length > 0 ? (
        items.map((item, index) => (
            <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>{item.serial}</td>
            <td>{item.model}</td>
            <td>{item.brand}</td>
            <td>{item.status}</td>
            <td>{locations[item.location_id] || 'Sin ubicación'}</td> {/* Mostrar el nombre de la ubicación */}
            {isDecodificadores && (
                <>
                <td>{item.room}</td>
                <td>{item.deco_serial}</td>
                <td>{item.deco_id}</td>
                <td>{item.access_card}</td>
                <td>{item.numero_activo}</td>
                </>
            )}
            </tr>
        ))
        ) : (
        <tr>
            <td colSpan={isDecodificadores ? 12 : 7} className="text-center">
            No hay elementos disponibles para esta categoría.
            </td>
        </tr>
        )}
    </tbody>
    </table>
</div>
);
};

export default CategoryDetail;