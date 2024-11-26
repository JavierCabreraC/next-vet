import 'jspdf-autotable';
import jsPDF from 'jspdf';
import type { HistorialReceta } from '@/types/client';


export const generateHistorialPDF = async (
    data: HistorialReceta[],
    nombreMascota: string
): Promise<void> => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Historial de Recetas y Análisis', 20, 20);
    
    // Nombre de la mascota
    doc.setFontSize(14);
    doc.text(`Mascota: ${nombreMascota}`, 20, 30);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
    
    // Preparar datos para la tabla
    const headers = [
        ['Tipo Servicio', 'Tipo Registro', 'Medicamento', 'Dosis', 'Indicaciones', 'Fecha']
    ];
    
    const rows = data.map(item => [
        item['Tipo Servicio'],
        item['Tipo Registro'],
        item['Medicamento'],
        item['Dosis'],
        item['Indicaciones'] || '-',
        new Date(item['Fecha Emisión']).toLocaleDateString()
    ]);

    // Generar tabla
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 50,
        theme: 'grid',
        styles: { 
            fontSize: 8,
            cellPadding: 2
        },
        columnStyles: {
            0: { cellWidth: 25 },  // Tipo Servicio
            1: { cellWidth: 25 },  // Tipo Registro
            2: { cellWidth: 30 },  // Medicamento
            3: { cellWidth: 25 },  // Dosis
            4: { cellWidth: 45 },  // Indicaciones
            5: { cellWidth: 25 }   // Fecha
        }
    });

    // Descargar PDF
    doc.save(`historial-${nombreMascota.toLowerCase()}.pdf`);
};
