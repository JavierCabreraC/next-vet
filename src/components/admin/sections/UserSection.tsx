import { useState, useEffect } from 'react';
import { ClienteList } from '../usuarios/listados/ClienteList';
import { UsuarioList } from '../usuarios/listados/UsuarioList';
import { PersonalList } from '../usuarios/listados/PersonalList';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import { Bitacora, ViewState } from '@/types/admin';
import { Column, DataTable } from '@/components/vetdoc/common/DataTable';
import { CrearPersonalForm } from '../usuarios/formularios/CrearPersonalForm';


interface UserSectionProps {
    view: ViewState;
}

export const UserSection: React.FC<UserSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [logList, setLogList] = useState<Bitacora[]>([]);


    const logColumns: Column<Bitacora>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'UsuarioID', header: 'Usuario ID' },
        { key: 'Accion', header: 'Acción' },
        { key: 'IPDir', header: 'Dirección IP' },
        { 
            key: 'Fecha_Hora', 
            header: 'Fecha y Hora',
            render: (bitacora: Bitacora) => new Date(bitacora.Fecha_Hora).toLocaleString()
        }
    ];
    
    // Renderizado móvil para bitácora
    const renderLogMobileCard = (bitacora: Bitacora) => (
        <div key={bitacora.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{bitacora.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Usuario ID: </span>
                <span>{bitacora.UsuarioID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Acción: </span>
                <span>{bitacora.Accion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">IP: </span>
                <span>{bitacora.IPDir}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha y Hora: </span>
                <span>{new Date(bitacora.Fecha_Hora).toLocaleString()}</span>
            </div>
        </div>
    );

    const loadLogData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Bitacora[]>(`${API_CONFIG.ENDPOINTS.ADM_LOGS}`, {
                method: 'GET',
            });
            setLogList(data);
        } catch (error) {
            console.error('Error al cargar bitácora:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (view === 'list-logs') {
            loadLogData();
        }
    }, [view]);

    switch (view) {
        case 'create-personal':
            return <CrearPersonalForm />;

        case 'list-personal':
            return <PersonalList isLoading={isLoading} setIsLoading={setIsLoading} />;
            
        case 'list-client':
            return <ClienteList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
            
        case 'list-active-users':
            return <UsuarioList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
    
        case 'list-logs':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Registros de Bitácora</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            Cargando...
                        </div>
                    ) : (
                        <DataTable
                            data={logList}
                            columns={logColumns}
                            renderMobileCard={renderLogMobileCard}
                        />
                    )}
                </div>
            );
        // Implementar otros casos...
        default:
            return null;
    }
};
