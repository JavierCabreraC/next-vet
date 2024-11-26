import React from 'react';
import { Input } from '@/components/ui/input';
import type { DetalleReciboPreview } from '@/types/admin';


interface ReciboPreviewProps {
    detalles: DetalleReciboPreview[];
    onDetalleChange: (index: number, detalle: DetalleReciboPreview) => void;
}

export const ReciboPreview: React.FC<ReciboPreviewProps> = ({
    detalles,
    onDetalleChange
}) => {
    const total = detalles.reduce((sum, detalle) => sum + detalle.PrecioUnitario, 0);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Vista Previa del Recibo</h3>
            
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left">Servicio ID</th>
                            <th className="px-4 py-2 text-left">Detalle</th>
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
                            <td colSpan={2} className="px-4 py-2 text-right">Total:</td>
                            <td className="px-4 py-2">Bs. {total.toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
