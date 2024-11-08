// src/components/vetdoc/ServiciosActivos.tsx
import React, { useState, useEffect } from 'react';
import { Clock, PawPrint} from 'lucide-react';
import { ApiService, API_CONFIG } from '@/services/index.services';
import type { ServicioActivo } from '@/types/vetdoc';


export const ServiciosActivos: React.FC = () => {
    const [servicios, setServicios] = useState<ServicioActivo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const data = await ApiService.fetch<ServicioActivo[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_SERVACT}`,
                    { method: 'GET' }
                );
                setServicios(data);
            } catch (error) {
                console.error('Error al cargar servicios activos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarServicios();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Cargando servicios activos...
            </div>
        );
    }

    if (servicios.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No hay servicios activos en este momento
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicios.map((servicio) => (
                <div
                    key={servicio.ServicioID}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <PawPrint className="text-blue-500" size={20} />
                                <span className="font-medium">
                                    {servicio["Nombre de Mascota"]}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} />
                                <span>
                                    {new Date(servicio["Hora de inicio"]).toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {servicio.Estado}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
