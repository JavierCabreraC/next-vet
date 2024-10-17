import { useState } from 'react';
import { PersonalForm, ClienteForm, MascotaForm } from '@/types/admin';
import { ApiResponse } from '@/types/responses';


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

    const [responseModal, setResponseModal] = useState<{
        isOpen: boolean;
        response: ApiResponse | null;
        title: string;
    }>({
        isOpen: false,
        response: null,
        title: '',
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
                const responseData: ApiResponse = await response.json();
                setResponseModal({
                    isOpen: true,
                    response: responseData,
                    title: `Registro de ${formType} exitoso`,
                });
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
                const errorData: ApiResponse = await response.json();
                setResponseModal({
                    isOpen: true,
                    response: errorData,
                    title: 'Error en el registro',
                });
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setResponseModal({
                isOpen: true,
                response: null,
                title: 'Error',
            });
        }
    };

    return {
        personalForm,
        setPersonalForm,
        clienteForm,
        setClienteForm,
        mascotaForm,
        setMascotaForm,
        handleSubmit,
        responseModal,
        setResponseModal
    };
};
