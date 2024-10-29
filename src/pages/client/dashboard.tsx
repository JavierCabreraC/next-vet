import '@/app/globals.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { logout } from '@/utils/index.utils';
import { useAuth } from '@/hooks/index.hooks';
import { MascotaCli } from '@/types/index.types';
import { PawPrint, Calendar, ClipboardList } from 'lucide-react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { ClientHeader, MascotasList, ReservationForm } from '@/components/client/index.clientcomp';


const ClientePage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Cliente']);
    const [mascotas, setMascotas] = useState<MascotaCli[]>([]);
    const [showMascotas, setShowMascotas] = useState(false);
    const [showReservationForm, setShowReservationForm] = useState(false);

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
            const data = await ApiService.fetch<MascotaCli[]>(`${API_CONFIG.ENDPOINTS.CLI_MASCOTAS}`, {
                method: 'GET',
            });
            setMascotas(data);
            setShowMascotas(true);
            setShowReservationForm(false); // Ocultar formulario si estaba visible
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
        }
    };

    const handleReservationSuccess = () => {
        setShowReservationForm(false);
        // Aquí podrías mostrar un mensaje de éxito o redirigir
        alert('Reservación realizada con éxito');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <ClientHeader onLogout={handleLogout} />
            <main className="container mx-auto mt-8 p-4">
                {!showMascotas && !showReservationForm ? (
                    // Vista inicial con las cards
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <DashboardCard 
                            icon={<PawPrint size={40} />}
                            title="Mis Mascotas"
                            description="Ver información y historial de tus mascotas"
                            onClick={handleMisMascotasClick}
                        />
                        <DashboardCard 
                            icon={<Calendar size={40} />}
                            title="Agendar Cita"
                            description="Programa una nueva reservación para un servicio"
                            onClick={() => setShowReservationForm(true)}
                        />
                        <DashboardCard 
                            icon={<ClipboardList size={40} />}
                            title="Historial de Visitas"
                            description="Revisa el historial de visitas y tratamientos"
                            // onClick={handleHistorialClick} // Para futura implementación
                        />
                    </div>
                ) : showMascotas ? (
                    // Vista de mascotas
                    <div>
                        <button 
                            onClick={() => {
                                setShowMascotas(false);
                                setShowReservationForm(false);
                            }} 
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Volver
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Mis Mascotas</h2>
                        <MascotasList mascotas={mascotas} />
                    </div>
                ) : (
                    // Vista del formulario de reservación
                    <div>
                        <button 
                            onClick={() => setShowReservationForm(false)} 
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Volver
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Agendar Nueva Cita</h2>
                        <ReservationForm
                            onSuccess={handleReservationSuccess}
                            onCancel={() => setShowReservationForm(false)}
                        />
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
