import { useState } from 'react';
import { ViewState } from '@/types/admin';
import { Users, PawPrint, Calendar, Briefcase, ChevronDown, FileText } from 'lucide-react';


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
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const menuItems: MenuSection[] = [
        {
            title: 'Usuarios',
            icon: <Users className="w-5 h-5" />,
            items: [
                { label: 'Registrar Personal', value: 'create-personal' },
                { label: 'Listar Personal', value: 'list-personal' },
                { label: 'Registrar Cliente', value: 'create-cliente' },
                { label: 'Listar Clientes', value: 'list-cliente' },
                { label: 'Usuarios Activos', value: 'list-usuarios-activos' },
                { label: 'Usuarios Inactivos', value: 'list-usuarios-inactivos' },
                { label: 'Ver Bitácora', value: 'list-logs' }
            ]
        },
        {
            title: 'Mascotas',
            icon: <PawPrint className="w-5 h-5" />,
            items: [
                { label: 'Gestionar Razas', value: 'list-raza' },
                { label: 'Registrar Mascota', value: 'create-mascota' },
                { label: 'Listar Mascotas', value: 'list-mascota' }
            ]
        },
        {
            title: 'Reservaciones',
            icon: <Calendar className="w-5 h-5" />,
            items: [
                { label: 'Listar Reservaciones', value: 'list-reservaciones' }
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
        },
        {
            title: 'Reportes',
            icon: <FileText className="w-5 h-5" />,
            items: [
                { label: 'Reporte de Bitácora', value: 'report-bitacora' }
            ]
        }
    ];

    // Manejar el click en una sección
    const handleSectionClick = (sectionTitle: string) => {
        setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
    };

    return (
        <aside className="w-64 bg-blue-800 text-white h-[calc(100vh-64px)]">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-6">Actividades</h2>
                <nav>
                    {menuItems.map((section) => (
                        <div key={section.title} className="mb-2">
                            <button
                                onClick={() => handleSectionClick(section.title)}
                                className={`flex items-center w-full px-2 py-2 rounded transition-colors hover:bg-blue-700/50 ${
                                    expandedSection === section.title ? 'bg-blue-700/50' : ''
                                }`}
                            >
                                {section.icon}
                                <span className="ml-2 font-semibold">{section.title}</span>
                                <ChevronDown 
                                    className={`ml-auto w-4 h-4 transition-transform ${
                                        expandedSection === section.title ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            
                            {/* Elementos de la sección */}
                            <div
                                className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                                    expandedSection === section.title 
                                        ? 'max-h-96 opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                {section.items.map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setCurrentView(item.value)}
                                        className={`w-full text-left px-9 py-2 rounded transition-colors ${
                                            currentView === item.value
                                                ? 'bg-blue-700 text-white'
                                                : 'hover:bg-blue-700/50 text-gray-300'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
