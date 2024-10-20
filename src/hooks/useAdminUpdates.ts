import { useState } from "react";
import { API_CONFIG, ApiService } from "@/services/index.services";
import { ApiResponse, CurrentItemType, UpdateForms, UpdateType, UseAdminUpdatesProps } from "@/types/index.types";


export const useAdminUpdates = ({
        setShowPersonalModal, setShowClienteModal, setShowMascotaModal
        }: UseAdminUpdatesProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [currentItem, setCurrentItem] = useState<CurrentItemType>({});
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 }, clienteUpdate: { ClienteID: 0 }, mascotaUpdate: { ID: 0 },
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

    const handleUpdate = async () => {
        if (!updateType || !currentItem) return;
        const endpointMap: Record<typeof updateType, keyof typeof API_CONFIG.ENDPOINTS> = {
            personal: 'PERSONAL',
            cliente: 'CLIENTES',
            mascota: 'MASCOTAS'
        };
        const endpoint = API_CONFIG.ENDPOINTS[endpointMap[updateType]]; 
        let body = {};
    
        switch (updateType) {
            case 'personal':
                body = {
                    PersonalID: updateForm.personalUpdate.ID,
                    NombreCompleto: updateForm.personalUpdate.NombreCompleto || '',
                    Telefono: updateForm.personalUpdate.Telefono || '',
                    Direccion: updateForm.personalUpdate.Direccion || '',
                    CargoID: updateForm.personalUpdate.CargoID || ''
                };
                break;
            case 'cliente':
                body = {
                    ClienteID: updateForm.clienteUpdate.ClienteID,
                    NombreCompleto: updateForm.clienteUpdate.NombreCompleto || '',
                    Telefono: updateForm.clienteUpdate.Telefono || '',
                    Direccion: updateForm.clienteUpdate.Direccion || ''
                };
                break;
            case 'mascota':
                body = {
                    MascotaID: updateForm.mascotaUpdate.ID,
                    Nombre: updateForm.mascotaUpdate.Nombre || '',
                    Sexo: updateForm.mascotaUpdate.Sexo || '',
                    Observaciones: updateForm.mascotaUpdate.Observaciones || '',
                    ClienteID: updateForm.mascotaUpdate.ClienteID || ''
                };
                break;
        }
    
        try {
            const data = await ApiService.fetch(endpoint, {
                method: 'PATCH',
                body: JSON.stringify(body)
            });
            setShowUpdateModal(false);
            switch (updateType) {
                case 'personal':
                    setShowPersonalModal(false);
                    break;
                case 'cliente':
                    setShowClienteModal(false);
                    break;
                case 'mascota':
                    setShowMascotaModal(false);
                    break;
            }
            console.log({ data });
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };
    
    return {
        showUpdateModal, setShowUpdateModal,
        updateType, setUpdateType,
        currentItem, setCurrentItem,
        updateForm, setUpdateForm,
        responseModal, setResponseModal,
        handleUpdate
    };
};
