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
                url = API_CONFIG.ENDPOINTS.PERSONAL;
                body = { ...personalForm };
                break;
            case 'cliente':
                url = API_CONFIG.ENDPOINTS.CLIENTES;
                body = { ...clienteForm };
                break;
            case 'mascota':
                url = API_CONFIG.ENDPOINTS.MASCOTAS;
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




// import { useGenericForm } from '@/hooks/form';
// import { API_CONFIG } from '@/services/index.services';
// import type { PersonalForm, ClienteForm, MascotaForm } from '@/types/admin';


// export const useAdminForms = () => {
//     const initialPersonalForm: PersonalForm = {
//         NombreCompleto: '', Telefono: '', Direccion: '', Email: '', FechaContratacion: '', 
//         CargoID: 0, ProfesionID: 0
//     };

//     const initialClienteForm: ClienteForm = {
//         NombreCompleto: '', Telefono: '', Direccion: '', Email: ''
//     };

//     const initialMascotaForm: MascotaForm = {
//         Nombre: '', Sexo: '', FechaDeNacimiento: '', Observaciones: '',
//         ClienteID: 0, RazaID: 0
//     };

//     const {
//         form: personalFormState,
//         setFormData: setPersonalForm,
//         handleSubmit: handlePersonalSubmit,
//         responseModal: personalResponseModal
//     } = useGenericForm<PersonalForm>({
//         initialState: initialPersonalForm,
//         endpoint: API_CONFIG.ENDPOINTS.PERSONAL,
//         formType: 'personal'
//     });

//     const {
//         form: clienteFormState,
//         setFormData: setClienteForm,
//         handleSubmit: handleClienteSubmit,
//         responseModal: clienteResponseModal
//     } = useGenericForm<ClienteForm>({
//         initialState: initialClienteForm,
//         endpoint: API_CONFIG.ENDPOINTS.CLIENTES,
//         formType: 'cliente'
//     });

//     const {
//         form: mascotaFormState,
//         setFormData: setMascotaForm,
//         handleSubmit: handleMascotaSubmit,
//         responseModal: mascotaResponseModal
//     } = useGenericForm<MascotaForm>({
//         initialState: initialMascotaForm,
//         endpoint: API_CONFIG.ENDPOINTS.MASCOTAS,
//         formType: 'mascota'
//     });

//     const handleSubmit = async (formType: 'personal' | 'cliente' | 'mascota') => {
//         switch (formType) {
//             case 'personal':
//                 await handlePersonalSubmit();
//                 break;
//             case 'cliente':
//                 await handleClienteSubmit();
//                 break;
//             case 'mascota':
//                 await handleMascotaSubmit();
//                 break;
//         }
//     };

//     return {
//         personalForm: personalFormState.data,
//         clienteForm: clienteFormState.data,
//         mascotaForm: mascotaFormState.data,
//         setPersonalForm, setClienteForm, setMascotaForm, handleSubmit,
//         responseModal: {
//             isOpen: personalResponseModal.isOpen || clienteResponseModal.isOpen || mascotaResponseModal.isOpen,
//             response: personalFormState.response || clienteFormState.response || mascotaFormState.response,
//             title: personalFormState.error || clienteFormState.error || mascotaFormState.error || 'Operación exitosa',
//             onClose: () => {
//                 if (personalResponseModal.isOpen) personalResponseModal.onClose();
//                 if (clienteResponseModal.isOpen) clienteResponseModal.onClose();
//                 if (mascotaResponseModal.isOpen) mascotaResponseModal.onClose();
//             }
//         }
//     };
// };
