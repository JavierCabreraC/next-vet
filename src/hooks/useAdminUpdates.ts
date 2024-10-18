import { useState } from "react";
import { CurrentItemType, UpdateForms, UpdateType } from "@/types/index.types";


export const useAdminUpdates = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [currentItem, setCurrentItem] = useState<CurrentItemType>({});
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 }
    });

    // const [responseModal, setResponseModal] = useState<{
    //     isOpen: boolean;
    //     response: ApiResponse | null;
    //     title: string;
    // }>({
    //     isOpen: false,
    //     response: null,
    //     title: '',
    // });

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!updateType || !currentItem) return;
    
        const url = `http://localhost:3333/admin/${updateType}`;
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
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
    
            if (response.ok) {
                const data = await response.json();
                setShowUpdateModal(false);
                console.log({data});
                // Aquí podrías mostrar un mensaje de éxito usando el ResponseModal
                // y actualizar la lista correspondiente
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            // setResponseModal({
            //     isOpen: true,
            //     response: null,
            //     title: 'Error',
            // });
        }
    };

    return {
        showUpdateModal, setShowUpdateModal,
        updateType, setUpdateType,
        currentItem, setCurrentItem,
        updateForm, setUpdateForm,
        // responseModal, setResponseModal,
        handleUpdate
    };
};
