import { useEffect, useState } from 'react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { MascotasList, ReservationForm, ReservationsList, ServiciosHistorialList } from '../index.clientcomp';
import { CancelReservationRequest, MascotaCli, PendingReservation, ServicioHistorial, ViewStateCliente } from '@/types/client';


interface ClientSectionProps {
    view: ViewStateCliente;
}

export const ClientSection: React.FC<ClientSectionProps> = ({ view }) => {
    const [mascotas, setMascotas] = useState<MascotaCli[]>([]);
    const [reservations, setReservations] = useState<PendingReservation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [servicios, setServicios] = useState<ServicioHistorial[]>([]);
    const [isLoadingServicios, setIsLoadingServicios] = useState(false);
            
    useEffect(() => {
        const loadServicios = async () => {
            try {
                setIsLoadingServicios(true);
                const data = await ApiService.fetch<ServicioHistorial[]>(
                    `${API_CONFIG.ENDPOINTS.CLI_HISSERVICIOS}`,
                    { method: 'GET' }
                );
                setServicios(data);
            } catch (error) {
                console.error('Error al cargar el historial de servicios:', error);
            } finally {
                setIsLoadingServicios(false);
            }
        };

        loadServicios();
    }, []);

    useEffect(() => {
        if (view === 'list-mascotas') {
            loadMascotas();
        } else if (view === 'list-reservaciones') {
            loadReservations();
        }
    }, [view]);

    const loadMascotas = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<MascotaCli[]>(`${API_CONFIG.ENDPOINTS.CLI_MASCOTAS}`, {
                method: 'GET',
            });
            setMascotas(data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadReservations = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<PendingReservation[]>(
                `${API_CONFIG.ENDPOINTS.CLI_RESERVACLI}`,
                { method: 'GET' }
            );
            setReservations(data);
        } catch (error) {
            console.error('Error al cargar reservaciones:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReservationSuccess = () => {
        loadReservations();
        // Implementar notificación de éxito
    };

    const handleCancelReservation = async (reservationId: number): Promise<void> => {
        try {
            const cancelRequest: CancelReservationRequest = {
                ReservacionID: reservationId
            };

            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.CLI_RESERVA}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cancelRequest)
            });

            await loadReservations();
        } catch (error) {
            console.error('Error al cancelar la reservación:', error);
            throw error;
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Cargando...</div>;
    }

    switch (view) {
        case 'list-mascotas':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Mis Mascotas</h2>
                    <MascotasList mascotas={mascotas} />
                </div>
            );
        case 'create-reservacion':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Agendar Nueva Cita</h2>
                    <ReservationForm
                        onSuccess={handleReservationSuccess}
                        onCancel={() => {}} // No necesitamos esta funcionalidad en el nuevo diseño
                    />
                </div>
            );
        case 'list-reservaciones':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Mis Reservaciones Pendientes</h2>
                    <ReservationsList 
                        reservations={reservations}
                        onCancelReservation={handleCancelReservation}
                    />
                </div>
            );
        case 'history-reservaciones':
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Historial de Reservaciones</h2>
                    <p>Funcionalidad en desarrollo</p>
                </div>
            );
            case 'history-servicios':
                if (isLoadingServicios) {
                    return <div className="flex justify-center items-center h-full">Cargando...</div>;
                }
            
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Historial de Servicios</h2>
                        <ServiciosHistorialList servicios={servicios} />
                    </div>
                );
        default:
            return null;
    }
};
