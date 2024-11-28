"use client";
import React, { useState } from 'react';
import { ServiceCardProps } from '@/types/index.types';
import { PawPrint, Calendar, Stethoscope } from 'lucide-react';
import { Button, ChangePasswordForm, LoginForm } from '@/components/ui/index.ui';


// *************************************************************************************
// VERSIÓN ORIGINAL:
// *************************************************************************************


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
                                title="Gestionar Usuario"
                                description="Consultas y tratamientos especializados para todo tipo de mascotas"
                                items={["Iniciar Sesion", "Cerrar Sesion", "Gestionar Personal","Gestionar Rol", "Gestionar Cliente", "Cambiar Contraseña"
                                    , "Gestionar bitacora","Editar Perfil de Usuario"
                                ]}
                                />
                            <ServiceCard 
                                icon={<Calendar size={40} />}
                                title="Reservacion"
                                description="Reserve su cita de forma rápida y sencilla a través de nuestra plataforma"
                                items={["Gestionar Horario", "Gestionar Reservacion"]}
                                />
                            <ServiceCard 
                                icon={<PawPrint size={40} />}
                                title="Servicio"
                                description="Servicios de peluquería, spa y cuidados especiales para su mascota"
                                items={["Peluqueria", "Consulta Medica", "Internacion","Cirujia"]}
                                />
                             <ServiceCard 
                                icon={<PawPrint size={40} />}
                                title="Gestionar Mascota"
                                description="Servicios de peluquería, spa y cuidados especiales para su mascota"
                                items={["Gestionar Mascota", "Reguistro de vacunacion", "Gestionar receta","Gestionar Analisis", "Historia Clinico"]}
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

const ServiceCard: React.FC<ServiceCardProps & { items?: string[] }> = ({ icon, title, description, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleList = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div 
        className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
        onClick={toggleList} // Al hacer clic, se alterna el despliegue de la lista
        >
            <div className="text-blue-500 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
            
            {/* Renderizar la lista si isOpen es verdadero */}
            {isOpen && items && (
                <ul className="mt-4 text-left">
                    {items.map((item, index) => (
                        <li key={index} className="text-gray-500 list-disc list-inside">{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VetClinicWelcomePage;



// *************************************************************************************
// VERSIÓN NUEVA:
// *************************************************************************************


// import { motion } from 'framer-motion';
// import React, { useState, useEffect } from 'react';
// import { LoginForm } from '@/components/ui/index.ui';
// import { PawPrint, Stethoscope, Calendar, ChevronDown, ArrowRight } from 'lucide-react';


// export default function ModernVetClinic() {
// //   const [activeSection, setActiveSection] = useState('home');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       {/* Header Moderno */}
//       <header className={`fixed w-full transition-all duration-300 ${
//         isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
//       }`}>
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <PawPrint className="h-8 w-8 text-blue-600" />
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//               Zoo-Life
//             </span>
//           </div>
//           <nav className="hidden md:flex space-x-6">
//             {['Inicio', 'Servicios', 'Reservas', 'Contacto'].map(item => (
//               <button key={item} className="text-gray-600 hover:text-blue-600 transition-colors">
//                 {item}
//               </button>
//             ))}
//           </nav>
//           <div className="flex space-x-3">
//     {!showLogin ? (
//         <button 
//             onClick={() => setShowLogin(true)} 
//             className="px-4 py-2 text-sm rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
//         >
//             Iniciar Sesión
//         </button>
//     ) : (
//         <LoginForm onClose={() => setShowLogin(false)} />
//     )}
// </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//               Cuidado Experto para Tu Mascota
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//               Brindamos atención veterinaria de calidad con tecnología avanzada y un equipo profesional dedicado al bienestar de tu mascota.
//             </p>
//             <div className="flex flex-col md:flex-row gap-4 justify-center">
//               <button className="px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center">
//                 Agendar Cita <ArrowRight className="ml-2 h-4 w-4" />
//               </button>
//               <button className="px-8 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
//                 Conocer Servicios
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Servicios Grid */}
//       <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { icon: <Stethoscope className="h-8 w-8" />, title: "Consultas Médicas" },
//               { icon: <PawPrint className="h-8 w-8" />, title: "Peluquería" },
//               { icon: <Calendar className="h-8 w-8" />, title: "Vacunación" },
//             ].map((service, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ y: -5 }}
//                 className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mb-4">
//                   {service.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//                 <p className="text-gray-600">Servicio profesional con atención personalizada para el cuidado de tu mascota.</p>
//                 <button className="mt-4 text-blue-600 hover:text-blue-700 flex items-center">
//                   Más información <ChevronDown className="ml-1 h-4 w-4" />
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer Moderno */}
//       <footer className="bg-blue-900 text-white py-12">
//         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <PawPrint className="h-6 w-6" />
//               <span className="text-xl font-bold">Zoo-Life</span>
//             </div>
//             <p className="text-blue-200">Cuidando a tus mascotas como parte de nuestra familia desde 2024.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
//             <nav className="flex flex-col space-y-2">
//               {['Servicios', 'Reservas', 'Emergencias', 'Contacto'].map(item => (
//                 <a key={item} href="#" className="text-blue-200 hover:text-white transition-colors">
//                   {item}
//                 </a>
//               ))}
//             </nav>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-4">Contacto</h4>
//             <div className="text-blue-200 space-y-2">
//               <p>Tel: (591) 123-456789</p>
//               <p>Email: info@zoo-life.com</p>
//               <p>Dirección: Av. Principal #123</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
