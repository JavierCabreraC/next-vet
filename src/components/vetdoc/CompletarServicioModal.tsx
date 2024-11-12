import React, { useState } from 'react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Button, CustomCheckbox, Input } from '@/components/ui/index.ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import type { CompletarServicioModalProps, NuevaReceta, NuevoAnalisis, AnalisisResultado } from '@/types/vetdoc';


export const CompletarServicioModal: React.FC<CompletarServicioModalProps> = ({ 
    servicioId,
    servicioEspecificoId, 
    isOpen, 
    onClose,
    onSuccess 
}) => {
    const [formData, setFormData] = useState({
        receta: {
            requiereReceta: false,
            Medicamento: '',
            Dosis: '',
            Indicaciones: ''
        },
        analisis: {
            requiereAnalisis: false,
            TipoAnalisis: '',
            FechaAnalisis: new Date().toISOString().split('T')[0],
            Resultado: 'Normal' as AnalisisResultado
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const promises = [];
    
            // 1. Marcar servicio como completado
            promises.push(
                ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_SERVEND}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ ServicioID: servicioId, ConsultaID: servicioEspecificoId })
                })
            );
    
            // 2. Si hay receta, agregarla a las promesas
            if (formData.receta.requiereReceta) {
                const recetaData: NuevaReceta = {
                    Medicamento: formData.receta.Medicamento,
                    Dosis: formData.receta.Dosis,
                    Indicaciones: formData.receta.Indicaciones,
                    ConsultaID: servicioEspecificoId,
                    InternacionID: null
                };
    
                promises.push(
                    ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_RECETACONS}`, {
                        method: 'POST',
                        body: JSON.stringify(recetaData)
                    })
                );
            }
    
            // 3. Si hay análisis, agregarlo a las promesas
            if (formData.analisis.requiereAnalisis) {
                const analisisData: NuevoAnalisis = {
                    TipoAnalisis: formData.analisis.TipoAnalisis,
                    FechaAnalisis: formData.analisis.FechaAnalisis,
                    Resultado: formData.analisis.Resultado,
                    ConsultaID: servicioEspecificoId,
                    InternacionID: null
                };
    
                promises.push(
                    ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_ANALISISCONS}`, {
                        method: 'POST',
                        body: JSON.stringify(analisisData)
                    })
                );
            }
    
            // Esperar a que todas las operaciones se completen
            await Promise.all(promises);
            // Solo después de que todo esté completo, cerrar el modal y actualizar
            await onSuccess();
            onClose();
        } catch (error) {
            console.error('Error en handleSubmit:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Completar Servicio</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Sección de Receta */}
                    <div className="space-y-2">
                        <CustomCheckbox
                            id="requiereReceta"
                            checked={formData.receta.requiereReceta}
                            onCheckedChange={(checked) => 
                                setFormData(prev => ({
                                    ...prev,
                                    receta: {
                                        ...prev.receta,
                                        requiereReceta: checked
                                    }
                                }))
                            }
                            label="Requiere Receta"
                        />

                        {formData.receta.requiereReceta && (
                            <div className="space-y-2 pl-6">
                                <Input
                                    placeholder="Medicamento"
                                    value={formData.receta.Medicamento}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        receta: {
                                            ...prev.receta,
                                            Medicamento: e.target.value
                                        }
                                    }))}
                                    required
                                />
                                <Input
                                    placeholder="Dosis"
                                    value={formData.receta.Dosis}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        receta: {
                                            ...prev.receta,
                                            Dosis: e.target.value
                                        }
                                    }))}
                                    required
                                />
                                <textarea
                                    placeholder="Indicaciones"
                                    className="w-full border rounded-md p-2"
                                    value={formData.receta.Indicaciones}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        receta: {
                                            ...prev.receta,
                                            Indicaciones: e.target.value
                                        }
                                    }))}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    {/* Sección de Análisis */}
                    <div className="space-y-2">
                        <CustomCheckbox
                            id="requiereAnalisis"
                            checked={formData.analisis.requiereAnalisis}
                            onCheckedChange={(checked) => 
                                setFormData(prev => ({
                                    ...prev,
                                    analisis: {
                                        ...prev.analisis,
                                        requiereAnalisis: checked
                                    }
                                }))
                            }
                            label="Requiere Análisis"
                        />

                        {formData.analisis.requiereAnalisis && (
                            <div className="space-y-2 pl-6">
                                <Input
                                    placeholder="Tipo de Análisis"
                                    value={formData.analisis.TipoAnalisis}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        analisis: {
                                            ...prev.analisis,
                                            TipoAnalisis: e.target.value
                                        }
                                    }))}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Fecha del Análisis
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.analisis.FechaAnalisis}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            analisis: {
                                                ...prev.analisis,
                                                FechaAnalisis: e.target.value
                                            }
                                        }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Resultado
                                    </label>
                                    <select
                                        className="w-full border rounded-md p-2"
                                        value={formData.analisis.Resultado}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            analisis: {
                                                ...prev.analisis,
                                                Resultado: e.target.value as AnalisisResultado
                                            }
                                        }))}
                                        required
                                    >
                                        <option value="Normal">Normal</option>
                                        <option value="Bajo">Bajo</option>
                                        <option value="Elevado">Elevado</option>
                                        <option value="Bueno">Bueno</option>
                                        <option value="Estable">Estable</option>
                                        <option value="Critico">Crítico</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Completar Servicio
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
