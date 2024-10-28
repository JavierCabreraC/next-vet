import '@/app/globals.css';
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/index.ui';
import { useAuth } from '@/hooks/index.hooks';
import { logout } from '@/utils/index.utils';
import { Stethoscope, Calendar, Clipboard, LogOut } from 'lucide-react';


const VetDocPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Veterinario']);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
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
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2" size={16} />
                        Cerrar Sesión
                    </Button>
                </div>
            </header>
            <main className="container mx-auto mt-8 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <DashboardCard 
                        icon={<Calendar size={40} />}
                        title="Citas del Día"
                        description="Ver las citas programadas para hoy"
                    />
                    <DashboardCard 
                        icon={<Clipboard size={40} />}
                        title="Historial de Pacientes"
                        description="Acceder a los registros médicos de la mascota"
                    />
                    <DashboardCard 
                        icon={<Stethoscope size={40} />}
                        title="Actualizar Consulta o Servicio"
                        description="Actualizar una consulta al historial de la mascota"
                    />
                </div>
            </main>
        </div>
    );
};

interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default VetDocPage;
