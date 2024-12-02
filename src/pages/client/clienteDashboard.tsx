import '@/app/globals.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { logout, useAuth } from '@/hooks/index.hooks';
import { ViewStateCliente } from '@/types/index.types';
import { AdminLayout, ClientSection } from '@/components/client/index.clientcomp';


const ClienteDashboard = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Cliente']);
    const [currentView, setCurrentView] = useState<ViewStateCliente | null>(null);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    const renderContent = () => {
        if (!currentView) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold mb-4">Bienvenido a su Portal Personal</h1>
                    <p className="text-gray-600">Seleccione una opción del menú de la barra lateral para comenzar</p>
                </div>
            );
        }

        return <ClientSection view={currentView} />;
    };

    return (
        <AdminLayout 
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={handleLogout}
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default ClienteDashboard;
