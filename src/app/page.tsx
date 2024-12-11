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

// "use client";
// import React, { useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Button, Card, Input } from '@/components/ui/index.ui';
// import { PawPrint, Calendar, Stethoscope, ChevronRight, User, Heart, X } from 'lucide-react';


// interface ServiceItem {
//   title: string;
//   icon: React.ReactNode;
//   description: string;
//   items: string[];
// }

// const services: ServiceItem[] = [
//   {
//     title: "Gestionar Usuario",
//     icon: <Stethoscope className="w-6 h-6 text-blue-600" />,
//     description: "Consultas y tratamientos especializados para todo tipo de mascotas",
//     items: [
//       "Iniciar Sesion",
//       "Cerrar Sesion",
//       "Gestionar Personal",
//       "Gestionar Rol",
//       "Gestionar Cliente",
//       "Cambiar Contraseña",
//       "Gestionar bitacora",
//       "Editar Perfil de Usuario"
//     ]
//   },
//   {
//     title: "Reservacion",
//     icon: <Calendar className="w-6 h-6 text-blue-600" />,
//     description: "Reserve su cita de forma rápida y sencilla a través de nuestra plataforma",
//     items: [
//       "Gestionar Horario",
//       "Gestionar Reservacion"
//     ]
//   },
//   {
//     title: "Servicio",
//     icon: <PawPrint className="w-6 h-6 text-blue-600" />,
//     description: "Servicios de peluquería, spa y cuidados especiales para su mascota",
//     items: [
//       "Peluqueria",
//       "Consulta Medica",
//       "Internacion",
//       "Cirujia"
//     ]
//   },
//   {
//     title: "Gestionar Mascota",
//     icon: <PawPrint className="w-6 h-6 text-blue-600" />,
//     description: "Servicios de peluquería, spa y cuidados especiales para su mascota",
//     items: [
//       "Gestionar Mascota",
//       "Reguistro de vacunacion",
//       "Gestionar receta",
//       "Gestionar Analisis",
//       "Historia Clinico"
//     ]
//   }
// ];

// const ModernVetClinicPage: React.FC = () => {
//   const [showLogin, setShowLogin] = useState<boolean>(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
//       {/* Hero Section with Animated Navigation */}
//       <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center space-x-2"
//           >
//             <PawPrint className="h-8 w-8 text-blue-600" />
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//               Zoo-Life
//             </span>
//           </motion.div>
//           <div className="flex items-center space-x-4">
//             <Button 
//               variant="ghost" 
//               className="hidden md:flex items-center hover:bg-blue-50"
//               onClick={() => {}}
//             >
//               Servicios
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//             <Button 
//               variant="outline"
//               className="hidden md:flex items-center border-blue-200 hover:bg-blue-50"
//               onClick={() => setShowLogin(true)}
//             >
//               <User className="mr-2 h-4 w-4" />
//               Iniciar Sesión
//             </Button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="pt-20">
//         {/* Hero Section */}
//         <section className="container mx-auto px-4 py-12 md:py-24">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center md:text-left"
//             >
//               <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
//                 Cuidamos a tus mascotas con 
//                 <span className="text-blue-600"> amor</span>
//               </h1>
//               <p className="text-lg text-gray-600 mb-8">
//                 Brindamos atención veterinaria de calidad con profesionales expertos y tecnología de vanguardia.
//               </p>
//               <Button 
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//                 onClick={() => setShowLogin(true)}
//               >
//                 Reserva tu cita
//                 <Heart className="ml-2 h-5 w-5" />
//               </Button>
//             </motion.div>
//             <div className="hidden md:block">
//               <img 
//                 src="https://www.pexels.com/photo/tricolor-maltese-puppy-1458925/" 
//                 alt="Maltese" 
//                 className="rounded-lg shadow-xl"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Services Grid */}
//         <section className="bg-white py-16">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {services.map((service: ServiceItem, index: number) => (
//                 <motion.div
//                   key={service.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
//                 >
//                   <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
//                     {service.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//                   <p className="text-gray-600">{service.description}</p>
//                   <ul className="mt-4 space-y-2">
//                     {service.items.map((item: string, i: number) => (
//                       <li key={i} className="flex items-center text-sm text-gray-500">
//                         <ChevronRight className="h-4 w-4 mr-2 text-blue-400" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Login Modal */}
//       <AnimatePresence>
//         {showLogin && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="w-full max-w-md"
//             >
//               <Card className="bg-white/90 backdrop-blur-lg shadow-xl border-0">
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-6">
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-blue-100 rounded-full p-2">
//                         <PawPrint className="h-6 w-6 text-blue-600" />
//                       </div>
//                       <h2 className="text-2xl font-semibold text-gray-800">Bienvenido</h2>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setShowLogin(false)}
//                       className="hover:bg-blue-50"
//                     >
//                       <X className="h-5 w-5" />
//                     </Button>
//                   </div>
//                   <form className="space-y-4">
//                     <div>
//                       <Input
//                         type="email"
//                         placeholder="Correo electrónico"
//                         className="w-full p-3 bg-white/70"
//                       />
//                     </div>
//                     <div>
//                       <Input
//                         type="password"
//                         placeholder="Contraseña"
//                         className="w-full p-3 bg-white/70"
//                       />
//                     </div>
//                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//                       Iniciar Sesión
//                     </Button>
//                   </form>
//                   <p className="text-center mt-4 text-sm text-gray-600">
//                     ¿Olvidaste tu contraseña?{' '}
//                     <button className="text-blue-600 hover:underline">
//                       Recupérala aquí
//                     </button>
//                   </p>
//                 </div>
//               </Card>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
//         <div className="container mx-auto px-4 text-center">
//           <div className="flex justify-center items-center space-x-2 mb-4">
//             <PawPrint className="h-6 w-6" />
//             <span className="text-xl font-bold">Zoo-Life</span>
//           </div>
//           <p className="text-blue-100">© 2024 Clínica Veterinaria Zoo-Life. Todos los derechos reservados.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ModernVetClinicPage;
