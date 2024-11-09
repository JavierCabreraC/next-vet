import type { Vacuna } from '@/types/index.types';
import { Column, DataTable } from './common/DataTable';


export const VacunaList: React.FC<{ vacunas: Vacuna[] }> = ({ vacunas }) => {
    const columns: Column<Vacuna>[] = [
        { key: 'Vacuna', header: 'Nombre' },
        { key: 'Descripcion', header: 'Descripción' },
        { key: 'Laboratorio', header: 'Laboratorio' },
        { key: 'Tipo', header: 'Tipo' },
        { 
            key: 'EdadMinima', 
            header: 'Edad Mínima',
            render: (vacuna: Vacuna) => `${vacuna.EdadMinima} meses`
        }
    ];

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

    return (
        <DataTable<Vacuna>
          data={vacunas}
          columns={columns}
          renderMobileCard={renderMobileCard}
        />
    );
};
