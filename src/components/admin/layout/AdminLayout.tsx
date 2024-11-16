import { Sidebar } from './Sidebar';
import { ViewState } from '@/types/admin';
import { AdminHeader } from '../view/Header';


interface AdminLayoutProps {
    children: React.ReactNode;
    currentView: ViewState | null;
    setCurrentView: (view: ViewState | null) => void;
    onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    currentView,
    setCurrentView,
    onLogout
}) => {
    return (
        <div className="min-h-screen flex">
            <Sidebar 
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
            
            <div className="flex-1 flex flex-col">
                <AdminHeader onLogout={onLogout} />
                <main className="flex-1 bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
