import '@/app/globals.css';
import React from 'react';
import { logout } from '@/utils/index.utils';
import { Personal } from '@/types/index.types';
import { useRouter } from 'next/router';
import { AdminActions, AdminCards, AdminHeader, 
    renderForm, renderModal, ResponseModal, UpdateModal } from '@/components/admin/index.admincomp';
import { useAdminForms, useAdminModals, useAdminUpdates, useAuth } from '@/hooks/index.hooks';


const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);

    const {
        personalForm, setPersonalForm,
        clienteForm, setClienteForm,
        mascotaForm, setMascotaForm,
        responseModal, setResponseModal, handleSubmit
    } = useAdminForms();

    const {
        showPersonalForm, setShowPersonalForm,
        showClienteForm, setShowClienteForm,
        showMascotaForm, setShowMascotaForm,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        showBitacoraModal, setShowBitacoraModal,
        personalList, clienteList, mascotaList, bitacoraList,
        currentPage, setCurrentPage, itemsPerPage, handleViewList
    } = useAdminModals();

    const {
        showUpdateModal, setShowUpdateModal,
        updateType, updateForm, setUpdateForm,
        handleUpdate, handleEdit
    } = useAdminUpdates({
        setShowPersonalModal,
        setShowClienteModal,
        setShowMascotaModal
    });

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
            {showPersonalModal && renderModal<Personal>({
                title: "Lista de Personal",
                data: personalList,
                onClose: () => setShowPersonalModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (record) => handleEdit(record, 'personal')
            })}
            {showClienteModal && renderModal({
                title: "Lista de Clientes",
                data: clienteList,
                onClose: () => setShowClienteModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (record) => handleEdit(record, 'cliente')
            })}
            {showMascotaModal && renderModal({
                title: "Lista de Mascotas",
                data: mascotaList,
                onClose: () => setShowMascotaModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (record) => handleEdit(record, 'mascota')
            })}
            {showBitacoraModal && renderModal({
                title: "Registros de Bitácora",
                data: bitacoraList,
                onClose: () => setShowBitacoraModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
            })}
            <UpdateModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                type={updateType}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                onSubmit={handleUpdate}
                setShowPersonalModal={setShowPersonalModal}
                setShowClienteModal={setShowClienteModal}
                setShowMascotaModal={setShowMascotaModal}
            />
            <ResponseModal 
                isOpen={responseModal.isOpen}
                onClose={() => setResponseModal(prev => ({ ...prev, isOpen: false }))}
                response={responseModal.response}
                title={responseModal.title}
            />
        </div>
    );
};

export default AdminPage;
