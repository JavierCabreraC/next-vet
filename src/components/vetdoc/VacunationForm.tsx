import { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { Vacuna, NuevaVacunacion } from '@/types/index.types';


interface VacunacionFormProps {
    vacunas: Vacuna[];
    onSuccess: () => void;
}

export const VacunacionForm: React.FC<VacunacionFormProps> = ({ vacunas, onSuccess }) => {
    const [formData, setFormData] = useState<NuevaVacunacion>({
        FechaVacunacion: new Date().toISOString().split('T')[0],
        ProximaFecha: '',
        VacunaID: 0,
        MascotaID: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_REGVAC}`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            onSuccess();
        } catch (error) {
            console.error('Error al registrar vacunación:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">ID de Mascota</label>
                    <Input
                        type="number"
                        value={formData.MascotaID || ''}
                        onChange={(e) => setFormData({...formData, MascotaID: Number(e.target.value)})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Vacuna</label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.VacunaID || ''}
                        onChange={(e) => setFormData({...formData, VacunaID: Number(e.target.value)})}
                        required
                    >
                        <option value="">Seleccione una vacuna</option>
                        {vacunas.map(vacuna => (
                            <option key={vacuna.ID} value={vacuna.ID}>
                                {vacuna.Vacuna} - {vacuna.Tipo}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Fecha de Vacunación</label>
                    <Input
                        type="date"
                        value={formData.FechaVacunacion}
                        onChange={(e) => setFormData({...formData, FechaVacunacion: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Próxima Fecha</label>
                    <Input
                        type="date"
                        value={formData.ProximaFecha}
                        onChange={(e) => setFormData({...formData, ProximaFecha: e.target.value})}
                        required
                    />
                </div>

                <Button type="submit" className="w-full">
                    Registrar Vacunación
                </Button>
            </form>
        </div>
    );
};
