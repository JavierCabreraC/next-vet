'use client';

// import React, { useState } from 'react';
// import LoginForm from '@/components/ui/LoginForm';
// import { Button } from '@/components/ui/button';



// const VetClinicWelcomePage: React.FC = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-blue-600">Clínica Veterinaria Zoo-Life</h1>
//         <Button onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
//       </header>

//       <main>
//         {showLogin ? (
//           <LoginForm onClose={() => setShowLogin(false)} />
//         ) : (
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold mb-4">Bienvenido a la Página Genérica y sin vida de Zoo-Life</h2>
//             <p className="mb-4">¡Proveemos de la mejor atención a sus bolas de pelos!</p>
//             <p className="mb-4">Dios qué materia tan estresante</p>
//             <p className="mb-4">SI1 será mi muerte...</p>
//             <Button onClick={() => setShowLogin(true)}>Servicios Ofertados</Button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default VetClinicWelcomePage;

import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import LoginForm from '../components/ui/LoginForm';
import ChangePasswordForm from '../components/ui/ChangePassword';



const VetClinicWelcomePage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Clínica Veterinaria Zoo-Life</h1>
        <div>
          <Button onClick={() => setShowLogin(true)} className="mr-2">Iniciar Sesión</Button>
          <Button onClick={() => setShowChangePassword(true)}>Cambiar Contraseña</Button>
        </div>
      </header>

      <main>
        {showLogin && (
          <LoginForm onClose={() => setShowLogin(false)} />
        )}
        {showChangePassword && (
          <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
        )}
        {!showLogin && !showChangePassword && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Bienvenido a la Página Genérica y sin vida de Zoo-Life</h2>
            <p className="mb-4">¡Proveemos de la mejor atención a sus bolas de pelos!</p>
            <p className="mb-4">Recuerde, todas las mascotas van al cielo</p>
            <p className="mb-4">Cualquier queja con Rodrigo</p>
            <Button onClick={() => setShowLogin(true)}>Servicios Ofertados</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VetClinicWelcomePage;
