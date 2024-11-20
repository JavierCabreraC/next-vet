import { useState } from 'react';
import { useFormHandler } from '@/hooks/index.hooks';
import type { PersonalForm, ClienteForm, MascotaForm, ApiResponse } from '@/types/index.types';


export const useAdminForms = () => {
    const [responseModal, setResponseModal] = useState<{
        isOpen: boolean;
        response: ApiResponse | null;
        title: string;
    }>({
        isOpen: false,
        response: null,
        title: '',
    });

    const personalHandler = useFormHandler<PersonalForm>({
        formType: 'personal',
        initialState: {
            NombreCompleto: '',
            Telefono: '',
            NumeroCI: 0,
            Direccion: '',
            Email: '',
            FechaContratacion: '',
            CargoID: 0,
            ProfesionID: 0
        }, 
        onSuccess: (response) => {
            setResponseModal({
                isOpen: true,
                response,
                title: 'Registro de personal exitoso'
            });
        }
    });

    const clienteHandler = useFormHandler<ClienteForm>({
        formType: 'cliente',
        initialState: {
            NombreCompleto: '',
            NumeroCI: 0,
            Telefono: '',
            Direccion: '',
            Email: ''
        },
        onSuccess: (response) => {
            setResponseModal({
                isOpen: true,
                response,
                title: 'Registro de cliente exitoso'
            });
        }
    });

    const mascotaHandler = useFormHandler<MascotaForm>({
        formType: 'mascota',
        initialState: {
            Nombre: '',
            Sexo: '',
            FechaDeNacimiento: '',
            Observaciones: '',
            ClienteCI: 0,
            RazaID: 0
        },
        onSuccess: (response) => {
            setResponseModal({
                isOpen: true,
                response,
                title: 'Registro de mascota exitoso'
            });
        }
    });

    const handleSubmit = async (formType: 'personal' | 'cliente' | 'mascota') => {
        try {
            switch (formType) {
                case 'personal':
                    await personalHandler.handleSubmit();
                    break;
                case 'cliente':
                    await clienteHandler.handleSubmit();
                    break;
                case 'mascota':
                    await mascotaHandler.handleSubmit();
                    break;
            }
        } catch (error) {
            console.log({error});
            setResponseModal({
                isOpen: true,
                response: null,
                title: 'Error en el registro'
            });
        }
    };

    return {
        personalForm: personalHandler.form,
        setPersonalForm: personalHandler.setForm,
        clienteForm: clienteHandler.form,
        setClienteForm: clienteHandler.setForm,
        mascotaForm: mascotaHandler.form,
        setMascotaForm: mascotaHandler.setForm,
        responseModal, setResponseModal,
        handleSubmit
    };
};
