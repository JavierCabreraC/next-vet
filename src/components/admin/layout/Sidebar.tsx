import { ViewState } from '@/types/admin';
import { Users, PawPrint, Calendar, Briefcase } from 'lucide-react';


interface SidebarProps {
    currentView: ViewState | null;
    setCurrentView: (view: ViewState | null) => void;
}

interface MenuItem {
    label: string;
    value: ViewState;
}

interface MenuSection {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    const menuItems: MenuSection[] = [
        {
            title: 'Usuarios',
            icon: <Users className="w-5 h-5" />,
            items: [
                { label: 'Crear Personal', value: 'create-personal' },
                { label: 'Listar Personal', value: 'list-personal' },
                { label: 'Crear Cliente', value: 'create-cliente' },
                { label: 'Listar Clientes', value: 'list-cliente' },
                { label: 'Usuarios Activos', value: 'list-active-users' },
                { label: 'Usuarios Inactivos', value: 'list-inactive-users' },
                { label: 'Ver Bitácora', value: 'list-logs' }
            ]
        },
        {
            title: 'Mascotas',
            icon: <PawPrint className="w-5 h-5" />,
            items: [
                { label: 'Gestionar Razas', value: 'list-raza' },
                { label: 'Crear Mascota', value: 'create-mascota' },
                { label: 'Listar Mascotas', value: 'list-mascota' }
            ]
        },
        {
            title: 'Reservaciones',
            icon: <Calendar className="w-5 h-5" />,
            items: [
                { label: 'Listar Reservaciones', value: 'list-reservations' }
            ]
        },
        {
            title: 'Servicios',
            icon: <Briefcase className="w-5 h-5" />,
            items: [
                { label: 'Servicios Completados', value: 'list-completed-services' },
                { label: 'Crear Recibo', value: 'create-receipt' },
                { label: 'Listar Recibos', value: 'list-receipts' }
            ]
        }
    ];

    return (
        <aside className="w-64 bg-blue-800 text-white min-h-screen">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-6">Actividades</h2>
                <nav>
                    {menuItems.map((section) => (
                        <div key={section.title} className="mb-6">
                            <div className="flex items-center mb-2 text-gray-300">
                                {section.icon}
                                <span className="ml-2 font-semibold">{section.title}</span>
                            </div>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.value}>
                                        <button
                                            onClick={() => setCurrentView(item.value)}
                                            className={`w-full text-left px-4 py-2 rounded transition-colors ${
                                                currentView === item.value
                                                    ? 'bg-blue-700 text-white'
                                                    : 'hover:bg-blue-700/50'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
