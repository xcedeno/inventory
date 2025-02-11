// src/components/AddCategoryForm.tsx
import React, { useState } from 'react';

interface AddCategoryFormProps {
onAddCategory: (category: string) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onAddCategory }) => {
const [category, setCategory] = useState('');

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (category.trim()) {
    onAddCategory(category.trim());
    setCategory('');
}
};

return (
<form onSubmit={handleSubmit} className="mb-4">
    <div className="input-group">
    <input
        type="text"
        className="form-control"
        placeholder="Nueva categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    />
    <button type="submit" className="btn btn-primary">
        Agregar Categoría
    </button>
    </div>
</form>
);
};

export default AddCategoryForm;