import { useState } from 'react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { ApiResponse, PersonalForm, ClienteForm, MascotaForm } from '@/types/index.types';


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
        let url = '';
        let body: Record<string, unknown> = {};
    
        switch (formType) {
            case 'personal':
                url = API_CONFIG.ENDPOINTS.ADM_PERSONAL;
                body = { ...personalForm };
                break;
            case 'cliente':
                url = API_CONFIG.ENDPOINTS.ADM_CLIENTES;
                body = { ...clienteForm };
                break;
            case 'mascota':
                url = API_CONFIG.ENDPOINTS.ADM_MASCOTAS;
                body = { ...mascotaForm };
                break;
        }
    
        try {
            const response: ApiResponse = await ApiService.fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            setResponseModal({
                isOpen: true,
                response: response,
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
        personalForm, setPersonalForm,
        clienteForm, setClienteForm,
        mascotaForm, setMascotaForm,
        responseModal, setResponseModal,
        handleSubmit
    };
};
