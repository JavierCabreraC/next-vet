import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { useState } from "react";
import { API_CONFIG, ApiService } from '@/services/index.services';
import { BitacoraReportForm, ServicioReportForm } from "../index.admincomp";
import { AutoTableSettings, BitacoraReport, FiltrosServicio, ReporteDinamico, ServicioReport, 
    VetServicioReport, ViewState } from "@/types/admin";


declare module 'jspdf' {
    interface jsPDF {
        lastAutoTable: {
            finalY: number;
        };
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

    const handleGenerateDynamicReport = async (filtros: FiltrosServicio) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ReporteDinamico>(
                `${API_CONFIG.ENDPOINTS.ADM_REPORTDINAMICO}`,
                {
                    method: 'POST',
                    body: JSON.stringify(filtros)
                }
            );
            await generateDynamicPDF(data, filtros);
        } catch (error) {
            console.error('Error al generar reporte dinámico:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generatePDF = async (data: BitacoraReport[], ci: string) => {
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
    
        doc.save(`reporte-bitacora-${ci}.pdf`); // incluimos el CI en el nombre del archivo
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
    
    const generateDynamicPDF = async (data: ReporteDinamico, filtros: FiltrosServicio) => {
        const doc = new jsPDF();
        
        // Título principal
        doc.setFontSize(16);
        doc.text('Reporte Dinámico de Servicios', 20, 20);
        
        let yPos = 30;
        doc.setFontSize(10);
        
        // Información de filtros
        if (filtros.fechaInicio || filtros.fechaFin) {
            const fechaInicio = filtros.fechaInicio ? new Date(filtros.fechaInicio).toLocaleDateString() : 'No especificada';
            const fechaFin = filtros.fechaFin ? new Date(filtros.fechaFin).toLocaleDateString() : 'No especificada';
            doc.text(`Período: ${fechaInicio} - ${fechaFin}`, 20, yPos);
            yPos += 10;
        }
    
        if (filtros.tipoServicio?.length) {
            doc.text(`Tipos de servicio: ${filtros.tipoServicio.join(', ')}`, 20, yPos);
            yPos += 10;
        }
    
        doc.text(`Generado el: ${new Date().toLocaleString()}`, 20, yPos);
        yPos += 15;
    
        // Procesar cada grupo
        data.grupos.forEach(grupo => {
            doc.setFontSize(12);
            let titulo = '';
    
            if (grupo.tipo === 'veterinario') {
                titulo = `Veterinario: ${grupo.nombreVeterinario} - Total: ${grupo.cantidad}`;
            } else if (grupo.tipo === 'tipoServicio') {
                titulo = `Tipo de Servicio: ${grupo.TipoServicio} - Total: ${grupo.cantidad}`;
            }
    
            doc.text(titulo, 20, yPos);
            yPos += 10;
    
            // Filtrar servicios para este grupo
            const serviciosGrupo = data.servicios.filter(servicio => {
                if (grupo.tipo === 'veterinario') {
                    return servicio.NombreVeterinario === grupo.nombreVeterinario;
                } else if (grupo.tipo === 'tipoServicio') {
                    return servicio.TipoServicio === grupo.TipoServicio;
                }
                return false;
            });
    
            // Tabla de servicios
            const headers = [
                ['ID', 'Tipo', 'Inicio', 'Fin', 'Veterinario', 'Mascota', 'Cliente']
            ];
    
            const formatDateTime = (dateTime: string): string => {
                const date = new Date(dateTime);
                const options: Intl.DateTimeFormatOptions = {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                };
                return date.toLocaleString('es-ES', options);
            };
    
            const rows = serviciosGrupo.map(servicio => [
                servicio.ServicioID.toString(),
                servicio.TipoServicio,
                formatDateTime(servicio.FechaHoraInicio),
                servicio.FechaHoraFin ? formatDateTime(servicio.FechaHoraFin) : '',
                servicio.NombreVeterinario,
                servicio.NombreMascota,
                servicio.NombreCliente,
            ]);
    
            doc.autoTable({
                head: headers,
                body: rows,
                startY: yPos,
                theme: 'grid',
                styles: { fontSize: 8 },
                columnStyles: {
                    0: { cellWidth: 15 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 35 },
                    3: { cellWidth: 35 },
                    4: { cellWidth: 30 },
                    5: { cellWidth: 25 },
                    6: { cellWidth: 25 }
                }
            });
    
            yPos = doc.lastAutoTable.finalY + 15;
    
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
        });
    
        doc.save('reporte-servicios-dinamico.pdf');
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
        case 'report-dinamico':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Reporte Dinámico de Servicios</h2>
                    <ServicioReportForm 
                        onSubmit={handleGenerateDynamicReport}
                        isLoading={isLoading}
                    />
                </div>
            );
        default:
            return null;
    }
};
