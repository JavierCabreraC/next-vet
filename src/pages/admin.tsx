import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../utils/auth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';



// Tipos para los formularios
type PersonalForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
    FechaContratacion: string;
    CargoID: number;
    ProfesionID: number;
};

type ClienteForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
};

type MascotaForm = {
    Nombre: string;
    Sexo: string;
    FechaDeNacimiento: string;
    Observaciones: string;
    ClienteID: number;
    RazaID: number;
};

type FormTypes = PersonalForm | ClienteForm | MascotaForm;

const AdminPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth(['Administrador']);    
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showClienteForm, setShowClienteForm] = useState(false);
    const [showMascotaForm, setShowMascotaForm] = useState(false);  
    const [personalForm, setPersonalForm] = useState<PersonalForm>({
        NombreCompleto: '', Telefono: '', Direccion: '', Email: '', 
        FechaContratacion: '', CargoID: 0, ProfesionID: 0
    });
    const [clienteForm, setClienteForm] = useState<ClienteForm>({
        NombreCompleto: '', Telefono: '', Direccion: '', Email: ''
    });
    const [mascotaForm, setMascotaForm] = useState<MascotaForm>({
        Nombre: '', Sexo: '', FechaDeNacimiento: '', Observaciones: '', 
        ClienteID: 0, RazaID: 0
    }); 
    if (loading) {
        return <p>Cargando...</p>;
    }   
    if (!isAuthenticated) {
        return <p>Acceso Denegado</p>;
    }   
    const handleLogout = () => {
        logout(router);
    };

    const handleSubmit = async (formType: 'personal' | 'cliente' | 'mascota') => {
        const token = localStorage.getItem('token');
        let url = '';
        let body = {};
        switch (formType) {
            case 'personal':
                url = 'http://localhost:3333/admin/personal';
                body = personalForm;
                break;
            case 'cliente':
                url = 'http://localhost:3333/admin/cliente';
                body = clienteForm;
                break;
            case 'mascota':
                url = 'http://localhost:3333/admin/mascota';
                body = mascotaForm;
                break;
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });   
            if (response.ok) {
                alert(`${formType} registrado con éxito`);
                // Resetear el formulario y cerrar el modal
                switch (formType) {
                    case 'personal':
                        setPersonalForm({NombreCompleto: '', Telefono: '', Direccion: '', Email: '', FechaContratacion: '', CargoID: 0, ProfesionID: 0});
                        setShowPersonalForm(false);
                        break;
                    case 'cliente':
                        setClienteForm({NombreCompleto: '', Telefono: '', Direccion: '', Email: ''});
                        setShowClienteForm(false);
                        break;
                    case 'mascota':
                        setMascotaForm({Nombre: '', Sexo: '', FechaDeNacimiento: '', Observaciones: '', ClienteID: 0, RazaID: 0});
                        setShowMascotaForm(false);
                        break;
                }
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario');
        }
    };

    const renderForm = <T extends FormTypes>(
      title: string,
      form: T,
      setForm: React.Dispatch<React.SetStateAction<T>>,
      onClose: () => void
    ) => {
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <Button variant="ghost" onClick={onClose}>X</Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(title.split(' ')[1].toLowerCase() as 'personal' | 'cliente' | 'mascota'); }} className="space-y-4">
              {(Object.keys(form) as Array<keyof T>).map((key) => (
                <div key={key as string}>
                  <label htmlFor={key as string} className="block text-sm font-medium text-gray-700">{key as string}</label>
                  <Input
                    type={typeof form[key] === 'number' ? 'number' : 'text'}
                    id={key as string}
                    value={form[key]?.toString() ?? ''}
                    onChange={(e) => {
                      const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
                      setForm(prev => ({ ...prev, [key]: value }));
                    }}
                    className="mt-1"
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="w-full">Registrar</Button>
            </form>
          </CardContent>
        </Card>
      );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>
            </header>
            <main className="grid grid-cols-2 gap-4">
                <Button onClick={() => setShowPersonalForm(true)}>Registrar Personal</Button>
                <Button onClick={() => setShowClienteForm(true)}>Registrar Cliente</Button>
                <Button onClick={() => setShowMascotaForm(true)}>Registrar Mascota</Button>
                <Button onClick={() => alert('Funcionalidad no implementada')}>Ver Lista de Personal</Button>
                <Button onClick={() => alert('Funcionalidad no implementada')}>Ver Lista de Clientes</Button>
                <Button onClick={() => alert('Funcionalidad no implementada')}>Ver Lista de Mascotas</Button>
            </main>
            {showPersonalForm && renderForm('Registrar Personal', personalForm, setPersonalForm, () => setShowPersonalForm(false))}
            {showClienteForm && renderForm('Registrar Cliente', clienteForm, setClienteForm, () => setShowClienteForm(false))}
            {showMascotaForm && renderForm('Registrar Mascota', mascotaForm, setMascotaForm, () => setShowMascotaForm(false))}
        </div>
    );
};

export default AdminPage;
