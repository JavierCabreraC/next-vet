import React from 'react';
import { Button, Input } from '@/components/ui/index.ui';
import type { DetalleReciboPreview, TipoServicio } from '@/types/admin';
import { calcularPrecioServicio, VariacionComplejidad, VariacionTamaño } from '@/utils/index.utils';


interface ReciboPreviewProps {
    detalles: DetalleReciboPreview[];
    onDetalleChange: (index: number, detalle: DetalleReciboPreview) => void;
    onVolver: () => void;
}

export const ReciboPreview: React.FC<ReciboPreviewProps> = ({
    detalles,
    onDetalleChange,
    onVolver
}) => {
    const total = detalles.reduce((sum, detalle) => sum + detalle.PrecioUnitario, 0);

    const handleVariacionChange = (
        index: number, 
        detalle: DetalleReciboPreview, 
        tipo: 'tamaño' | 'complejidad',
        valor: VariacionTamaño | VariacionComplejidad
    ) => {
        const nuevoPrecio = calcularPrecioServicio(
            detalle.Detalle as TipoServicio,
            tipo === 'tamaño' ? { tamaño: valor as VariacionTamaño } : { complejidad: valor as VariacionComplejidad }
        );
        
        onDetalleChange(index, {
            ...detalle,
            PrecioUnitario: nuevoPrecio
        });
    };

    const renderVariaciones = (detalle: DetalleReciboPreview, index: number) => {
        if (detalle.Detalle === 'Peluqueria') {
            return (
                <select
                    className="ml-2 text-sm border rounded"
                    onChange={(e) => handleVariacionChange(
                        index, 
                        detalle, 
                        'tamaño', 
                        e.target.value as VariacionTamaño
                    )}
                >
                    <option value="tamañoPequeño">Pequeño</option>
                    <option value="tamañoMediano">Mediano</option>
                    <option value="tamañoGrande">Grande</option>
                </select>
            );
        }

        if (detalle.Detalle === 'Cirugia') {
            return (
                <select
                    className="ml-2 text-sm border rounded"
                    onChange={(e) => handleVariacionChange(
                        index, 
                        detalle, 
                        'complejidad', 
                        e.target.value as VariacionComplejidad
                    )}
                >
                    <option value="complejidadBaja">Complejidad Baja</option>
                    <option value="complejidadMedia">Complejidad Media</option>
                    <option value="complejidadAlta">Complejidad Alta</option>
                </select>
            );
        }

        return null;
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Vista Previa del Recibo</h3>
            <Button
                    onClick={onVolver}
                    variant="outline"
                    className="text-sm"
                >
                    ← Volver
                </Button>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left">Servicio ID</th>
                            <th className="px-4 py-2 text-left">Detalle</th>
                            <th className="px-4 py-2 text-left">Variación</th>
                            <th className="px-4 py-2 text-left">Precio</th>
                            <th className="px-4 py-2 text-left">Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map((detalle, index) => (
                            <tr key={detalle.ServicioID} className="border-t">
                                <td className="px-4 py-2">{detalle.ServicioID}</td>
                                <td className="px-4 py-2">{detalle.Detalle}</td>
                                <td className="px-4 py-2">
                                    {renderVariaciones(detalle, index)}
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        type="number"
                                        value={detalle.PrecioUnitario}
                                        onChange={(e) => onDetalleChange(index, {
                                            ...detalle,
                                            PrecioUnitario: parseFloat(e.target.value) || 0
                                        })}
                                        className="w-32"
                                        min="0"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-2">{detalle.NombreCliente}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t font-medium">
                            <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
                            <td className="px-4 py-2">Bs. {total.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
