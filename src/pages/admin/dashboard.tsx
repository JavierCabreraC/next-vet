// import '@/app/globals.css';
// import React from 'react';
// import { useRouter } from 'next/router';
// import { logout } from '@/utils/index.utils';
// import { Personal } from '@/types/index.types';
// import { AdminActions, AdminCards, AdminHeader, 
//     renderForm, renderModal, ResponseModal, UpdateModal } from '@/components/admin/index.admincomp';
// import { useAdminForms, useAdminModals, useAdminUpdates, useAuth } from '@/hooks/index.hooks';


// const AdminPage: React.FC = () => {
//     const router = useRouter();
//     const { isAuthenticated, loading } = useAuth(['Administrador']);

//     const {
//         personalForm, setPersonalForm,
//         clienteForm, setClienteForm,
//         mascotaForm, setMascotaForm,
//         responseModal, setResponseModal, handleSubmit
//     } = useAdminForms();

//     const {
//         showPersonalForm, setShowPersonalForm,
//         showClienteForm, setShowClienteForm,
//         showMascotaForm, setShowMascotaForm,
//         showPersonalModal, setShowPersonalModal,
//         showClienteModal, setShowClienteModal,
//         showMascotaModal, setShowMascotaModal,
//         showBitacoraModal, setShowBitacoraModal,
//         showReservacionModal, setShowReservacionModal,
//         showUsuarioModal, setShowUsuarioModal,
//         personalList, clienteList, mascotaList, bitacoraList, reservacionList, usuarioList,
//         currentPage, setCurrentPage, itemsPerPage, handleViewList
//     } = useAdminModals();

//     const {
//         showUpdateModal, setShowUpdateModal,
//         updateType, updateForm, setUpdateForm,
//         handleUpdate, handleEdit
//     } = useAdminUpdates({
//         setShowPersonalModal,
//         setShowClienteModal,
//         setShowMascotaModal,
//         setShowUsuarioModal,
//         setShowReservacionModal,
//         handleViewList
//     });

//     if (loading) {
//         return <div className="flex justify-center items-center h-screen">Cargando...</div>;
//     }
//     if (!isAuthenticated) {
//         return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
//     }
//     const handleLogout = () => {
//         logout(router);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
//             <AdminHeader onLogout={handleLogout} />
//             <main className="container mx-auto mt-8 p-4">
//                 <AdminCards 
//                     onShowPersonalForm={() => setShowPersonalForm(true)}
//                     onShowClienteForm={() => setShowClienteForm(true)}
//                     onShowMascotaForm={() => setShowMascotaForm(true)}
//                 />
//                 <AdminActions onViewList={handleViewList} />
//             </main>
//             {showPersonalForm && renderForm({
//                 title: "Registrar Personal",
//                 form: personalForm,
//                 setForm: setPersonalForm,
//                 onClose: () => setShowPersonalForm(false),
//                 handleSubmit
//             })}
//             {showClienteForm && renderForm({
//                 title: "Registrar Cliente",
//                 form: clienteForm,
//                 setForm: setClienteForm,
//                 onClose: () => setShowClienteForm(false),
//                 handleSubmit
//             })}
//             {showMascotaForm && renderForm({
//                 title: "Registrar Mascota",
//                 form: mascotaForm,
//                 setForm: setMascotaForm,
//                 onClose: () => setShowMascotaForm(false),
//                 handleSubmit
//             })}
//             {showPersonalModal && renderModal<Personal>({
//                 title: "Lista de Personal",
//                 data: personalList,
//                 onClose: () => setShowPersonalModal(false),
//                 currentPage,
//                 setCurrentPage,
//                 itemsPerPage,
//                 onEdit: (record) => handleEdit(record, 'personal')
//             })}
//             {showClienteModal && renderModal({
//                 title: "Lista de Clientes",
//                 data: clienteList,
//                 onClose: () => setShowClienteModal(false),
//                 currentPage,
//                 setCurrentPage,
//                 itemsPerPage,
//                 onEdit: (record) => handleEdit(record, 'cliente')
//             })}
//             {showMascotaModal && renderModal({
//                 title: "Lista de Mascotas",
//                 data: mascotaList,
//                 onClose: () => setShowMascotaModal(false),
//                 currentPage,
//                 setCurrentPage,
//                 itemsPerPage,
//                 onEdit: (record) => handleEdit(record, 'mascota')
//             })}
//             {showBitacoraModal && renderModal({
//                 title: "Registros de Bitácora",
//                 data: bitacoraList,
//                 onClose: () => setShowBitacoraModal(false),
//                 currentPage,
//                 setCurrentPage,
//                 itemsPerPage
//             })}
//             {showReservacionModal && renderModal({
//                 title: "Lista de Reservaciones",
//                 data: reservacionList,
//                 onClose: () => setShowReservacionModal(false),
//                 currentPage,
//                 setCurrentPage,
//                 itemsPerPage,
//                 onEdit: (record) => handleEdit(record, 'reservacion')
//             })}
//             {showUsuarioModal && renderModal({
//                 title: "Lista de Usuarios",
//                 data: usuarioList,
//                 onClose: () => setShowUsuarioModal(false),
//                 currentPage,
//                 setCurrentPage,
//                 itemsPerPage,
//                 onEdit: (record) => handleEdit(record, 'usuario')
//             })}
//             <UpdateModal
//                 isOpen={showUpdateModal}
//                 onClose={() => setShowUpdateModal(false)}
//                 type={updateType}
//                 updateForm={updateForm}
//                 setUpdateForm={setUpdateForm}
//                 onSubmit={handleUpdate}
//                 setShowPersonalModal={setShowPersonalModal}
//                 setShowClienteModal={setShowClienteModal}
//                 setShowMascotaModal={setShowMascotaModal}
//             />
//             <ResponseModal 
//                 isOpen={responseModal.isOpen}
//                 onClose={() => setResponseModal(prev => ({ ...prev, isOpen: false }))}
//                 response={responseModal.response}
//                 title={responseModal.title}
//             />
//         </div>
//     );
// };

// export default AdminPage;


// src/pages/admin/dashboard.tsx
import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { 
    UserSection,
    // PetSection, 
    // ReservationSection,
    // ServiceSection 
} from '@/components/admin/sections/UserSection';
import { logout } from '@/utils/index.utils';

// Tipo para las diferentes vistas
type ViewState = 
    // Usuarios
    | 'create-staff' | 'list-staff' 
    | 'create-client' | 'list-client'
    | 'list-active-users' | 'list-inactive-users'
    | 'list-logs'
    // Mascotas
    | 'manage-breeds' | 'create-pet' | 'list-pets'
    // Reservaciones
    | 'list-reservations'
    // Servicios
    | 'list-completed-services' | 'create-receipt' | 'list-receipts';

const AdminDashboard = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);
    const [currentView, setCurrentView] = useState<ViewState | null>(null);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }
    if (!isAuthenticated) {
        return <div className="flex justify-center items-center h-screen">Acceso Denegado</div>;
    }

    const handleLogout = () => {
        logout(router);
    };

    // Renderiza el contenido según la vista seleccionada
    const renderContent = () => {
        if (!currentView) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel de Administración</h1>
                    <p className="text-gray-600">Seleccione una opción del menú para comenzar</p>
                </div>
            );
        }

        // Sección de Usuarios
        if (currentView.includes('staff') || currentView.includes('client') || 
            currentView.includes('users') || currentView === 'list-logs') {
            return <UserSection view={currentView} />;
        }

        // // Sección de Mascotas
        // if (currentView.includes('pet') || currentView.includes('breeds')) {
        //     return <PetSection view={currentView} />;
        // }

        // // Sección de Reservaciones
        // if (currentView.includes('reservations')) {
        //     return <ReservationSection view={currentView} />;
        // }

        // // Sección de Servicios
        // if (currentView.includes('services') || currentView.includes('receipt')) {
        //     return <ServiceSection view={currentView} />;
        // }
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

export default AdminDashboard;
