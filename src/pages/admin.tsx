// import React from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/router';
// import { Button } from '@/components/ui/button';
// import { logout } from '@/utils/auth';


// BASE:

// const AdminPage: React.FC = () => {
//     const router = useRouter();

//     const { isAuthenticated, loading } = useAuth(['Administrador']);  // Solo admins pueden acceder

//     if (loading) {
//         return <p>Cargando...</p>;  // Mientras se verifica el rol, se muestra un mensaje de carga
//     }

//     if (!isAuthenticated) {
//         return <p>Acceso Denegado</p>;  // Si no tiene acceso, muestra un mensaje de denegación
//     }

//     const handleLogout = () => {
//         logout(router);  // Llamar la función de logout
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-4">
//             <header className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
//                 <Button onClick={handleLogout}>Cerrar Sesión</Button>
//             </header>
//             <main>
//                 <p>Welcome to the Admin Dashboard</p>
//             </main>
//         </div>
//     );
// };

// export default AdminPage;

// ***********************************************************************************
// ***********************************************************************************
// ***********************************************************************************

// CHAD GPT:

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import CreateClienteForm from '@/components/forms/CreateClienteForm';
import CreatePersonalForm from '@/components/forms/CreatePersonalForm';
import CreateMascotaForm from '@/components/forms/CreateMascotaForm';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/utils/auth';


const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);  

    const [modalContent, setModalContent] = useState<null | JSX.Element>(null);

    if (loading) return <p>Cargando...</p>;
    if (!isAuthenticated) return <p>Acceso Denegado</p>;

    const handleLogout = () => logout(router);
    const openForm = (formType: string) => {
        switch (formType) {
            case 'cliente':
                setModalContent(<CreateClienteForm />);
                break;
            case 'personal':
                setModalContent(<CreatePersonalForm />);
                break;
            case 'mascota':
                setModalContent(<CreateMascotaForm />);
                break;
            default:
                setModalContent(null);
        }
    };
            
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </header>
            <main>
                <div>
                    <Button onClick={() => openForm('cliente')}>Registrar Cliente</Button>
                    <Button onClick={() => openForm('personal')}>Registrar Personal</Button>
                    <Button onClick={() => openForm('mascota')}>Registrar Mascota</Button>
                </div>
                {modalContent && (
                    <div className="modal">
                        {modalContent}
                        <Button onClick={() => setModalContent(null)}>Cerrar</Button>
                    </div>
                )}
            </main>
        </div>
    );
};
                    
export default AdminPage;
                    
                    
// ***********************************************************************************
// ***********************************************************************************
// ***********************************************************************************
