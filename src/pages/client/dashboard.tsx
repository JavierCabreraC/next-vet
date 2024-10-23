import '@/app/globals.css';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/index.hooks';
import { logout } from '@/utils/index.utils';
import { MascotasList } from '@/components/client/index.clientcomp';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { PawPrint, Calendar, ClipboardList, LogOut } from 'lucide-react';


interface Mascota {
    ID: number;
    Nombre: string;
    Sexo: string;
    Fecha_De_Nacimiento: string;
    Años: string;
    Meses: string;
    Especie: string;
    Raza: string;
}

const ClientePage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Cliente']);
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [showMascotas, setShowMascotas] = useState(false);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    const handleMisMascotasClick = async () => {
        try {
            const data = await ApiService.fetch<Mascota[]>(`${API_CONFIG.ENDPOINTS.CLI_MASCOTAS}`, {
                method: 'GET',
            });
            setMascotas(data);
            setShowMascotas(true);
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
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
                    <button 
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center" 
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2" size={16} />
                        Cerrar Sesión
                    </button>
                </div>
            </header>
            <main className="container mx-auto mt-8 p-4">
                {!showMascotas ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <DashboardCard 
                            icon={<PawPrint size={40} />}
                            title="Mis Mascotas"
                            description="Ver información y historial de tus mascotas - New Route"
                            onClick={handleMisMascotasClick}
                        />
                        <DashboardCard 
                            icon={<Calendar size={40} />}
                            title="Agendar Cita"
                            description="Programa una nueva reservación para un servicio - New Route"
                        />
                        <DashboardCard 
                            icon={<ClipboardList size={40} />}
                            title="Historial de Visitas"
                            description="Revisa el historial de visitas y tratamientos - New Route"
                        />
                    </div>
                ) : (
                    <div>
                        <button 
                            onClick={() => setShowMascotas(false)} 
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Volver
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Mis Mascotas</h2>
                        <MascotasList mascotas={mascotas} />
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
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer" onClick={onClick}>
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default ClientePage;
