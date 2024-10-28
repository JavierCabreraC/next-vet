import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@/utils/index.utils';
import { useAuth } from '@/hooks/index.hooks';
import { Button } from '@/components/ui/index.ui';
import { API_CONFIG, ApiService } from '@/services/index.services';
import type { Vacuna, VacunacionRegistro } from '@/types/index.types';
import { Clipboard, Stethoscope, LogOut, Syringe, Plus, FileText } from 'lucide-react';
import { VacunasList, VacunaForm, VacunacionForm, VacunacionList } from '@/components/vetdoc/index.docvetcomp';


type ViewState = 'dashboard' | 'vacunas' | 'vacunaForm' | 'vacunacion' | 'vacunacionForm' | 'registros';

const VetDocPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Veterinario']);
    const [currentView, setCurrentView] = useState<ViewState>('dashboard');
    const [vacunas, setVacunas] = useState<Vacuna[]>([]);
    const [registros, setRegistros] = useState<VacunacionRegistro[]>([]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    const handleVacunasClick = async () => {
        try {
            const data = await ApiService.fetch<Vacuna[]>(`${API_CONFIG.ENDPOINTS.DOC_VACUNAS}`, {
                method: 'GET',
            });
            setVacunas(data);
            setCurrentView('vacunas');
        } catch (error) {
            console.error('Error al obtener vacunas:', error);
        }
    };

    const handleRegistrosClick = async () => {
        try {
            const data = await ApiService.fetch<VacunacionRegistro[]>(`${API_CONFIG.ENDPOINTS.DOC_REGVAC}`, {
                method: 'GET',
            });
            setRegistros(data);
            setCurrentView('registros');
        } catch (error) {
            console.error('Error al obtener registros:', error);
        }
    };

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <DashboardCard 
                            icon={<Syringe size={40} />}
                            title="Gestión de Vacunas"
                            description="Ver y registrar vacunas disponibles"
                            onClick={handleVacunasClick}
                        />
                        <DashboardCard 
                            icon={<FileText size={40} />}
                            title="Registrar Vacunación"
                            description="Registrar vacunación de mascota"
                            onClick={() => setCurrentView('vacunacionForm')}
                        />
                        <DashboardCard 
                            icon={<Clipboard size={40} />}
                            title="Registros de Vacunación"
                            description="Ver historial de vacunaciones"
                            onClick={handleRegistrosClick}
                        />
                    </div>
                );
            case 'vacunas':
                return (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Vacunas Registradas</h2>
                            <Button onClick={() => setCurrentView('vacunaForm')}>
                                <Plus className="mr-2" size={16} />
                                Nueva Vacuna
                            </Button>
                        </div>
                        <VacunasList vacunas={vacunas} />
                    </>
                );
            case 'vacunaForm':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Registrar Nueva Vacuna</h2>
                        <VacunaForm onSuccess={() => {
                            handleVacunasClick();
                            setCurrentView('vacunas');
                        }} />
                    </>
                );
            case 'vacunacionForm':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Registrar Vacunación</h2>
                        <VacunacionForm 
                            vacunas={vacunas}
                            onSuccess={() => {
                                handleRegistrosClick();
                                setCurrentView('registros');
                            }}
                        />
                    </>
                );
            case 'registros':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Registros de Vacunación</h2>
                        <VacunacionList registros={registros} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">
                        <span className="flex items-center">
                            <Stethoscope className="mr-2" />
                            Dashboard - Médico Veterinario
                        </span>
                    </h1>
                    <div className="flex gap-4">
                        {currentView !== 'dashboard' && (
                            <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
                                Volver al Dashboard
                            </Button>
                        )}
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="mr-2" size={16} />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto mt-8 p-4">
                {renderContent()}
            </main>
        </div>
    );
};

interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description, onClick }) => (
    <div 
        className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
        onClick={onClick}
    >
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default VetDocPage;
