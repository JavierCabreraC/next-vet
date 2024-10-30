import { useState, useEffect } from 'react';
import type { ReservedTimeSlot } from '@/types/index.types';
import { API_CONFIG, ApiService, TIME_SLOTS } from '@/services/index.services';


interface UseTimeSlotsProps {
    selectedDate: string;
    onError?: (error: Error) => void;
}

export const useTimeSlots = ({ selectedDate, onError }: UseTimeSlotsProps) => {
    const [availability, setAvailability] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(false);

    const fetchDayReservations = async () => {
        try {
            setLoading(true);
            
            // Obtener las reservaciones ocupadas
            const reservedSlots = await ApiService.fetch<ReservedTimeSlot[]>(
                `${API_CONFIG.ENDPOINTS.CLI_RESERVA}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Inicializar todos los slots como disponibles
            const newAvailability = TIME_SLOTS.reduce((acc, slot) => {
                acc[slot.id] = true;
                return acc;
            }, {} as Record<number, boolean>);

            // Marcar como no disponibles los slots que coinciden
            reservedSlots.forEach(reserved => {
                if (reserved.Estado === 'Pendiente') {
                    const reservedTime = new Date(reserved.Fecha_Hora)
                        .toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: false 
                        });

                    const matchingSlot = TIME_SLOTS.find(slot => 
                        slot.start === reservedTime
                    );

                    if (matchingSlot) {
                        newAvailability[matchingSlot.id] = false;
                    }
                }
            });

            setAvailability(newAvailability);
        } catch (error) {
            onError?.(error instanceof Error ? error : new Error('Error desconocido'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedDate) return;

        // Fetch inicial
        fetchDayReservations();

        // Configurar polling cada 30 segundos
        const interval = setInterval(fetchDayReservations, 30000);

        // Limpiar intervalo al desmontar
        return () => clearInterval(interval);
    }, [selectedDate]);

    return {
        availability,
        loading,
        isSlotAvailable: (slotId: number) => availability[slotId] ?? true
    };
};