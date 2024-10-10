import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/auth';
import { PawPrint, Calendar, ClipboardList, LogOut } from 'lucide-react';



const ClientePage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Cliente']);

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
                            <PawPrint className="mr-2" />
                            Portal del Cliente
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
                        icon={<PawPrint size={40} />}
                        title="Mis Mascotas"
                        description="Ver información y historial de tus mascotas"
                    />
                    <DashboardCard 
                        icon={<Calendar size={40} />}
                        title="Agendar Cita"
                        description="Programa una nueva reservación para un servicio"
                    />
                    <DashboardCard 
                        icon={<ClipboardList size={40} />}
                        title="Historial de Visitas"
                        description="Revisa el historial de visitas y tratamientos"
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

export default ClientePage;
