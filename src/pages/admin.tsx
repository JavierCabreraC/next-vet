import '@/app/globals.css';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/auth';
import { AdminActions, AdminCards, AdminHeader, renderForm, renderModal } from '@/components/admin/index.admincomp';
import { useAdminForms, useAdminModals } from '@/hooks/index.auth';



const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);
    const { 
        personalForm, setPersonalForm, clienteForm, setClienteForm, 
        mascotaForm, setMascotaForm, handleSubmit 
    } = useAdminForms();
    const {
        showPersonalForm, setShowPersonalForm,
        showClienteForm, setShowClienteForm,
        showMascotaForm, setShowMascotaForm,
        personalList, clienteList, mascotaList,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        currentPage, setCurrentPage, itemsPerPage,
        handleViewList
    } = useAdminModals();

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
            <AdminHeader onLogout={handleLogout} />
            <main className="container mx-auto mt-8 p-4">
                <AdminCards 
                    onShowPersonalForm={() => setShowPersonalForm(true)}
                    onShowClienteForm={() => setShowClienteForm(true)}
                    onShowMascotaForm={() => setShowMascotaForm(true)}
                />
                <AdminActions onViewList={handleViewList} />
            </main>
            {showPersonalForm && renderForm({
                title: "Registrar Personal",
                form: personalForm,
                setForm: setPersonalForm,
                onClose: () => setShowPersonalForm(false),
                handleSubmit
            })}
            {showClienteForm && renderForm({
                title: "Registrar Cliente",
                form: clienteForm,
                setForm: setClienteForm,
                onClose: () => setShowClienteForm(false),
                handleSubmit
            })}
            {showMascotaForm && renderForm({
                title: "Registrar Mascota",
                form: mascotaForm,
                setForm: setMascotaForm,
                onClose: () => setShowMascotaForm(false),
                handleSubmit
            })}
            {showPersonalModal && renderModal({
                title: "Lista de Personal",
                data: personalList,
                onClose: () => setShowPersonalModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
            })}
            {showClienteModal && renderModal({
                title: "Lista de Clientes",
                data: clienteList,
                onClose: () => setShowClienteModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
            })}
            {showMascotaModal && renderModal({
                title: "Lista de Mascotas",
                data: mascotaList,
                onClose: () => setShowMascotaModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
            })}
        </div>
    );
};

export default AdminPage;
