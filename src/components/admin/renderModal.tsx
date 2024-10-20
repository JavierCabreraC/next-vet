import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/index.ui';
import { RenderModalProps } from '@/types/index.types';


export const renderModal = <T extends Record<string, unknown>>({
    title,
    data,
    onClose,
    currentPage,
    setCurrentPage,
    itemsPerPage = 6,
    onEdit,
}: RenderModalProps<T>) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPagination = (totalItems: number) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const maxButtons = 5; // Número de botones a mostrar
        
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);
        
        // Ajustar el startPage si estamos cerca del final
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
    
        return (
            <div className="flex justify-center mt-4 gap-1">
                {/* Botón Primera Página */}
                {startPage > 1 && (
                    <>
                        <Button
                            onClick={() => setCurrentPage(1)}
                            variant="outline"
                            className="mx-1"
                        >
                            1
                        </Button>
                        {startPage > 2 && <span className="mx-1">...</span>}
                    </>
                )}
    
                {/* Botones numerados */}
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        className="mx-1"
                    >
                        {page}
                    </Button>
                ))}
    
                {/* Botón Última Página */}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="mx-1">...</span>}
                        <Button
                            onClick={() => setCurrentPage(totalPages)}
                            variant="outline"
                            className="mx-1"
                        >
                            {totalPages}
                        </Button>
                    </>
                )}
            </div>
        );
    };

    const renderTableHeaders = (): string[] => {
        if (currentItems.length === 0) return [];
        const item = currentItems[0];
        const baseHeaders: string[] = [];
        // Bitácora
        if ('Accion' in item) {
            baseHeaders.push(...['ID', 'UsuarioID', 'Accion', 'IPDir', 'Fecha_Hora']);
        }
        // Personal
        else if ('Cargo' in item) {
            baseHeaders.push(...['ID', 'Nombre', 'Telefono', 'Direccion', 'Email', 'Cargo', 'Profesion', 'Fecha_De_Contratacion']);
        }
        // Mascota
        else if ('Especie' in item) {
            baseHeaders.push(...['ID', 'Nombre', 'Sexo', 'Fecha_De_Nacimiento', 'Observaciones', 'Especie', 'Raza', 'DueñoID']);
        }
        // Cliente
        else if ('ClienteID' in item) {
            baseHeaders.push(...['ClienteID', 'NombreCompleto', 'Telefono', 'Direccion', 'Email']);
        }
        if (onEdit) {
            baseHeaders.push('Editar');
        }
        return baseHeaders;
    };

    const getColumnWidth = (header: string): string => {
        switch (header) {
            case 'NombreCompleto':
                return 'w-1/4'; // 25% del ancho
            case 'ID':
            case 'ClienteID':
            case 'UsuarioID':
                return 'w-16'; // ancho fijo pequeño
            default:
                return 'w-auto';
        }
    };

    const headers = renderTableHeaders();
    
    const renderTableCell = (item: T, key: string) => {
        if (key === 'Activo') {
            return (item[key] as boolean) ? 'Sí' : 'No';
        }
        return item[key]?.toString() || '';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            {headers.map((header: string) => (
                                <th 
                                    key={header} 
                                    className={`text-center p-2 bg-gray-100 ${getColumnWidth(header)}`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                {(onEdit ? headers.slice(0, -1) : headers).map((header: string) => (
                                    <td 
                                        key={header} 
                                        className={`p-2 text-center ${getColumnWidth(header)}`}
                                    >
                                        {renderTableCell(item, header)}
                                    </td>
                                ))}
                                {onEdit && (
                                    <td className="p-2">
                                        <Button
                                            onClick={() => onEdit(item)}
                                            className="bg-yellow-500 hover:bg-yellow-600"
                                            size="sm"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {renderPagination(data.length)}
                <Button onClick={onClose} className="mt-4">Cerrar</Button>
            </div>
        </div>
    );
};
