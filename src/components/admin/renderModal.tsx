import React from 'react';
import { Button } from '@/components/ui/button';
import { Personal, Mascota } from '@/types/admin'; // Asegúrate de tener estas interfaces definidas



interface RenderModalProps<T extends Record<string, unknown>> {
    title: string;
    data: T[];
    onClose: () => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage?: number;
}

export const renderModal = <T extends Record<string, unknown>>({
    title,
    data,
    onClose,
    currentPage,
    setCurrentPage,
    itemsPerPage = 7
}: RenderModalProps<T>) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPagination = (totalItems: number) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return (
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        className="mx-1"
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>
        );
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Esto dará el formato YYYY-MM-DD
    };

    const renderTableHeaders = () => {
        if (currentItems.length === 0) return null;
        const item = currentItems[0];
        if ('PersonalID' in item) {
          return ['PersonalID', 'NombreCompleto', 'Telefono', 'Direccion', 'FechaContratacion', 'Email', 'CargoID', 'ProfesionID'];
        }
        if ('MascotaID' in item) {
          return Object.keys(item);
        }
        // ... (otros casos para diferentes tipos de datos)
        return Object.keys(item);
    };
    
    const renderTableCell = (item: T, key: string) => {
        if (key === 'FechaContratacion' && 'FechaContratacion' in item) {
            return formatDate((item as unknown as Personal)['FechaContratacion']);
        }
        if (key === 'FechaNacimiento' && 'FechaNacimiento' in item) {
            return formatDate((item as unknown as Mascota)['FechaNacimiento']);
        }
        return item[key as keyof T]?.toString() || '';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <table className="w-full">
              <thead>
                <tr>
                  {renderTableHeaders()?.map((key) => (
                    <th key={key} className="text-left p-2">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    {renderTableHeaders()?.map((key) => (
                      <td key={key} className="p-2">{renderTableCell(item, key)}</td>
                    ))}
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
