'use client';

// import React, { useState } from 'react';
// import { Button } from '../components/ui/button';
// import LoginForm from '../components/ui/LoginForm';
// import ChangePasswordForm from '../components/ui/ChangePassword';



// const VetClinicWelcomePage: React.FC = () => {
//     const [showLogin, setShowLogin] = useState(false);
//     const [showChangePassword, setShowChangePassword] = useState(false);

//     return (
//         <div className="min-h-screen bg-gray-100 p-4">
//             <header className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold text-blue-600">Clínica Veterinaria Zoo-Life</h1>
//                 <div>
//                     <Button onClick={() => setShowLogin(true)} className="mr-2">Iniciar Sesión</Button>
//                     <Button onClick={() => setShowChangePassword(true)}>Cambiar Contraseña</Button>
//                 </div>
//             </header>   
//             <main>
//                 {showLogin && (
//                     <LoginForm onClose={() => setShowLogin(false)} />
//                 )}
//                 {showChangePassword && (
//                     <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
//                 )}
//                 {!showLogin && !showChangePassword && (
//                     <div className="text-center">
//                         <h2 className="text-2xl font-semibold mb-4">Bienvenido a la Página Genérica y sin vida de Zoo-Life</h2>
//                         <p className="mb-4">¡Proveemos de la mejor atención a sus bolas de pelos!</p>
//                         <p className="mb-4">Recuerde, todas las mascotas van al cielo</p>
//                         <p className="mb-4">Cualquier queja con Rodrigo</p>
//                         <Button onClick={() => setShowLogin(true)}>Servicios Ofertados</Button>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default VetClinicWelcomePage;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/ui/LoginForm';
import ChangePasswordForm from '@/components/ui/ChangePassword';
import { PawPrint, Calendar, Stethoscope } from 'lucide-react';

const VetClinicWelcomePage: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">
                        <span className="flex items-center">
                            <PawPrint className="mr-2" />
                            Zoo-Life
                        </span>
                    </h1>
                    <nav>
                        <Button variant="ghost" onClick={() => setShowLogin(true)} className="mr-2">Iniciar Sesión</Button>
                        <Button variant="outline" onClick={() => setShowChangePassword(true)}>Cambiar Contraseña</Button>
                    </nav>
                </div>
            </header>   
            <main className="container mx-auto mt-8 p-4">
                {showLogin && (
                    <LoginForm onClose={() => setShowLogin(false)} />
                )}
                {showChangePassword && (
                    <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
                )}
                {!showLogin && !showChangePassword && (
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Bienvenido a Zoo-Life</h2>
                        <p className="text-xl mb-8 text-gray-600">Cuidamos de sus mascotas como si fueran nuestras, lo que sea para pasar la materia</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <ServiceCard 
                                icon={<Stethoscope size={40} />}
                                title="Atención Veterinaria"
                                description="Consultas y tratamientos especializados para todo tipo de mascotas"
                            />
                            <ServiceCard 
                                icon={<Calendar size={40} />}
                                title="Citas Online"
                                description="Reserve su cita de forma rápida y sencilla a través de nuestra plataforma"
                            />
                            <ServiceCard 
                                icon={<PawPrint size={40} />}
                                title="Cuidados Especiales"
                                description="Servicios de peluquería, spa y cuidados especiales para su mascota"
                            />
                        </div>
                        
                        <Button size="lg" onClick={() => setShowLogin(true)}>
                            Ver Todos los Servicios
                        </Button>
                    </div>
                )}
            </main>
            <footer className="bg-blue-600 text-white mt-12 py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Clínica Veterinaria Zoo-Life. Todos los derechos reservados, hasta pasar la materia.</p>
                </div>
            </footer>
        </div>
    );
};

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default VetClinicWelcomePage;
