import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@/utils/index.utils';
import { useAuth } from '@/hooks/index.hooks';
import { Button } from '@/components/ui/index.ui';
import {
    Stethoscope, LogOut, Plus,
    Clipboard, Search, Activity,
    Scissors, BedDouble, TestTube,
    Syringe, History, FileCheck
} from 'lucide-react';

type MainView = 'nuevo' | 'activos' | 'historial';
type ServiceType = 'consulta' | 'peluqueria' | 'internacion' | 'analisis' | 'cirugia';

const ServiciosPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Veterinario']);
    const [mainView, setMainView] = useState<MainView>('nuevo');
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    const renderMainContent = () => {
        switch (mainView) {
            case 'nuevo':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Nuevo Servicio</h2>
                        {selectedService ? (
                            // Aquí irá el formulario específico del servicio seleccionado
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-4">Formulario de {selectedService}</h3>
                                {/* Formulario específico se renderizará aquí */}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ServiceCard
                                    icon={<Activity size={40} />}
                                    title="Consulta Médica"
                                    description="Registro de consulta veterinaria"
                                    onClick={() => setSelectedService('consulta')}
                                />
                                <ServiceCard
                                    icon={<Scissors size={40} />}
                                    title="Peluquería"
                                    description="Registro de servicio de peluquería"
                                    onClick={() => setSelectedService('peluqueria')}
                                />
                                <ServiceCard
                                    icon={<BedDouble size={40} />}
                                    title="Internación"
                                    description="Registro de internación"
                                    onClick={() => setSelectedService('internacion')}
                                />
                                <ServiceCard
                                    icon={<TestTube size={40} />}
                                    title="Análisis Clínico"
                                    description="Registro de análisis clínico"
                                    onClick={() => setSelectedService('analisis')}
                                />
                                <ServiceCard
                                    icon={<Syringe size={40} />}
                                    title="Cirugía"
                                    description="Registro de cirugía"
                                    onClick={() => setSelectedService('cirugia')}
                                />
                            </div>
                        )}
                    </div>
                );
            case 'activos':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Servicios Activos</h2>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex gap-4 mb-6">
                                <Button variant="outline">En Proceso</Button>
                                <Button variant="outline">Pendientes</Button>
                                <Button variant="outline">Todos</Button>
                            </div>
                            {/* Lista de servicios activos se renderizará aquí */}
                        </div>
                    </div>
                );
            case 'historial':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Historial Clínico</h2>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="mb-6">
                                <div className="flex gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Buscar mascota..."
                                        className="flex-1 p-2 border rounded-md"
                                    />
                                    <Button>
                                        <Search size={20} className="mr-2" />
                                        Buscar
                                    </Button>
                                </div>
                            </div>
                            {/* Resultados de búsqueda y historial se renderizarán aquí */}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
                            <Stethoscope className="mr-2" />
                            Servicios Veterinarios
                        </h1>
                        <Button variant="ghost" onClick={() => router.push('/vetdoc/dashboard')}>
                            Volver a Dashboard
                        </Button>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2" size={16} />
                        Cerrar Sesión
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-4rem)]">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg">
                    <nav className="p-4">
                        <div className="space-y-2">
                            <NavButton
                                icon={<Plus size={20} />}
                                text="Nuevo Servicio"
                                active={mainView === 'nuevo'}
                                onClick={() => {
                                    setMainView('nuevo');
                                    setSelectedService(null);
                                }}
                            />
                            <NavButton
                                icon={<Clipboard size={20} />}
                                text="Servicios Activos"
                                active={mainView === 'activos'}
                                onClick={() => {
                                    setMainView('activos');
                                    setSelectedService(null);
                                }}
                            />
                            <NavButton
                                icon={<History size={20} />}
                                text="Historial Clínico"
                                active={mainView === 'historial'}
                                onClick={() => {
                                    setMainView('historial');
                                    setSelectedService(null);
                                }}
                            />
                        </div>

                        {/* Subnavegación contextual */}
                        {mainView === 'nuevo' && selectedService && (
                            <div className="mt-8 pt-4 border-t">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Servicio Seleccionado
                                </h3>
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-start text-blue-600"
                                    onClick={() => setSelectedService(null)}
                                >
                                    <FileCheck size={16} className="mr-2" />
                                    Volver a Servicios
                                </Button>
                            </div>
                        )}
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-auto bg-gray-50">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

// Components
interface NavButtonProps {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, text, active, onClick }) => (
    <button
        onClick={onClick}
        className={`
            w-full flex items-center px-4 py-2 rounded-lg
            transition-colors duration-150 ease-in-out
            ${active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'}
        `}
    >
        {icon}
        <span className="ml-3">{text}</span>
    </button>
);

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
    >
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default ServiciosPage;