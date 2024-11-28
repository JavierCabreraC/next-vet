import React, { useState } from 'react';
import { calcularPrecioServicio } from '@/utils/index.utils';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { ViewState, ServicioRecibo, DetalleReciboPreview } from '@/types/admin';
import { PaymentModal, ReciboPreview, ServicioReciboForm } from '@/components/admin/index.admincomp';


interface ServicioSectionProps {
    view: ViewState;
}

export const ServiceSection: React.FC<ServicioSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarPreview, setMostrarPreview] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [servicios, setServicios] = useState<ServicioRecibo[]>([]);
    const [detallesRecibo, setDetallesRecibo] = useState<DetalleReciboPreview[]>([]);
    const [currentReciboId, setCurrentReciboId] = useState<number | undefined>(undefined);

    const resetearTodo = () => {
        setServicios([]);
        setDetallesRecibo([]);
        setMostrarPreview(false);
    };

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
        console.log({setCurrentReciboId});
        setMostrarPreview(false);
        // Opcionalmente, se podría mantener las selecciones previas
        // Para resetear todo, añadir: setDetallesRecibo([]);
    };

    const handleDetalleChange = (index: number, detalle: DetalleReciboPreview) => {
        const nuevosDetalles = [...detallesRecibo];
        nuevosDetalles[index] = detalle;
        setDetallesRecibo(nuevosDetalles);
    };

    const handleReciboCreado = (reciboId: number) => {
        setCurrentReciboId(reciboId);
    };

    const handlePagar = (reciboId: number) => {
        console.log({reciboId});
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        setShowPaymentModal(false);
        resetearTodo();
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
                        <>
                            <ReciboPreview
                                detalles={detallesRecibo}
                                onDetalleChange={handleDetalleChange}
                                onVolver={handleVolver}
                                onReciboCreado={handleReciboCreado}
                                onPagar={handlePagar}
                                reciboId={currentReciboId}
                            />
                            {showPaymentModal && currentReciboId && (
                                <PaymentModal
                                    reciboId={Number(currentReciboId)}
                                    amount={detallesRecibo.reduce((sum, d) => sum + Number(d.PrecioUnitario), 0)}
                                    onClose={() => setShowPaymentModal(false)}
                                    onSuccess={handlePaymentSuccess}
                                />
                            )}
                        </>
                    )}
                </div>
            );
            
        default:
            return null;
    }
};
