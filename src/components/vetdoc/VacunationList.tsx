import { Column, DataTable } from './common/DataTable';
import type { VacunacionRegistro } from '@/types/index.types';


export const VacunacionList: React.FC<{ registros: VacunacionRegistro[] }> = ({ registros }) => {
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString();
    };

    const columns: Column<VacunacionRegistro>[] = [
        { key: 'MascotaID', header: 'MascotaID' },
        { key: 'Nombre', header: 'Mascota' },
        { key: 'Raza', header: 'Raza' },
        { key: 'Vacuna', header: 'Vacuna' },
        { 
          key: 'Fecha_De_Vacunacion', 
          header: 'Fecha de Vacunación',
          render: (registro) => formatDate(registro.Fecha_De_Vacunacion)
        },
        { 
          key: 'Proxima_Fecha', 
          header: 'Próxima Fecha',
          render: (registro) => formatDate(registro.Proxima_Fecha)
        }
    ];

    const renderMobileCard = (registro: VacunacionRegistro) => (
        <div key={`${registro.Nombre}-${registro.Fecha_De_Vacunacion}`} 
             className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">MascotaID: </span>
                <span className="text-gray-600">{registro.MascotaID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Mascota: </span>
                <span className="text-gray-600">{registro.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Raza: </span>
                <span className="text-gray-600">{registro.Raza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Vacuna: </span>
                <span className="text-gray-600">{registro.Vacuna}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Fecha de Vacunación: </span>
                <span className="text-gray-600">{formatDate(registro.Fecha_De_Vacunacion)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Próxima Fecha: </span>
                <span className="text-gray-600">{formatDate(registro.Proxima_Fecha)}</span>
            </div>      
        </div>
    );

    return (
        <DataTable<VacunacionRegistro>
            data={registros}
            columns={columns}
            renderMobileCard={renderMobileCard}
        />
    );
};
