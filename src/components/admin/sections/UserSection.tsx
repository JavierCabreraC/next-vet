import { useState, useEffect } from 'react';
import router from 'next/router';
import { Pencil } from 'lucide-react';
import { Button, Input } from '@/components/ui/index.ui';
import { UpdateModal } from '@/components/admin/shared/UpdateModal';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import { Column, DataTable } from '@/components/vetdoc/common/DataTable';
import { Bitacora, Cliente, Personal, Usuario, ViewState, UpdateForms, UpdateType, PersonalForm } from '@/types/admin';


interface UserSectionProps {
    view: ViewState;
}

export const UserSection: React.FC<UserSectionProps> = ({ view }) => {
    const [staffList, setStaffList] = useState<Personal[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [clientList, setClientList] = useState<Cliente[]>([]);
    const [userList, setUserList] = useState<Usuario[]>([]);
    const [logList, setLogList] = useState<Bitacora[]>([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 },
        usuarioUpdate: { UsuarioID: 0 },
        reservacionUpdate: { ReservacionID: 0 }
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const [staffForm, setStaffForm] = useState<PersonalForm>({
        NombreCompleto: '',
        Telefono: '',
        Direccion: '',
        Email: '',
        FechaContratacion: '',
        CargoID: 0,
        ProfesionID: 0
    });

    // Handler para crear personal
    const handleCreateStaff = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await ApiService.fetch(API_CONFIG.ENDPOINTS.ADM_PERSONAL, {
                method: 'POST',
                body: JSON.stringify(staffForm)
            });
            // Resetear formulario
            setStaffForm({
                NombreCompleto: '',
                Telefono: '',
                Direccion: '',
                Email: '',
                FechaContratacion: '',
                CargoID: 0,
                ProfesionID: 0
            });
            setSuccessMessage("El personal ha sido registrado exitosamente");
            setTimeout(() => setSuccessMessage(null), 2000);
        } catch (error) {
            console.error('Error al registrar personal:', error);
            setErrorMessage("Hubo un error al registrar el personal");
            setTimeout(() => setErrorMessage(null), 2000);
        } finally {
            setIsLoading(false);
        }
    };

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
            header: 'Inhabilitar',
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
    const loadClienteData = async () => {
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

    const loadUsuarioData = async () => {
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

    const loadPersonalData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Personal[]>(`${API_CONFIG.ENDPOINTS.ADM_PERSONAL}`, {
                method: 'GET',
            });
            setStaffList(data);
        } catch (error) {
            console.error('Error al cargar personal:', error);
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

    // const handleEditCliente = (personal: Cliente) => {
    //     // Implementar lógica de edición
    //     console.log('Editar Cliente:', personal);
    // };

    const handleEditCliente = (cliente: Cliente) => {
        setUpdateType('cliente');
        setUpdateForm({
            ...updateForm,
            clienteUpdate: { 
                ClienteID: cliente.ClienteID,
                // Inicializar con los valores actuales
                NombreCompleto: cliente.NombreCompleto,
                Telefono: cliente.Telefono,
                Direccion: cliente.Direccion
            }
        });
        setShowUpdateModal(true);
    };

    const handleEditUsuario = (usuario: Usuario) => {
        console.log('Editar usuario:', usuario);
    };

    useEffect(() => {
        if (view === 'list-personal') {
            loadPersonalData();
        } else if (view === 'list-client') {
            loadClienteData();
        } else if (view === 'list-active-users') {
            loadUsuarioData();
        } else if (view === 'list-logs') {
            loadLogData();
        }
    }, [view]);

    const handleUpdate = async () => {
        if (!updateType) return;

        const endpointMap: Record<UpdateType, string> = {
            personal: API_CONFIG.ENDPOINTS.ADM_PERSONAL,
            cliente: API_CONFIG.ENDPOINTS.ADM_CLIENTES,
            mascota: API_CONFIG.ENDPOINTS.ADM_MASCOTAS,
            reservacion: API_CONFIG.ENDPOINTS.ADM_RESERV,
            usuario: API_CONFIG.ENDPOINTS.ADM_USERS
        };

        try {
            await ApiService.fetch(endpointMap[updateType], {
                method: 'PATCH',
                body: JSON.stringify(
                    updateType === 'cliente' 
                        ? updateForm.clienteUpdate 
                        : updateForm[`${updateType}Update`]
                )
            });

            setShowUpdateModal(false);
            
            // Recargar datos según el tipo
            if (updateType === 'cliente') {
                loadClienteData();
            }
            // ... otros casos según sea necesario
            
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    switch (view) {
        case 'create-personal':
            return (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Registrar Personal</h2>
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleCreateStaff} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nombre Completo
                            </label>
                            <Input
                                value={staffForm.NombreCompleto}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    NombreCompleto: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Teléfono
                            </label>
                            <Input
                                value={staffForm.Telefono}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    Telefono: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Dirección
                            </label>
                            <Input
                                value={staffForm.Direccion}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    Direccion: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <Input
                                type="email"
                                value={staffForm.Email}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    Email: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Fecha de Contratación
                            </label>
                            <Input
                                type="date"
                                value={staffForm.FechaContratacion}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    FechaContratacion: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Cargo
                            </label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={staffForm.CargoID}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    CargoID: parseInt(e.target.value, 10)
                                })}
                                required
                            >
                                <option value="">Seleccione un cargo</option>
                                <option value="2">Veterinario</option>
                                <option value="3">Laboratorista</option>
                                <option value="4">Enfermero</option>
                                <option value="5">Peluquero</option>
                                <option value="6">Practicante</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Profesión
                            </label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={staffForm.ProfesionID}
                                onChange={(e) => setStaffForm({
                                    ...staffForm,
                                    ProfesionID: parseInt(e.target.value, 10)
                                })}
                                required
                            >
                                <option value="">Seleccione una profesión</option>
                                <option value="1">Médico Veterinario</option>
                                <option value="2">Bioquímico</option>
                                <option value="3">Enfermero</option>
                                <option value="4">Estudiante</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => router.push('/admin/dashboard')}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registrando...' : 'Registrar Personal'}
                            </Button>
                        </div>
                    </form>
                </div>
            );
        case 'list-personal':
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
                    <UpdateModal
                        isOpen={showUpdateModal}
                        onClose={() => setShowUpdateModal(false)}
                        type={updateType}
                        updateForm={updateForm}
                        setUpdateForm={setUpdateForm}
                        onSubmit={handleUpdate}
                        setShowPersonalModal={() => {}}  // Función vacía
                        setShowClienteModal={() => {}}   // Función vacía
                        setShowMascotaModal={() => {}}   // Función vacía
                    />
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
