import React from 'react';
import { Button } from '@/components/ui/index.ui';
import { ClipboardList, LogOut } from 'lucide-react';
import { AdminHeaderProps } from '@/types/index.types';


export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-600">
                    <span className="flex items-center">
                        <ClipboardList className="mr-2" />
                        Panel de Administración - From New Route
                    </span>
                </h1>
                <Button variant="outline" onClick={onLogout}>
                    <LogOut className="mr-2" size={16} />
                    Cerrar Sesión
                </Button>
            </div>
        </header>
    );
};
