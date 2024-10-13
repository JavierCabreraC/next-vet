import { useState } from 'react';
import { PersonalForm, ClienteForm, MascotaForm } from '@/types/admin';



export const useAdminForms = () => {
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

    const handleSubmit = async (formType: 'personal' | 'cliente' | 'mascota') => {
        const token = localStorage.getItem('token');
        let url = '';
        let body: Record<string, unknown> = {};

        switch (formType) {
            case 'personal':
                url = 'http://localhost:3333/admin/personal';
                body = { ...personalForm };
                break;
            case 'cliente':
                url = 'http://localhost:3333/admin/cliente';
                body = { ...clienteForm };
                break;
            case 'mascota':
                url = 'http://localhost:3333/admin/mascota';
                body = { ...mascotaForm };
                break;
        }

        body.JWT = token;

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
                // Resetear el formulario
                switch (formType) {
                    case 'personal':
                        setPersonalForm({NombreCompleto: '', Telefono: '', Direccion: '', Email: '', FechaContratacion: '', CargoID: 0, ProfesionID: 0});
                        break;
                    case 'cliente':
                        setClienteForm({NombreCompleto: '', Telefono: '', Direccion: '', Email: ''});
                        break;
                    case 'mascota':
                        setMascotaForm({Nombre: '', Sexo: '', FechaDeNacimiento: '', Observaciones: '', ClienteID: 0, RazaID: 0});
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

    return {
        personalForm,
        setPersonalForm,
        clienteForm,
        setClienteForm,
        mascotaForm,
        setMascotaForm,
        handleSubmit
    };
};
