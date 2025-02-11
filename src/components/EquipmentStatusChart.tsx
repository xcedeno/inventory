// src/components/EquipmentStatusChart.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Pie } from 'react-chartjs-2';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
ArcElement,
Tooltip,
Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const EquipmentStatusChart: React.FC = () => {
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
const fetchEquipmentStatus = async () => {
    const { data, error } = await supabase.rpc('count_equipment_by_status');
    if (error) console.error(error);
    else {
    interface EquipmentStatus {
        status: string;
        count: number;
    }

    const labels = data.map((item: EquipmentStatus) => item.status);
    const counts = data.map((item: EquipmentStatus) => item.count);
    setChartData({
        labels,
        datasets: [
        {
            label: 'Equipos por Estado',
            data: counts,
            backgroundColor: ['#4CAF50', '#FF9800', '#F44336'], // Colores para Activo, Dañado, Descontinuado
        },
        ],
    });
    }
};
fetchEquipmentStatus();
}, []);

return (
<div>
    <h5 className="text-center">Equipos por Estado</h5>
    <Pie data={chartData} />
</div>
);
};

export default EquipmentStatusChart;