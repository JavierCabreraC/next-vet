import { Analisis } from "@/types/vetdoc";
import { useEffect, useState } from "react";
import { Column, DataTable } from "../common/DataTable";
import { API_CONFIG, ApiService } from "@/services/index.services";


export const AnalisisView: React.FC = () => {
    const [analisis, setAnalisis] = useState<Analisis[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cargarAnalisis = async () => {
            try {
                const data = await ApiService.fetch<Analisis[]>(
                    `${API_CONFIG.ENDPOINTS.DOC_ANALISIS}`,
                    { method: 'GET' }
                );
                setAnalisis(data);
            } catch (error) {
                console.error('Error al cargar análisis:', error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarAnalisis();
    }, []);

    const columns: Column<Analisis>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Fecha', header: 'Fecha' },
        { key: 'Mascota', header: 'Mascota' },
        { key: 'Raza', header: 'Raza' },
        { key: 'TipoAnalisis', header: 'Tipo de Análisis' },
        { 
            key: 'Resultado', 
            header: 'Resultado',
            render: (analisis: Analisis) => (
                <span className={`px-2 py-1 rounded-full text-sm ${
                    analisis.Resultado === 'Critico' ? 'bg-red-100 text-red-800' :
                    analisis.Resultado === 'Bajo' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {analisis.Resultado}
                </span>
            )
        }
    ];

    const renderMobileCard = (analisis: Analisis) => (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{analisis.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha: </span>
                <span>{analisis.Fecha}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Mascota: </span>
                <span>{analisis.Mascota} ({analisis.Raza})</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Tipo: </span>
                <span>{analisis.TipoAnalisis}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Resultado: </span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                    analisis.Resultado === 'Critico' ? 'bg-red-100 text-red-800' :
                    analisis.Resultado === 'Bajo' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {analisis.Resultado}
                </span>
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="text-center py-8">Cargando análisis...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Análisis Realizados</h2>
            <DataTable<Analisis>
                data={analisis}
                columns={columns}
                renderMobileCard={renderMobileCard}
            />
        </div>
    );
};
