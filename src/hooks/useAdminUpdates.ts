import { CurrentItemType, UpdateForms, UpdateType } from "@/types/index.types";
import { useState } from "react";


export const useAdminUpdates = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [currentItem, setCurrentItem] = useState<CurrentItemType>({});
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { PersonalID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { MascotaID: 0 }
    });

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!updateType || !currentItem) return;

        const url = `http://localhost:3333/admin/${updateType}`;
        let body = {};

        switch (updateType) {
            case 'personal':
                body = updateForm.personalUpdate;
                break;
            case 'cliente':
                body = updateForm.clienteUpdate;
                break;
            case 'mascota':
                body = updateForm.mascotaUpdate;
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
                // Manejar respuesta exitosa
                setShowUpdateModal(false);
                console.log({data});
                // Aquí podrías actualizar la lista correspondiente
            } else {
                // Manejar error
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    return {
        showUpdateModal, setShowUpdateModal,
        updateType, setUpdateType,
        currentItem, setCurrentItem,
        updateForm, setUpdateForm,
        handleUpdate
    };
};
