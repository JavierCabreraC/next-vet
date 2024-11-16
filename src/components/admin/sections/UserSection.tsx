import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/index.ui';
import { Personal, ViewState } from '@/types/admin';
import { useFormHandler } from '@/hooks/common/useFormHandler';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import { Column, DataTable } from '@/components/vetdoc/common/DataTable';


interface UserSectionProps {
    view: ViewState;
}

export const UserSection: React.FC<UserSectionProps> = ({ view }) => {
    const [staffList, setStaffList] = useState<Personal[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [clientList, setClientList] = useState<Cliente[]>([]);
    // const [userList, setUserList] = useState<Usuario[]>([]);
    // const [logList, setLogList] = useState<Bitacora[]>([]);

    // Columnas para la tabla de personal
    const staffColumns: Column<Personal>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Nombre', header: 'Nombre' },
        { key: 'Telefono', header: 'Teléfono' },
        { key: 'Direccion', header: 'Dirección' },
        { key: 'Email', header: 'Email' },
        { key: 'Cargo', header: 'Cargo' },
        { key: 'Profesion', header: 'Profesión' },
        { 
            key: 'Fecha_De_Contratacion', 
            header: 'Fecha Contratación',
            render: (personal: Personal) => new Date(personal.Fecha_De_Contratacion).toLocaleDateString()
        },
        {
            key: 'actions',
            header: 'Acciones',
            render: (personal: Personal) => (
                <Button
                    onClick={() => handleEdit(personal)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    // Renderizado de tarjeta móvil para personal
    const renderStaffMobileCard = (personal: Personal) => (
        <div key={personal.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{personal.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{personal.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Teléfono: </span>
                <span>{personal.Telefono}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dirección: </span>
                <span>{personal.Direccion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Email: </span>
                <span>{personal.Email}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cargo: </span>
                <span>{personal.Cargo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Profesión: </span>
                <span>{personal.Profesion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha Contratación: </span>
                <span>{new Date(personal.Fecha_De_Contratacion).toLocaleDateString()}</span>
            </div>
            <Button
                onClick={() => handleEdit(personal)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

    const personalHandler = useFormHandler({
        formType: 'personal',
        initialState: {
            NombreCompleto: '',
            Telefono: '',
            Direccion: '',
            Email: '',
            FechaContratacion: '',
            CargoID: 0,
            ProfesionID: 0
        }
    });

    const loadStaffData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Personal[]>(`${API_CONFIG.ENDPOINTS.ADM_PERSONAL}`, {
                method: 'GET',
            });
            setStaffList(data);
        } catch (error) {
            console.error('Error al cargar personal:', error);
            // Aquí podrías manejar el error, por ejemplo mostrando una notificación
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (personal: Personal) => {
        // Implementar lógica de edición
        console.log('Editar personal:', personal);
    };

    useEffect(() => {
        if (view === 'list-staff') {
            loadStaffData();
        }
    }, [view]);

    switch (view) {
        case 'create-staff':
            return (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Crear Personal</h2>
                    <form onSubmit={personalHandler.handleSubmit} className="space-y-4">
                        {/* Campos del formulario... */}
                    </form>
                </div>
            );
        case 'list-staff':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Lista de Personal</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            Cargando...
                        </div>
                    ) : (
                        <DataTable
                            data={staffList}
                            columns={staffColumns}
                            renderMobileCard={renderStaffMobileCard}
                        />
                    )}
                </div>
            );
        // Implementar otros casos...
        default:
            return null;
    }
};
