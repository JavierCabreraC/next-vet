import { useState } from "react";
import { API_CONFIG, ApiService } from "@/services/index.services";
import { AnalisisResultado, CompletarInternacionModalProps, NuevaReceta, NuevoAnalisis } from "@/types/vetdoc";
import { Button, CustomCheckbox, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input } from "../ui/index.ui";


export const CompletarInternacionModal: React.FC<CompletarInternacionModalProps> = ({ 
    servicioId, 
    servicioEspecificoId,
    isOpen, 
    onClose,
    onSuccess 
}) => {
    const [formData, setFormData] = useState({
        internacion: {
            PesoSalida: '',
            TemperaturaSalida: '',
            Notas: ''
        },
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
    
            // 1. Marcar servicio como completado y actualizar datos de salida
            promises.push(
                ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_SERVINTER}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ 
                        ServicioID: servicioId,
                        InternacionID: servicioEspecificoId,
                        PesoSalida: parseFloat(formData.internacion.PesoSalida),
                        TemperaturaSalida: parseFloat(formData.internacion.TemperaturaSalida),
                        Notas: formData.internacion.Notas
                    })
                })
            );
    
            // 2. Si hay receta, agregarla
            if (formData.receta.requiereReceta) {
                const recetaData: NuevaReceta = {
                    Medicamento: formData.receta.Medicamento,
                    Dosis: formData.receta.Dosis,
                    Indicaciones: formData.receta.Indicaciones,
                    InternacionID: servicioEspecificoId,
                    ConsultaID: null
                };
    
                promises.push(
                    ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_RECETAINT}`, {
                        method: 'POST',
                        body: JSON.stringify(recetaData)
                    })
                );
            }
    
            // 3. Si hay análisis, agregarlo
            if (formData.analisis.requiereAnalisis) {
                const analisisData: NuevoAnalisis = {
                    TipoAnalisis: formData.analisis.TipoAnalisis,
                    FechaAnalisis: formData.analisis.FechaAnalisis,
                    Resultado: formData.analisis.Resultado,
                    ConsultaID: null,
                    InternacionID: servicioEspecificoId
                };
    
                promises.push(
                    ApiService.fetch(`${API_CONFIG.ENDPOINTS.DOC_ANALISISINT}`, {
                        method: 'POST',
                        body: JSON.stringify(analisisData)
                    })
                );
            }
    
            await Promise.all(promises);
            await onSuccess();
            onClose();
        } catch (error) {
            console.error('Error en handleSubmit:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Completar Internación</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Datos de Salida de Internación */}
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold">Datos de Salida</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Peso de Salida (kg)
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="999.99"
                                    value={formData.internacion.PesoSalida}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        internacion: {
                                            ...prev.internacion,
                                            PesoSalida: e.target.value
                                        }
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Temperatura de Salida (°C)
                                </label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="30"
                                    max="45"
                                    value={formData.internacion.TemperaturaSalida}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        internacion: {
                                            ...prev.internacion,
                                            TemperaturaSalida: e.target.value
                                        }
                                    }))}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Notas Finales
                            </label>
                            <textarea
                                className="w-full border rounded-md p-2 min-h-[100px]"
                                value={formData.internacion.Notas}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    internacion: {
                                        ...prev.internacion,
                                        Notas: e.target.value
                                    }
                                }))}
                                required
                            />
                        </div>
                    </div>

                    {/* Sección de Receta - igual que en CompletarServicioModal */}
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

                    {/* Sección de Análisis - igual que en CompletarServicioModal */}
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
                            Completar Internación
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
