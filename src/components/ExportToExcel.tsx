// src/components/ExportToExcel.tsx
import React from 'react';
import * as XLSX from 'xlsx';

interface ExportToExcelProps {
data: Record<string, any>[];
fileName: string;
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data, fileName }) => {
const handleExport = () => {
const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');
XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

return (
<button onClick={handleExport} className="btn btn-success mb-3">
    Exportar a Excel
</button>
);
};

export default ExportToExcel;