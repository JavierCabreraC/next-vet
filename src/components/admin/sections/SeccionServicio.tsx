import React, { useState } from 'react';
import { calcularPrecioServicio } from '@/utils/index.utils';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { ViewState, ServicioRecibo, DetalleReciboPreview } from '@/types/admin';
import { ReciboPreview, ServicioReciboForm } from '@/components/admin/index.admincomp';


interface ServicioSectionProps {
    view: ViewState;
}

export const ServiceSection: React.FC<ServicioSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarPreview, setMostrarPreview] = useState(false);
    const [servicios, setServicios] = useState<ServicioRecibo[]>([]);
    const [detallesRecibo, setDetallesRecibo] = useState<DetalleReciboPreview[]>([]);

    const handleBuscarServicios = async (ci: string) => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<ServicioRecibo[]>(
                `${API_CONFIG.ENDPOINTS.ADM_SERVRECIBO}/${ci}`,
                { method: 'GET' }
            );
            setServicios(data);
            setMostrarPreview(false);
        } catch (error) {
            console.error('Error al buscar servicios:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleServiciosSelect = (serviciosSeleccionados: ServicioRecibo[]) => {
        const detalles: DetalleReciboPreview[] = serviciosSeleccionados.map(servicio => ({
            ServicioID: servicio.ServicioID,
            Detalle: servicio.TipoServicio,
            PrecioUnitario: calcularPrecioServicio(servicio.TipoServicio), // Usar precio base
            NombreCliente: servicio.NombreCliente
        }));
        
        setDetallesRecibo(detalles);
        setMostrarPreview(true);
    };

    const handleVolver = () => {
        setMostrarPreview(false);
        // Opcionalmente, podríamos mantener las selecciones previas
        // Si quieres resetear todo, añade: setDetallesRecibo([]);
    };

    const handleDetalleChange = (index: number, detalle: DetalleReciboPreview) => {
        const nuevosDetalles = [...detallesRecibo];
        nuevosDetalles[index] = detalle;
        setDetallesRecibo(nuevosDetalles);
    };

    switch (view) {
        case 'create-receipt':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Generar Recibo</h2>
                    {!mostrarPreview ? (
                        <ServicioReciboForm
                            isLoading={isLoading}
                            onSubmit={handleBuscarServicios}
                            servicios={servicios}
                            onServiciosSelect={handleServiciosSelect}
                        />
                    ) : (
                        <ReciboPreview
                            detalles={detallesRecibo}
                            onDetalleChange={handleDetalleChange}
                            onVolver={handleVolver}
                        />
                    )}
                </div>
            );
            
        default:
            return null;
    }
};
