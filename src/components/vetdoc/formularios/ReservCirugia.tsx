import React, { useState } from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import { ApiService, API_CONFIG } from '@/services/index.services';


interface AgendarCirugiaFormProps {
    onSuccess: () => void;
}

export const AgendarCirugiaForm: React.FC<AgendarCirugiaFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        CI: '',
        fecha: '',
        hora: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const fechaHora = `${formData.fecha} ${formData.hora}:00`;
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_RESERVACIRUGIA}`, {
                method: 'POST',
                body: JSON.stringify({
                    CI: parseInt(formData.CI),
                    FechaHoraReservada: fechaHora
                })
            });
            onSuccess();
        } catch (error) {
            console.error('Error al agendar cirugía:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">CI del Cliente</label>
                    <Input
                        type="number"
                        value={formData.CI}
                        onChange={(e) => setFormData({...formData, CI: e.target.value})}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha</label>
                    <Input
                        type="date"
                        value={formData.fecha}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Hora</label>
                    <Input
                        type="time"
                        value={formData.hora}
                        onChange={(e) => setFormData({...formData, hora: e.target.value})}
                        required
                    />
                </div>

                <Button type="submit" className="w-full">
                    Agendar Cirugía
                </Button>
            </form>
        </div>
    );
};
