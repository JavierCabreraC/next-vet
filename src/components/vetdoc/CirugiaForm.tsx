import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMascotas } from '@/hooks/index.hooks';
import { CirugiaFormProps, NuevaCirugia } from '@/types/vetdoc';
import { API_CONFIG, ApiService } from '@/services/index.services';


export const CirugiaForm: React.FC<CirugiaFormProps> = ({
    reservacion,
    onSuccess,
    onCancel
}) => {
    const { mascotas, isLoading, error } = useMascotas(reservacion.ClienteID);
    const [formData, setFormData] = useState<NuevaCirugia>({
        Peso: 0,
        Temperatura: 0,
        TipoDeCirugia: '',
        Notas: '',
        ReservacionID: reservacion.ReservacionID,
        MascotaID: 0
    });

    if (isLoading) {
        return <div className="text-center py-8">Cargando información...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error al cargar las mascotas</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiService.fetch(
                `${API_CONFIG.ENDPOINTS.DOC_SERVCIRU}`,
                {
                    method: 'POST',
                    body: JSON.stringify(formData)
                }
            );
            if (response) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al registrar cirugía:', error);
        }
    };

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
                        value={formData.MascotaID || ''}
                        onChange={(e) => setFormData({
                            ...formData,
                            MascotaID: parseInt(e.target.value)
                        })}
                        required
                    >
                        <option value="">Seleccione una mascota</option>
                        {mascotas.map((mascota) => (
                            <option 
                                key={mascota.MascotaID} 
                                value={mascota.MascotaID}
                            >
                                {mascota.Nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Peso (kg)</label>
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="999.99"
                        value={formData.Peso || ''}
                        onChange={(e) => setFormData({
                            ...formData,
                            Peso: parseFloat(e.target.value)
                        })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Temperatura (°C)</label>
                    <Input
                        type="number"
                        step="0.1"
                        min="30"
                        max="45"
                        value={formData.Temperatura || ''}
                        onChange={(e) => setFormData({
                            ...formData,
                            Temperatura: parseFloat(e.target.value)
                        })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Cirugía</label>
                    <Input
                        type="text"
                        value={formData.TipoDeCirugia}
                        onChange={(e) => setFormData({
                            ...formData,
                            TipoDeCirugia: e.target.value
                        })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Notas</label>
                    <textarea
                        className="w-full border rounded-md p-2 min-h-[100px]"
                        value={formData.Notas}
                        onChange={(e) => setFormData({
                            ...formData,
                            Notas: e.target.value
                        })}
                        required
                    />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Registrar Cirugía
                    </Button>
                </div>
            </form>
        </div>
    );
};