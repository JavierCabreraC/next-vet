import { useState } from "react";
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { BitacoraReportForm } from "../report/BitacoraReportForm";
import { API_CONFIG, ApiService } from '@/services/index.services';
import { AutoTableSettings, BitacoraReport, ServicioReport, VetServicioReport, ViewState } from "@/types/admin";


declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: AutoTableSettings) => jsPDF;
    }
}

interface ReporteSectionProps {
    view: ViewState;
}

export const ReporteSection: React.FC<ReporteSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reportData, setReportData] = useState<BitacoraReport[]>([]);
    const [serviciosData, setServiciosData] = useState<ServicioReport[]>([]);
    const [vetServiciosData, setVetServiciosData] = useState<VetServicioReport[]>([]);

    const handleGenerateReport = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<BitacoraReport[]>(`${API_CONFIG.ENDPOINTS.ADM_REPORTBITACORA}/${ci}`, {
                method: 'GET',
            });
            console.log(reportData);
            setReportData(data);
            await generatePDF(data, ci);
        } catch (error) {
            console.error('Error al generar reporte:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateServiciosReport = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ServicioReport[]>(
                `${API_CONFIG.ENDPOINTS.ADM_REPORTSERVICIO}/${ci}`,
                { method: 'GET' }
            );
            console.log(serviciosData);
            setServiciosData(data);
            await generateServiciosPDF(data, ci);
        } catch (error) {
            console.error('Error al generar reporte de servicios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generatePDF = async (data: BitacoraReport[], ci: string) => { // añadimos ci como parámetro
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(16);
        doc.text('Reporte de Bitácora', 20, 20);
        
        // Información del CI
        doc.setFontSize(12);
        doc.text(`Cliente CI: ${ci}`, 20, 30);
        
        // Fecha de generación
        doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
        
        // Datos
        const headers = [['Fecha y Hora', 'Dirección IP', 'Acción']];
        const rows = data.map(item => [
            new Date(item.FechaHora).toLocaleString(),
            item.IPDir,
            item.Accion
        ]);
    
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 50, // ajustamos startY para dar espacio al nuevo texto
            theme: 'grid'
        });
    
        // Descargar PDF
        doc.save(`reporte-bitacora-${ci}.pdf`); // incluimos el CI en el nombre del archivo
    };

    // const generateServiciosPDF = async (data: ServicioReport[], ci: string) => {
    //     const doc = new jsPDF();
        
    //     // Título
    //     doc.setFontSize(16);
    //     doc.text('Reporte de Servicios por Cliente', 20, 20);
        
    //     // Información del CI
    //     doc.setFontSize(12);
    //     doc.text(`Cliente CI: ${ci}`, 20, 30);
        
    //     // Fecha de generación
    //     doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
        
    //     // Datos
    //     const headers = [['Tipo de Servicio', 'Total de Servicios']];
    //     const rows = data.map(item => [
    //         item.TipoServicio,
    //         item['Total Servicios'].toString()
    //     ]);

    //     doc.autoTable({
    //         head: headers,
    //         body: rows,
    //         startY: 50,
    //         theme: 'grid'
    //     });

    //     // Descargar PDF
    //     doc.save(`reporte-servicios-${ci}.pdf`);
    // };

    const handleGenerateVetServiciosReport = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<VetServicioReport[]>(
                `${API_CONFIG.ENDPOINTS.ADM_REPORTVETSERV}/${ci}`,
                { method: 'GET' }
            );
            console.log(vetServiciosData);
            setVetServiciosData(data);
            await generateVetServiciosPDF(data, ci);
        } catch (error) {
            console.error('Error al generar reporte de servicios de veterinario:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateServiciosPDF = async (data: ServicioReport[], ci: string) => {
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('Reporte de Servicios por Cliente', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Cliente CI: ${ci}`, 20, 30);
        
        doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
        
        const headers = [['Tipo de Servicio', 'Total de Servicios']];
        const rows = data.map(item => [
            item.TipoServicio,
            item['Total Servicios'].toString()
        ]);

        doc.autoTable({
            head: headers,
            body: rows,
            startY: 50,
            theme: 'grid'
        });

        doc.save(`reporte-servicios-${ci}.pdf`);
    };
    
    const generateVetServiciosPDF = async (data: VetServicioReport[], ci: string) => {
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(16);
        doc.text('Reporte de Servicios de Veterinario', 20, 20);
        
        // Información del CI
        doc.setFontSize(12);
        doc.text(`Veterinario CI: ${ci}`, 20, 30);
        
        // Fecha de generación
        doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
        
        // Datos
        const headers = [
            ['Servicio', 'Mascota', 'Raza', 'Dueño', 'Inicio', 'Fin']
        ];
        const rows = data.map(item => [
            item.TipoServicio,
            item['Nombre Mascota'],
            item.NombreRaza,
            item['Nombre Dueño'],
            new Date(item.FechaHoraInicio).toLocaleString(),
            new Date(item.FechaHoraFin).toLocaleString()
        ]);
    
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 50,
            theme: 'grid',
            styles: { fontSize: 8 }, // Reducimos el tamaño de la fuente para que quepa toda la información
            columnStyles: {
                0: { cellWidth: 25 }, // Servicio
                1: { cellWidth: 25 }, // Mascota
                2: { cellWidth: 25 }, // Raza
                3: { cellWidth: 35 }, // Dueño
                4: { cellWidth: 35 }, // Inicio
                5: { cellWidth: 35 }  // Fin
            }
        });
    
        doc.save(`reporte-servicios-vet-${ci}.pdf`);
    };
    

    switch (view) {
        case 'report-bitacora':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Reporte de Bitácora</h2>
                    <BitacoraReportForm 
                        onSubmit={handleGenerateReport}
                        isLoading={isLoading}
                    />
                </div>
            );
        case 'report-servicios':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Reporte de Servicios por Cliente</h2>
                    <BitacoraReportForm  // Podemos reutilizar el mismo formulario
                        onSubmit={handleGenerateServiciosReport}
                        isLoading={isLoading}
                    />
                </div>
            );
        case 'report-vet-servicios':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Reporte de Servicios de Veterinario</h2>
                    <BitacoraReportForm // Acá también, sólo se pide CI
                        onSubmit={handleGenerateVetServiciosReport}
                        isLoading={isLoading}
                    />
                </div>
            );
        default:
            return null;
    }
};
