import { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { VacunacionFormProps } from '@/types/index.types';
import { API_CONFIG, ApiService } from '@/services/index.services';


export const VacunaForm: React.FC<VacunacionFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        NombreVacuna: '',
        Descripcion: '',
        Laboratorio: '',
        EdadMinima: '',
        Tipo: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_VACUNAS}`, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    EdadMinima: parseInt(formData.EdadMinima)
                })
            });
            onSuccess();
        } catch (error) {
            console.error('Error al registrar vacuna:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre de la Vacuna</label>
                    <Input
                        value={formData.NombreVacuna}
                        onChange={(e) => setFormData({...formData, NombreVacuna: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <Input
                        value={formData.Descripcion}
                        onChange={(e) => setFormData({...formData, Descripcion: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Laboratorio</label>
                    <Input
                        value={formData.Laboratorio}
                        onChange={(e) => setFormData({...formData, Laboratorio: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Edad Mínima (meses)</label>
                    <Input
                        type="number"
                        value={formData.EdadMinima}
                        onChange={(e) => setFormData({...formData, EdadMinima: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                        className="w-full border rounded-md p-2"
                        value={formData.Tipo}
                        onChange={(e) => setFormData({...formData, Tipo: e.target.value})}
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Canina">Canina</option>
                        <option value="Felina">Felina</option>
                        <option value="Felina">General</option>
                    </select>
                </div>

                <Button type="submit" className="w-full">
                    Registrar Vacuna
                </Button>
            </form>
        </div>
    );
};
