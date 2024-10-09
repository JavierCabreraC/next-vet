import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
// import { logout } from '@/utils/auth';



const AdminPage: React.FC = () => {
    const router = useRouter();

    // const handleLogout = () => {
    //     logout(router);  // Llamar la función de logout
    // };

    const { isAuthenticated, loading } = useAuth(['Veterinario']);  // Solo veterinarios pueden acceder

    if (loading) {
        return <p>Cargando...</p>;  // Mientras se verifica el rol, se muestra un mensaje de carga
    }

    if (!isAuthenticated) {
        return <p>Acceso Denegado</p>;  // Si no tiene acceso, muestra un mensaje de denegación
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </header>
            <main>
                <p>Welcome to the Admin Dashboard</p>
            </main>
        </div>
    );
};

export default AdminPage;
