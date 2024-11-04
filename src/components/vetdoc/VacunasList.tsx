import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Vacuna } from '@/types/index.types';


interface VacunasListProps {
    vacunas: Vacuna[];
    itemsPerPage?: number;
}

export const VacunasList: React.FC<VacunasListProps> = ({ 
    vacunas,
    itemsPerPage = 5 // valor por defecto
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Cálculos para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vacunas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(vacunas.length / itemsPerPage);

    const renderPagination = () => {
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);
        
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        return (
            <div className="flex flex-wrap justify-center mt-4 gap-1">
                {/* Botón Primera Página */}
                {startPage > 1 && (
                    <Button
                        onClick={() => setCurrentPage(1)}
                        variant="outline"
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        1
                    </Button>
                )}
                {startPage > 2 && <span className="mx-1 self-center">...</span>}

                {/* Botones numerados */}
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {page}
                    </Button>
                ))}

                {/* Botón Última Página */}
                {endPage < totalPages - 1 && <span className="mx-1 self-center">...</span>}
                {endPage < totalPages && (
                    <Button
                        onClick={() => setCurrentPage(totalPages)}
                        variant="outline"
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {totalPages}
                    </Button>
                )}
            </div>
        );
    };

    const renderMobileCard = (vacuna: Vacuna) => (
        <div key={vacuna.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Nombre: </span>
                <span className="text-gray-600">{vacuna.Vacuna}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Descripción: </span>
                <span className="text-gray-600">{vacuna.Descripcion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Laboratorio: </span>
                <span className="text-gray-600">{vacuna.Laboratorio}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Tipo: </span>
                <span className="text-gray-600">{vacuna.Tipo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Edad Mínima: </span>
                <span className="text-gray-600">{vacuna.EdadMinima} meses</span>
            </div>
        </div>
    );

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Nombre</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Descripción</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Laboratorio</th>
                        <th className="p-3 bg-gray-100 text-center font-semibold">Tipo</th>
                        <th className="p-3 bg-gray-100 text-center font-semibold">Edad Mínima</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((vacuna) => (
                        <tr key={vacuna.ID} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{vacuna.Vacuna}</td>
                            <td className="p-3 border-b">{vacuna.Descripcion}</td>
                            <td className="p-3 border-b">{vacuna.Laboratorio}</td>
                            <td className="p-3 border-b text-center">{vacuna.Tipo}</td>
                            <td className="p-3 border-b text-center">{vacuna.EdadMinima} meses</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {/* Vista móvil */}
            <div className="md:hidden">
                {currentItems.map(vacuna => renderMobileCard(vacuna))}
                {totalPages > 1 && renderPagination()}
            </div>

            {/* Vista desktop */}
            <div className="hidden md:block">
                {renderDesktopTable()}
                {totalPages > 1 && renderPagination()}
            </div>

            {/* Información de paginación */}
            {vacunas.length > 0 && (
                <div className="text-sm text-gray-500 text-center mt-4">
                    Mostrando vacunas {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, vacunas.length)} de {vacunas.length}
                </div>
            )}
        </div>
    );
};
