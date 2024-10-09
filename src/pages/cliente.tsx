import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
// import { logout } from '@/utils/auth';



const ClientePage: React.FC = () => {
    const router = useRouter();

    const { isAuthenticated, loading } = useAuth(['Cliente']);

    if (loading) {
        return <p>Cargando...</p>;  // Mientras se verifica el rol, muestra un mensaje de carga.
    }

    if (!isAuthenticated) {
        return <p>Acceso Denegado</p>;  // Si no está autenticado o no tiene el rol adecuado, bloquea el acceso.
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">Client Dashboard</h1>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </header>
            <main>
                <p>Welcome to the Client Dashboard</p>
            </main>
        </div>
    );
};

export default ClientePage;
