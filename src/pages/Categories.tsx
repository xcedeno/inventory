import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom'; // Importa Link para crear enlaces

const Categories: React.FC = () => {
const [categories, setCategories] = useState<string[]>([]);
const [newCategory, setNewCategory] = useState('');

// Obtener categorías de Supabase
useEffect(() => {
const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('name');
    if (error) console.error(error);
    else setCategories(data.map((item) => item.name));
};
fetchCategories();
}, []);

// Agregar una nueva categoría
const handleAddCategory = async () => {
if (!newCategory.trim()) return;
const { error } = await supabase.from('categories').insert({ name: newCategory });
if (error) console.error(error);
else {
    setCategories([...categories, newCategory]);
    setNewCategory('');
}
};

return (
<div className="container mt-4">
    <h1 className="mb-4">Gestión de Categorías</h1>
    <div className="input-group mb-3">
    <input
        type="text"
        className="form-control"
        placeholder="Nueva categoría"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
    />
    <button className="btn btn-primary" onClick={handleAddCategory}>
        Agregar Categoría
    </button>
    </div>

    {/* Mostrar categorías como tarjetas */}
    <div className="row">
    {categories.map((category, index) => (
        <div key={index} className="col-md-4 mb-4">
        <div className="card h-100">
            <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{category}</h5>
            <Link to={`/category/${encodeURIComponent(category)}`} className="btn btn-primary mt-auto">
                Ver Contenido
            </Link>
            </div>
        </div>
        </div>
))}
    </div>
</div>
);
};

export default Categories;