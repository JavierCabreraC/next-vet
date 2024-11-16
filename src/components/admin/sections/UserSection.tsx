import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/index.ui';
import { useFormHandler } from '@/hooks/common/useFormHandler';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import { Column, DataTable } from '@/components/vetdoc/common/DataTable';
import { Bitacora, Cliente, Personal, Usuario, ViewState } from '@/types/admin';


interface UserSectionProps {
    view: ViewState;
}

export const UserSection: React.FC<UserSectionProps> = ({ view }) => {
    const [staffList, setStaffList] = useState<Personal[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [clientList, setClientList] = useState<Cliente[]>([]);
    const [userList, setUserList] = useState<Usuario[]>([]);
    const [logList, setLogList] = useState<Bitacora[]>([]);

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
            header: 'Editar',
            render: (personal: Personal) => (
                <Button
                    onClick={() => handleEditPersonal(personal)}
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
                onClick={() => handleEditPersonal(personal)}
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

    const clientColumns: Column<Cliente>[] = [
        { key: 'ClienteID', header: 'ID' },
        { key: 'NombreCompleto', header: 'Nombre Completo' },
        { key: 'Telefono', header: 'Teléfono' },
        { key: 'Direccion', header: 'Dirección' },
        { key: 'Email', header: 'Email' },
        {
            key: 'actions',
            header: 'Editar',
            render: (cliente: Cliente) => (
                <Button
                    onClick={() => handleEditCliente(cliente)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const userColumns: Column<Usuario>[] = [
        { key: 'UsuarioID', header: 'ID' },
        { key: 'Rol', header: 'Rol' },
        { key: 'Estado', header: 'Estado' },
        {
            key: 'actions',
            header: 'Editar',
            render: (usuario: Usuario) => (
                <Button
                    onClick={() => handleEditUsuario(usuario)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];
    
    // Renderizado móvil para cliente
    const renderClientMobileCard = (cliente: Cliente) => (
        <div key={cliente.ClienteID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{cliente.ClienteID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{cliente.NombreCompleto}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Teléfono: </span>
                <span>{cliente.Telefono}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dirección: </span>
                <span>{cliente.Direccion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Email: </span>
                <span>{cliente.Email}</span>
            </div>
            <Button
                onClick={() => handleEditCliente(cliente)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

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
    
    // Renderizado móvil para usuarios
    const renderUserMobileCard = (usuario: Usuario) => (
        <div key={usuario.UsuarioID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{usuario.UsuarioID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Rol: </span>
                <span>{usuario.Rol}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Estado: </span>
                <span>{usuario.Estado}</span>
            </div>
            <Button
                onClick={() => handleEditUsuario(usuario)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );
    
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
    
    // Agregar al UserSection la función de carga de clientes
    const loadClientData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Cliente[]>(`${API_CONFIG.ENDPOINTS.ADM_CLIENTES}`, {
                method: 'GET',
            });
            setClientList(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Usuario[]>(`${API_CONFIG.ENDPOINTS.ADM_USERS}`, {
                method: 'GET',
            });
            setUserList(data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleEditPersonal = (personal: Personal) => {
        // Implementar lógica de edición
        console.log('Editar personal:', personal);
    };

    const handleEditCliente = (personal: Cliente) => {
        // Implementar lógica de edición
        console.log('Editar Cliente:', personal);
    };

    const handleEditUsuario = (usuario: Usuario) => {
        console.log('Editar usuario:', usuario);
    };

    useEffect(() => {
        if (view === 'list-staff') {
            loadStaffData();
        } else if (view === 'list-client') {
            loadClientData();
        } else if (view === 'list-active-users') {
            loadUserData();
        } else if (view === 'list-logs') {
            loadLogData();
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
        case 'list-client':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Lista de Clientes</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            Cargando...
                        </div>
                    ) : (
                        <DataTable
                            data={clientList}
                            columns={clientColumns}
                            renderMobileCard={renderClientMobileCard}
                        />
                    )}
                </div>
            );
        case 'list-active-users':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Usuarios Activos</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            Cargando...
                        </div>
                    ) : (
                        <DataTable
                            data={userList}
                            columns={userColumns}
                            renderMobileCard={renderUserMobileCard}
                        />
                    )}
                </div>
            );
    
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
