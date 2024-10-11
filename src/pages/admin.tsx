import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/auth';
import { UserPlus, Users, PawPrint, ClipboardList, LogOut } from 'lucide-react';


// Tipos para los formularios
type PersonalForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
    FechaContratacion: string;
    CargoID: number;
    ProfesionID: number;
};

type ClienteForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
};

type MascotaForm = {
    Nombre: string;
    Sexo: string;
    FechaDeNacimiento: string;
    Observaciones: string;
    ClienteID: number;
    RazaID: number;
};

type FormTypes = PersonalForm | ClienteForm | MascotaForm;

interface Personal extends Record<string, unknown> {
    PersonalID: number;
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    FechaContratacion: string;
    Activo: boolean;
    Email: string;
    CargoID: number;
    ProfesionID: number;
}

interface Cliente extends Record<string, unknown> {
    ClienteID: number;
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
}

interface Mascota extends Record<string, unknown> {
    MascotaID: number;
    Nombre: string;
    Sexo: string;
    FechaNacimiento: string;
    Observaciones: string;
    ClienteID: number;
    RazaID?: number;
}

interface AdminCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ icon, title, description, onClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer" onClick={onClick}>
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showClienteForm, setShowClienteForm] = useState(false);
    const [showMascotaForm, setShowMascotaForm] = useState(false);
    const [personalForm, setPersonalForm] = useState<PersonalForm>({
        NombreCompleto: '', Telefono: '', Direccion: '', Email: '', 
        FechaContratacion: '', CargoID: 0, ProfesionID: 0
    });
    const [clienteForm, setClienteForm] = useState<ClienteForm>({
        NombreCompleto: '', Telefono: '', Direccion: '', Email: ''
    });
    const [mascotaForm, setMascotaForm] = useState<MascotaForm>({
        Nombre: '', Sexo: '', FechaDeNacimiento: '', Observaciones: '', 
        ClienteID: 0, RazaID: 0
    });

    // Estados actualizados con tipos específicos
    const [personalList, setPersonalList] = useState<Personal[]>([]);
    const [clienteList, setClienteList] = useState<Cliente[]>([]);
    const [mascotaList, setMascotaList] = useState<Mascota[]>([]);
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showMascotaModal, setShowMascotaModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }
    const handleLogout = () => {
        logout(router);
    };
    const handleSubmit = async (formType: 'personal' | 'cliente' | 'mascota') => {
        const token = localStorage.getItem('token');
        let url = '';
        let body: Record<string, unknown> = {};
        switch (formType) {
            case 'personal':
                url = 'http://localhost:3333/admin/personal';
                body = { ...personalForm };
                break;
            case 'cliente':
                url = 'http://localhost:3333/admin/cliente';
                body = { ...clienteForm };
                break;
            case 'mascota':
                url = 'http://localhost:3333/admin/mascota';
                body = { ...mascotaForm };
                break;
        }
        // Añadir el JWT al cuerpo de la solicitud
        body.JWT = token;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });   
            if (response.ok) {
                alert(`${formType} registrado con éxito`);
                // Resetear el formulario y cerrar el modal
                switch (formType) {
                    case 'personal':
                        setPersonalForm({NombreCompleto: '', Telefono: '', Direccion: '', Email: '', FechaContratacion: '', CargoID: 0, ProfesionID: 0});
                        setShowPersonalForm(false);
                        break;
                    case 'cliente':
                        setClienteForm({NombreCompleto: '', Telefono: '', Direccion: '', Email: ''});
                        setShowClienteForm(false);
                        break;
                    case 'mascota':
                        setMascotaForm({Nombre: '', Sexo: '', FechaDeNacimiento: '', Observaciones: '', ClienteID: 0, RazaID: 0});
                        setShowMascotaForm(false);
                        break;
                }
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };

    const fetchData = async <T,>(endpoint: string, setData: React.Dispatch<React.SetStateAction<T[]>>) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3333${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ JWT: token })
            });
            if (response.ok) {
                const data: T[] = await response.json();
                setData(data);
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleViewList = async (type: 'personal' | 'clientes' | 'mascotas') => {
        switch (type) {
            case 'personal':
                await fetchData<Personal>('/admin/personal', setPersonalList);
                setShowPersonalModal(true);
                break;
            case 'clientes':
                await fetchData<Cliente>('/clientes/', setClienteList);
                setShowClienteModal(true);
                break;
            case 'mascotas':
                await fetchData<Mascota>('/mascotas', setMascotaList);
                setShowMascotaModal(true);
                break;
        }
        setCurrentPage(1);
    };

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

    const renderModal = <T extends Record<string, unknown>>(title: string, data: T[], onClose: () => void) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                {Object.keys(currentItems[0] || {}).map((key) => (
                                    <th key={key} className="text-left p-2">{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                    {Object.values(item).map((value, valueIndex) => (
                                        <td key={valueIndex} className="p-2">{value?.toString()}</td>
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

    const renderForm = <T extends FormTypes>(
        title: string,
        form: T,
        setForm: React.Dispatch<React.SetStateAction<T>>,
        onClose: () => void
    ) => {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <Button variant="ghost" onClick={onClose}>X</Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(title.split(' ')[1].toLowerCase() as 'personal' | 'cliente' | 'mascota'); }} className="space-y-4">
                        {(Object.keys(form) as Array<keyof T>).map((key) => (
                            <div key={key as string}>
                                <label htmlFor={key as string} className="block text-sm font-medium text-gray-700">{key as string}</label>
                                <Input
                                    type={typeof form[key] === 'number' ? 'number' : 'text'}
                                    id={key as string}
                                    value={form[key]?.toString() ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
                                        setForm(prev => ({ ...prev, [key]: value }));
                                    }}
                                    className="mt-1"
                                    required
                                />
                            </div>
                        ))}
                        <Button type="submit" className="w-full">Registrar</Button>
                    </form>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">
                        <span className="flex items-center">
                            <ClipboardList className="mr-2" />
                            Panel de Administración
                        </span>
                    </h1>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2" size={16} />
                        Cerrar Sesión
                    </Button>
                </div>
            </header>
            <main className="container mx-auto mt-8 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <AdminCard 
                        icon={<UserPlus size={40} />}
                        title="Registrar Personal"
                        description="Añadir nuevo personal a la clínica"
                        onClick={() => setShowPersonalForm(true)}
                    />
                    <AdminCard 
                        icon={<Users size={40} />}
                        title="Registrar Cliente"
                        description="Añadir un nuevo cliente a la base de datos"
                        onClick={() => setShowClienteForm(true)}
                    />
                    <AdminCard 
                        icon={<PawPrint size={40} />}
                        title="Registrar Mascota"
                        description="Añadir una nueva mascota a un cliente existente"
                        onClick={() => setShowMascotaForm(true)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Button onClick={() => handleViewList('personal')} className="w-full">Ver Lista de Personal</Button>
                    <Button onClick={() => handleViewList('clientes')} className="w-full">Ver Lista de Clientes</Button>
                    <Button onClick={() => handleViewList('mascotas')} className="w-full">Ver Lista de Mascotas</Button>
                </div>
            </main>
            {showPersonalForm && renderForm('Registrar Personal', personalForm, setPersonalForm, () => setShowPersonalForm(false))}
            {showClienteForm && renderForm('Registrar Cliente', clienteForm, setClienteForm, () => setShowClienteForm(false))}
            {showMascotaForm && renderForm('Registrar Mascota', mascotaForm, setMascotaForm, () => setShowMascotaForm(false))}
            {showPersonalModal && renderModal<Personal>('Lista de Personal', personalList, () => setShowPersonalModal(false))}
            {showClienteModal && renderModal<Cliente>('Lista de Clientes', clienteList, () => setShowClienteModal(false))}
            {showMascotaModal && renderModal<Mascota>('Lista de Mascotas', mascotaList, () => setShowMascotaModal(false))}
        </div>
    );
};

export default AdminPage;
