import React, { useState, useEffect } from 'react';
import type { ServicioCompletado } from '@/types/vetdoc';
import { ApiService, API_CONFIG } from '@/services/index.services';
import { Clock, PawPrint, Activity, CheckCircle2 } from 'lucide-react';


export const ServiciosCompletados: React.FC = () => {
    const [servicios, setServicios] = useState<ServicioCompletado[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const data = await ApiService.fetch<ServicioCompletado[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_SERVCOM}`,
                    { method: 'GET' }
                );
                setServicios(data);
            } catch (error) {
                console.error('Error al cargar servicios completados:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarServicios();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Cargando servicios completados...
            </div>
        );
    }

    if (servicios.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No hay servicios completados
            </div>
        );
    }

    // Helper para obtener el ícono según el tipo de servicio
    const getServiceIcon = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'peluqueria':
                return <Activity className="text-purple-500" size={20} />;
            default:
                return <Activity className="text-blue-500" size={20} />;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicios.map((servicio) => (
                <div
                    key={servicio.ServicioID}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PawPrint className="text-blue-500" size={20} />
                                <span className="font-medium">
                                    {servicio["Nombre de Mascota"]}
                                </span>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {servicio.Estado}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            {getServiceIcon(servicio.Servicio)}
                            <span className="font-medium">{servicio.Servicio}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={16} />
                            <span>
                                Completado: {new Date(servicio["Hora de finalización"]).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle2 size={16} />
                            <span>Servicio Finalizado</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
