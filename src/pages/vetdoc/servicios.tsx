import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@/utils/index.utils';
import { useAuth } from '@/hooks/index.hooks';
import { Button } from '@/components/ui/index.ui';
import { Stethoscope, LogOut, Search } from 'lucide-react';
import type { MainView, ReservacionV, ServiceType } from '@/types/vetdoc';
import { ReservacionesPendientes, ConsultaForm, PeluqueriaForm, ServiciosCompletados, ServicioSelection, 
    Sidebar, ServiciosActivosView, RecetasView, AnalisisView, CirugiaForm} from '@/components/vetdoc/index.docvetcomp';


const ServiciosPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Veterinario']);
    const [mainView, setMainView] = useState<MainView>('nuevo');
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
    const [selectedReservacion, setSelectedReservacion] = useState<ReservacionV | null>(null);

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
                if (selectedService === 'peluqueria') {
                    if (!selectedReservacion) {
                        return (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Reservaciones Pendientes - Peluquería</h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setSelectedService(null)}
                                    >
                                        Volver
                                    </Button>
                                </div>
                                <ReservacionesPendientes 
                                    onReservacionSelect={(reservacion) => {
                                        setSelectedReservacion(reservacion);
                                    }} 
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Registro de Peluquería</h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setSelectedReservacion(null)}
                                    >
                                        Volver a Reservaciones
                                    </Button>
                                </div>
                                <PeluqueriaForm 
                                    reservacion={selectedReservacion}
                                    onSuccess={() => {
                                        setMainView('activos');
                                        setSelectedReservacion(null);
                                        setSelectedService(null);
                                    }}
                                    onCancel={ () => { setSelectedReservacion(null); }} 
                                />
                            </div>
                        );
                    }
                }
                if (selectedService === 'consulta') {
                    if (!selectedReservacion) {
                        return (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">
                                        Reservaciones Pendientes - Consulta Médica
                                    </h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setSelectedService(null)}
                                    >
                                        Volver
                                    </Button>
                                </div>
                                <ReservacionesPendientes 
                                    onReservacionSelect={(reservacion) => {
                                        setSelectedReservacion(reservacion);
                                    }} 
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">
                                        Registro de Consulta Médica
                                    </h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setSelectedReservacion(null)}
                                    >
                                        Volver a Reservaciones
                                    </Button>
                                </div>
                                <ConsultaForm 
                                    reservacion={selectedReservacion}
                                    onSuccess={() => {
                                        setMainView('activos');
                                        setSelectedReservacion(null);
                                        setSelectedService(null);
                                    }}
                                    onCancel={ () => {setSelectedReservacion(null); }} 
                                />
                            </div>
                        );
                    }
                }
                // En el caso 'nuevo' del switch dentro de renderMainContent
                if (selectedService === 'cirugia') {
                    if (!selectedReservacion) {
                        return (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Reservaciones Pendientes - Cirugía</h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setSelectedService(null)}
                                    >
                                        Volver
                                    </Button>
                                </div>
                                <ReservacionesPendientes 
                                    onReservacionSelect={(reservacion) => {
                                        setSelectedReservacion(reservacion);
                                    }} 
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">Registro de Cirugía</h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setSelectedReservacion(null)}
                                    >
                                        Volver a Reservaciones
                                    </Button>
                                </div>
                                <CirugiaForm 
                                    reservacion={selectedReservacion}
                                    onSuccess={() => {
                                        setMainView('activos');
                                        setSelectedReservacion(null);
                                        setSelectedService(null);
                                    }}
                                    onCancel={() => {setSelectedReservacion(null);}} 
                                />
                            </div>
                        );
                    }
                }
                return ( <ServicioSelection onServiceSelect={setSelectedService} /> );
            case 'activos': return < ServiciosActivosView onNewService={() => setMainView('nuevo')} />;
            case 'completados':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Servicios Completados</h2>
                        <ServiciosCompletados />
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
            case 'recetas': return < RecetasView />;
            case 'analisis': return < AnalisisView />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-gray-100 border-b border-gray-200 py-3 px-8">
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
                <Sidebar
                    mainView={mainView}
                    selectedService={selectedService}
                    onViewChange={setMainView}
                    onServiceClear={() => setSelectedService(null)}
                />
                <main className="flex-1 overflow-auto bg-gray-50">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

export default ServiciosPage;
