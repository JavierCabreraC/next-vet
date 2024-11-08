// src/components/vetdoc/ReservacionesPendientes.tsx
import React, { useState, useEffect } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { ApiService, API_CONFIG } from '@/services/index.services';
import { User, Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import type { ReservacionV, ReservacionesPendientesProps } from '@/types/vetdoc';


export const ReservacionesPendientes: React.FC<ReservacionesPendientesProps> = ({ 
    onReservacionSelect 
}) => {
    const [reservaciones, setReservaciones] = useState<ReservacionV[]>([]);
    const [filtro, setFiltro] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarReservaciones = async () => {
            try {
                const data = await ApiService.fetch<ReservacionV[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_RESERVPEN}`,
                    { method: 'GET' }
                );
                setReservaciones(data);
            } catch (error) {
                console.error('Error al cargar reservaciones:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarReservaciones();
    }, []);

    const handleReservacionSelect = (reservacion: ReservacionV) => {
        console.log('Reservación seleccionada:', reservacion);
        console.log('ClienteID:', reservacion.ClienteID);
        onReservacionSelect(reservacion);
    };

    const reservacionesFiltradas = reservaciones.filter(res => 
        res.Cliente.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        className="pl-10"
                        placeholder="Buscar por cliente..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {reservacionesFiltradas.map((reservacion) => (
                    <div
                        key={reservacion.ReservacionID}
                        className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-blue-500" />
                                    <span className="font-medium">{reservacion.Cliente}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar size={16} />
                                    {new Date(reservacion.Hora).toLocaleDateString()}
                                    <Clock size={16} className="ml-2" />
                                    {new Date(reservacion.Hora).toLocaleTimeString()}
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium">Estado:</span> {reservacion.Estado}
                                </div>
                            </div>
                            <Button 
                                onClick={() => handleReservacionSelect(reservacion)}
                                className="flex items-center"
                            >
                                Atender
                                <ChevronRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                ))}

                {reservacionesFiltradas.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        No hay reservaciones pendientes
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-8 text-gray-500">
                        Cargando reservaciones...
                    </div>
                )}
            </div>
        </div>
    );
};
