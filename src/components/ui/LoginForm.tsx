// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';



// interface LoginResponse {
//   access_token: string;
//   rol: 'Administrador' | 'Veterinario' | 'Cliente';
// }

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await fetch('http://localhost:3000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data: LoginResponse = await response.json();
//       localStorage.setItem('token', data.access_token);

//       switch (data.rol) {
//         case 'Administrador':
//           router.push('/admin');
//           break;
//         case 'Veterinario':
//           router.push('/vetdoc');
//           break;
//         case 'Cliente':
//           router.push('/cliente');
//           break;
//         default:
//           setError('Unknown role');
//       }
//     } catch (err) {
//       setError(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <h2 className="text-2xl font-semibold">Login</h2>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <Input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="mt-1"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <Input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="mt-1"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500">{error}</p>}
//           <Button type="submit" className="w-full">Sign In</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default LoginForm;



'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface LoginResponse {
  access_token: string;
  rol: 'Administrador' | 'Veterinario' | 'Cliente';
}

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem('token', data.access_token);

      switch (data.rol) {
        case 'Administrador':
          router.push('/admin');
          break;
        case 'Veterinario':
          router.push('/vetdoc');
          break;
        case 'Cliente':
          router.push('/cliente');
          break;
        default:
          setError('Unknown role');
      }
    } catch (err) {
      setError(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <Button variant="ghost" onClick={onClose}>X</Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
