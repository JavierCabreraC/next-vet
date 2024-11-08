import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ApiService, API_CONFIG } from '@/services/index.services';
import type { MascotaV, NuevaPeluqueria, PeluqueriaFormProps } from '@/types/index.types';


export const PeluqueriaForm: React.FC<PeluqueriaFormProps> = ({ 
    reservacion, 
    onSuccess, 
    onCancel 
}) => {
    const [mascotas, setMascotas] = useState<MascotaV[]>([]);
    const [formData, setFormData] = useState<NuevaPeluqueria>({
        TipoCorte: '',
        Lavado: false,
        ReservacionID: reservacion.ReservacionID,
        MascotaID: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarMascotas = async () => {
            try {
                const data = await ApiService.fetch<MascotaV[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_MASCOTAS}/${reservacion.ClienteID}`,
                    { method: 'GET' }
                );
                console.log('Mascotas cargadas:', data);
                setMascotas(data);
            } catch (error) {
                console.error('Error al cargar mascotas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (reservacion.ClienteID) {
            cargarMascotas();
        }
    }, [reservacion.ClienteID]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiService.fetch(
                `${API_CONFIG.ENDPOINTS.DOC_SERVPELU}`,
                {
                    method: 'POST',
                    body: JSON.stringify(formData)
                }
            );
            if (response) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al registrar peluquería:', error);
        }
    };

    if (isLoading) {
        return <div className="text-center py-8">Cargando información...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Información de la Reserva</h3>
                <p><span className="font-medium">Cliente:</span> {reservacion.Cliente}</p>
                <p><span className="font-medium">Fecha y Hora:</span> {new Date(reservacion.Hora).toLocaleString()}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Mascota</label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.MascotaID || ''} // manejar el caso cuando es 0
                        onChange={(e) => setFormData({
                            ...formData, 
                            MascotaID: parseInt(e.target.value)
                        })}
                        required
                    >
                        <option value="">Seleccione una mascota</option>
                        {mascotas && mascotas.length > 0 && mascotas.map((mascota) => (
                            <option 
                                key={mascota.MascotaID.toString()} 
                                value={mascota.MascotaID.toString()}
                            >
                                {mascota.Nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Corte</label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.TipoCorte}
                        onChange={(e) => setFormData({...formData, TipoCorte: e.target.value})}
                        required
                    >
                        <option value="">Seleccione un tipo de corte</option>
                        <option value="bajo">Bajo</option>
                        <option value="medio">Medio</option>
                        <option value="alto">Alto</option>
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="lavado"
                        checked={formData.Lavado}
                        onChange={(e) => setFormData({...formData, Lavado: e.target.checked})}
                        className="rounded border-gray-300"
                    />
                    <label htmlFor="lavado" className="text-sm font-medium">
                        Incluir Lavado
                    </label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Registrar Peluquería
                    </Button>
                </div>
            </form>
        </div>
    );
};
