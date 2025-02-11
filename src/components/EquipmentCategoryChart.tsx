// src/components/EquipmentCategoryChart.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Bar } from 'react-chartjs-2';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend,
} from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EquipmentCategoryChart: React.FC = () => {
interface ChartData {
labels: string[];
datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
}[];
}

const [chartData, setChartData] = useState<ChartData>({
labels: [],
datasets: [],
});

useEffect(() => {
const fetchEquipmentByCategory = async () => {
    try {
    const { data, error } = await supabase.rpc('count_equipment_by_category');
    if (error) {
        console.error('Error al obtener datos:', error.message);
        return;
    }

    // Verificar que los datos no estén vacíos
    if (!data || data.length === 0) {
        console.warn('No hay datos disponibles para la gráfica.');
        return;
    }

    interface EquipmentCategory {
        category_name: string;
        count: number;
    }

    const labels = data.map((item: EquipmentCategory) => item.category_name);
    const counts = data.map((item: EquipmentCategory) => item.count);

    setChartData({
        labels,
        datasets: [
        {
            label: 'Equipos por Categoría',
            data: counts,
            backgroundColor: ['#3F51B5', '#E91E63', '#FFC107', '#03A9F4'],
        },
        ],
    });
    } catch (err) {
    console.error('Error inesperado:', err);
    }
};

fetchEquipmentByCategory();
}, []);

// Mostrar un mensaje si no hay datos disponibles
if (!chartData.datasets || chartData.datasets.length === 0) {
return <p>No hay datos disponibles para mostrar.</p>;
}

return (
<div>
    <h5 className="text-center">Equipos por Categoría</h5>
    <Bar data={chartData} />
</div>
);
};

export default EquipmentCategoryChart;