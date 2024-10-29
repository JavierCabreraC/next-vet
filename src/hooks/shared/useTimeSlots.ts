import { useState } from 'react';
import type { ReservedTimeSlot } from '@/types/index.types';
import { API_CONFIG, ApiService, TIME_SLOTS } from '@/services/index.services';


interface UseTimeSlotsProps {
    onError?: (error: Error) => void;
}

export const useTimeSlots = ({ onError }: UseTimeSlotsProps = {}) => {
    const [availability, setAvailability] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(false);
  
    const fetchDayReservations = async (date: string): Promise<void> => {
        try {
            setLoading(true);
            console.log({date});
            
            // Obtener las reservaciones ocupadas
            const reservedSlots = await ApiService.fetch<ReservedTimeSlot[]>(`${API_CONFIG.ENDPOINTS.CLI_MASCOTAS}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
          
            // Inicializar todos los slots como disponibles
            const newAvailability = TIME_SLOTS.reduce((acc, slot) => {
                acc[slot.id] = true;
                return acc;
            }, {} as Record<number, boolean>);
          
            // Marcar como no disponibles los slots que coinciden con reservaciones pendientes
            reservedSlots.forEach(reserved => {
                if (reserved.Estado === 'Pendiente') {
                    // Extraer la hora de la fecha-hora (ejemplo: "2024-10-29 09:30:00" -> "09:30")
                    const reservedTime = new Date(reserved.Fecha_Hora)
                        .toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            hour12: false 
                        });
                      
                    // Encontrar el slot que coincide con la hora reservada
                    const matchingSlot = TIME_SLOTS.find(slot => slot.start === reservedTime);
                    if (matchingSlot) {
                        newAvailability[matchingSlot.id] = false;
                    }
                }
            });
          
            setAvailability(newAvailability);
        } catch (error) {
            onError?.(error as Error);
            // Inicializar todos como disponibles en caso de error
            const fallbackAvailability = TIME_SLOTS.reduce((acc, slot) => {
                acc[slot.id] = true;
                return acc;
            }, {} as Record<number, boolean>);
            setAvailability(fallbackAvailability);
        } finally {
            setLoading(false);
        }
    };
  
    const isSlotAvailable = (slotId: number): boolean => {
        return availability[slotId] ?? true;
    };
  
    // Función auxiliar para debug
    const getUnavailableSlots = (): string[] => {
        return TIME_SLOTS
            .filter(slot => !availability[slot.id])
            .map(slot => `${slot.start}-${slot.end}`);
    };
  
    return {
        availability,
        loading,
        fetchDayReservations,
        isSlotAvailable,
        getUnavailableSlots // útil para debugging
    };
};
