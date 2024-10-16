import { useState } from "react";
import { CurrentItemType, UpdateForms, UpdateType, UseAdminUpdatesProps } from "@/types/admin";


export const useAdminUpdates = ({
        setShowPersonalModal, setShowClienteModal, setShowMascotaModal
        }: UseAdminUpdatesProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [currentItem, setCurrentItem] = useState<CurrentItemType>({});
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 },
    });

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
