import { Receta } from "@/types/vetdoc";
import { useEffect, useState } from "react";
import { Column, DataTable } from "../common/DataTable";
import { API_CONFIG, ApiService } from "@/services/index.services";


export const RecetasView: React.FC = () => {
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarRecetas = async () => {
            try {
                const data = await ApiService.fetch<Receta[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_RECETA}`,
                    { method: 'GET' }
                );
                setRecetas(data);
            } catch (error) {
                console.error('Error al cargar recetas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarRecetas();
    }, []);

    const columns: Column<Receta>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Fecha', header: 'Fecha' },
        { key: 'Mascota', header: 'Mascota' },
        { key: 'Raza', header: 'Raza' },
        { key: 'Medicamento', header: 'Medicamento' },
        { key: 'Dosis', header: 'Dosis' },
        { key: 'Indicaciones', header: 'Indicaciones' },
    ];

    const renderMobileCard = (receta: Receta) => (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{receta.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{receta.Fecha}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{receta.Mascota} ({receta.Raza})</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Medicamento: </span>
                <span>{receta.Medicamento}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dosis: </span>
                <span>{receta.Dosis}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Indicaciones: </span>
                <span>{receta.Indicaciones}</span>
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="text-center py-8">Cargando recetas...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recetas Emitidas</h2>
            <DataTable<Receta>
                data={recetas}
                columns={columns}
                renderMobileCard={renderMobileCard}
            />
        </div>
    );
};
