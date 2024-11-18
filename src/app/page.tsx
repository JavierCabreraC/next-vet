'use client';
import React, { useState } from 'react';
import { ServiceCardProps } from '@/types/index.types';
import { PawPrint, Calendar, Stethoscope } from 'lucide-react';
import { Button, ChangePasswordForm, LoginForm } from '@/components/ui/index.ui';


const VetClinicWelcomePage: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">
                        <span className="flex items-center">
                            <PawPrint className="mr-2" />
                            Zoo-Life
                        </span>
                    </h1>
                    <nav>
                        <Button variant="outline" onClick={() => setShowLogin(true)} className="mr-2">Iniciar Sesión</Button>
                        <Button variant="outline" onClick={() => setShowChangePassword(true)} className="mr-2">Cambiar Contraseña</Button>
                    </nav>
                </div>
            </header>   
            <main className="container mx-auto mt-8 p-4 flex-grow">
                {showLogin && (
                    <LoginForm onClose={() => setShowLogin(false)} />
                )}
                {showChangePassword && (
                    <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
                )}
                {!showLogin && !showChangePassword && (
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Bienvenido a Zoo-Life</h2>
                        <p className="text-xl mb-8 text-gray-600">Cuidamos de sus mascotas como si fueran nuestras.</p>
                        
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
            <footer className="bg-blue-600 text-white mt-auto py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Clínica Veterinaria Zoo-Life. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default VetClinicWelcomePage;
