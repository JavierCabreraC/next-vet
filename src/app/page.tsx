// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Esta materia de SI1 nos va a consumir vivos.</li>
//           <li>Miren chicos, pude hacer el deployment con GitHub Pages.</li>
//           <li>Sólo falta poner el backend en un servidor. Tal vez Vercel.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs AA


//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }



// 'use client';
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

// const VetClinicWelcomePage = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-blue-600">Clínica Veterinaria Zoo-Life</h1>
//         <Button onClick={() => setShowLogin(!showLogin)}>
//           {showLogin ? 'Close' : 'Login'}
//         </Button>
//       </header>

//       <main>
//         {showLogin ? (
//           <Card className="w-full max-w-md mx-auto">
//             <CardHeader>
//               <h2 className="text-2xl font-semibold">Iniciar Sesión</h2>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <Input type="email" id="email" placeholder="Enter your email" className="mt-1" />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
//                   <Input type="password" id="password" placeholder="Enter your password" className="mt-1" />
//                 </div>
//               </form>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full">Iniciar Sesión</Button>
//             </CardFooter>
//           </Card>
//         ) : (
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold mb-4">Bienvenidos a la página genérica de Zoo-Life</h2>
//             <p className="mb-4">¡Brindamos atención de primera para sus mascotas!</p>
//             <p className="mb-4">Esta materia será mi muerte...</p>
//             <p className="mb-4">AAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHH</p>
//             <p className="mb-4">QUIERO CAFÉÉÉÉÉÉÉÉÉÉÉÉÉÉÉ</p>
//             <p className="mb-4">AAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHH</p>
//             <Button>Servicios</Button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default VetClinicWelcomePage;




import React from 'react';
import LoginForm from '@/components/ui/LoginForm';



const VetClinicWelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Pawsome Vet Clinic</h1>
      </header>

      <main>
        <LoginForm />
      </main>
    </div>
  );
};

export default VetClinicWelcomePage;
