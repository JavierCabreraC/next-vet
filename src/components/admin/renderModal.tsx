import React from 'react';
import { Button } from '@/components/ui/button';


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

    const formatFecha = (fechaCad: string): string => {
        const fecha = new Date(fechaCad);
        return fecha.toISOString().split('T')[0];
    };

    const formatFechaHora = (fechaHoraCad: string): string => {
        const fecha = new Date(fechaHoraCad);
        fecha.setUTCHours(fecha.getUTCHours() - 4);
        const año = fecha.getUTCFullYear();
        const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getUTCDate().toString().padStart(2, '0');
        const hora = fecha.getUTCHours().toString().padStart(2, '0');
        const minuto = fecha.getUTCMinutes().toString().padStart(2, '0');
        const segundos = fecha.getUTCSeconds().toString().padStart(2, '0');
        return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundos}`;
    }
  
    const renderTableHeaders = () => {
        if (currentItems.length === 0) return null;
        const item = currentItems[0];

        // Bitácora
        if ('Accion' in item) {
            return ['ID', 'UsuarioID', 'Accion', 'Fecha_Hora', 'IP'];
        }
        // Personal
        if ('Cargo' in item) {
            return ['ID', 'Nombre', 'Telefono', 'Direccion', 'Email', 'Fecha_De_Contratacion', 'Cargo', 'Profesion', 'Activo'];
        }
        // Mascota
        if ('Especie' in item) {
            return ['ID', 'Nombre', 'Sexo', 'Fecha_De_Nacimiento', 'Observaciones', 'Especie', 'Raza'];
        }
        // Cliente
        if ('ClienteID' in item) {
            return ['ClienteID', 'NombreCompleto', 'Telefono', 'Direccion', 'Email'];
        }

        return Object.keys(item);
    };
    
    const renderTableCell = (item: T, key: string) => {
      switch(key) {
          case 'Fecha_De_Contratacion':
          case 'Fecha_De_Nacimiento':
              return formatFecha(item[key] as string);
          case 'Fecha_Hora':
              return formatFechaHora(item[key] as string);
          case 'Activo':
              return (item[key] as boolean) ? 'Sí' : 'No';
          default:
              return item[key]?.toString() || '';
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <table className="w-full">
                  <thead>
                      <tr>
                          {renderTableHeaders()?.map((key) => (
                              <th key={key} className="text-left p-2 bg-gray-100">{key}</th>
                          ))}
                      </tr>
                  </thead>
                  <tbody>
                      {currentItems.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
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
