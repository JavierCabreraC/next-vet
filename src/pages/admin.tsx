import '@/app/globals.css';
import React from 'react';
import ResponseModal from '@/components/ResponseModal';
import { useRouter } from 'next/router';
import { logout } from '@/utils/auth';
import { AdminActions, AdminCards, AdminHeader, 
    renderForm, renderModal, UpdateModal } from '@/components/admin/index.admincomp';
import { useAdminForms, useAdminModals, useAdminUpdates, useAuth } from '@/hooks/index.auth';
import { Cliente, Mascota, Personal, UpdateType } from '@/types/index.types';


const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);
    const {
        personalForm, setPersonalForm, clienteForm, setClienteForm, 
        mascotaForm, setMascotaForm, handleSubmit, responseModal, setResponseModal 
    } = useAdminForms();
    const {
        showPersonalForm, setShowPersonalForm,
        showClienteForm, setShowClienteForm,
        showMascotaForm, setShowMascotaForm,
        personalList, clienteList, mascotaList, bitacoraList,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        showBitacoraModal, setShowBitacoraModal,
        currentPage, setCurrentPage, itemsPerPage,
        handleViewList
    } = useAdminModals();

    const {
        showUpdateModal, setShowUpdateModal,
        updateType, setUpdateType,
        currentItem, setCurrentItem,
        updateForm, setUpdateForm,
        handleUpdate
    } = useAdminUpdates();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    const handleEdit = (record: Personal | Cliente | Mascota, type: UpdateType) => {
        setCurrentItem({ [type]: record });
        setUpdateType(type);
        setShowUpdateModal(true);
        
        switch (type) {
            case 'personal':
                setUpdateForm({
                    ...updateForm,
                    personalUpdate: { PersonalID: (record as Personal).PersonalID }
                });
                break;
            case 'cliente':
                setUpdateForm({
                    ...updateForm,
                    clienteUpdate: { ClienteID: (record as Cliente).ClienteID }
                });
                break;
            case 'mascota':
                setUpdateForm({
                    ...updateForm,
                    mascotaUpdate: { MascotaID: (record as Mascota).MascotaID }
                });
                break;
        }
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
                onEdit: (item) => handleEdit(item, 'cliente')
            })}
            {showMascotaModal && renderModal({
                title: "Lista de Mascotas",
                data: mascotaList,
                onClose: () => setShowMascotaModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage,
                onEdit: (item) => handleEdit(item, 'mascota')
            })}
            {showBitacoraModal && renderModal({
                title: "Registros de Bitácora",
                data: bitacoraList,
                onClose: () => setShowBitacoraModal(false),
                currentPage,
                setCurrentPage,
                itemsPerPage
                // onEdit: (item) => handleEdit(item, 'bitacora')
            })}
            <UpdateModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                type={updateType}
                currentItem={currentItem}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                onSubmit={handleUpdate}
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
