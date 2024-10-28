import '@/app/globals.css';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { logout } from '@/utils/index.utils';
import { useAuth } from '@/hooks/index.hooks';
import { useRouter } from 'next/router';
import { VetHeader } from '@/components/vetdoc/VetHeader';
import { VacunaForm } from '@/components/vetdoc/VacunaForm';
import { ApiService } from '@/services/api';
import { VacunasList } from '@/components/vetdoc/VacunasList';
import { Calendar, Clipboard, Syringe, Plus } from 'lucide-react';


interface Vacuna {
    ID: number;
    Vacuna: string;
    Descripcion: string;
    Laboratorio: string;
    Tipo: string;
    EdadMinima: number;
}

const VetDocPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Veterinario']);
    const [showVacunas, setShowVacunas] = useState(false);
    const [showVacunaForm, setShowVacunaForm] = useState(false);
    const [vacunas, setVacunas] = useState<Vacuna[]>([]);

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
            const data = await ApiService.fetch<Vacuna[]>('/vetdoc/vacunas', {
                method: 'GET',
            });
            setVacunas(data);
            setShowVacunas(true);
            setShowVacunaForm(false);
        } catch (error) {
            console.error('Error al obtener vacunas:', error);
        }
    };

    const handleNewVacunaClick = () => {
        setShowVacunaForm(true);
        setShowVacunas(false);
    };

    const handleVacunaRegistrada = () => {
        handleVacunasClick(); // Recargar lista de vacunas
        setShowVacunaForm(false);
        setShowVacunas(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <VetHeader onLogout={handleLogout} />
            <main className="container mx-auto mt-8 p-4">
                {!showVacunas && !showVacunaForm ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <DashboardCard 
                            icon={<Syringe size={40} />}
                            title="Gestión de Vacunas"
                            description="Ver y registrar vacunas disponibles"
                            onClick={handleVacunasClick}
                        />
                        <DashboardCard 
                            icon={<Calendar size={40} />}
                            title="Citas del Día"
                            description="Ver las citas programadas para hoy"
                        />
                        <DashboardCard 
                            icon={<Clipboard size={40} />}
                            title="Historial de Pacientes"
                            description="Acceder a los registros médicos"
                        />
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <Button onClick={() => {
                                setShowVacunas(false);
                                setShowVacunaForm(false);
                            }}>
                                Volver al Dashboard
                            </Button>
                            {showVacunas && (
                                <Button onClick={handleNewVacunaClick}>
                                    <Plus className="mr-2" size={16} />
                                    Nueva Vacuna
                                </Button>
                            )}
                        </div>

                        {showVacunas && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Vacunas Registradas</h2>
                                <VacunasList vacunas={vacunas} />
                            </>
                        )}

                        {showVacunaForm && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Registrar Nueva Vacuna</h2>
                                <VacunaForm onSuccess={handleVacunaRegistrada} />
                            </>
                        )}
                    </div>
                )}
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
