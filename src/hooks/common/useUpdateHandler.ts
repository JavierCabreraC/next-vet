import { useState } from 'react';
import { ApiService, API_CONFIG } from '@/services/index.services';
import { UpdateType, UpdateForms, CurrentItemType, Personal, Cliente, Mascota, ReservacionUpdate } from '@/types/admin';


interface UseUpdateHandlerProps {
    onUpdateSuccess?: (type: UpdateType) => void;
}

type UpdateFormMap = {
    personal: 'personalUpdate';
    cliente: 'clienteUpdate';
    mascota: 'mascotaUpdate';
};

export const useUpdateHandler = ({ onUpdateSuccess }: UseUpdateHandlerProps) => {
    const [showModal, setShowModal] = useState(false);
    const [updateType, setUpdateType] = useState<UpdateType | null>(null);
    const [currentItem, setCurrentItem] = useState<CurrentItemType>({});
    const [updateForm, setUpdateForm] = useState<UpdateForms>({
        personalUpdate: { ID: 0 },
        clienteUpdate: { ClienteID: 0 },
        mascotaUpdate: { ID: 0 }
    });

    const handleUpdate = async () => {
        if (!updateType || !currentItem) return;

        const endpointMap: Record<UpdateType, string> = {
            personal: API_CONFIG.ENDPOINTS.ADM_PERSONAL,
            cliente: API_CONFIG.ENDPOINTS.ADM_CLIENTES,
            mascota: API_CONFIG.ENDPOINTS.ADM_MASCOTAS,
            reservacion: API_CONFIG.ENDPOINTS.ADM_RESERV
        };

        try {
            if (updateType === 'reservacion') {
                // Para reservaciones, solo enviamos el ID
                const reservacion = currentItem.reservacion as ReservacionUpdate;
                await ApiService.fetch<{ Respuesta: string; ReservaID: number }>(
                    endpointMap[updateType],
                    {
                        method: 'PATCH',
                        body: JSON.stringify({ ReservacionID: reservacion.ReservacionID })
                    }
                );
                setShowModal(false);
                onUpdateSuccess?.(updateType);
                return;
            } else {
                // Lógica existente para otros tipos...
                const formMap: UpdateFormMap = {
                    personal: 'personalUpdate',
                    cliente: 'clienteUpdate',
                    mascota: 'mascotaUpdate'
                };
                const formKey = formMap[updateType];
                const currentForm = updateForm[formKey];
                
                await ApiService.fetch(endpointMap[updateType], {
                    method: 'PATCH',
                    body: JSON.stringify(currentForm)
                });
                setShowModal(false);
                onUpdateSuccess?.(updateType);
            }
            setShowModal(false);
            onUpdateSuccess?.(updateType);
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    const initializeUpdate = (
        item: NonNullable<CurrentItemType[keyof CurrentItemType]>,
        type: UpdateType
    ) => {
        setCurrentItem({ [type]: item });
        setUpdateType(type);

        if (type !== 'reservacion') {
            // Lógica existente para otros tipos...
            setShowModal(true);
            const updateData: UpdateForms = {
                ...updateForm,
                personalUpdate: type === 'personal' 
                    ? { ID: (item as Personal).ID }
                    : updateForm.personalUpdate,
                clienteUpdate: type === 'cliente'
                    ? { ClienteID: (item as Cliente).ClienteID }
                    : updateForm.clienteUpdate,
                mascotaUpdate: type === 'mascota'
                    ? { ID: (item as Mascota).ID }
                    : updateForm.mascotaUpdate
            };
            setUpdateForm(updateData);
        } else {
            // Para reservaciones, ejecutar la actualización inmediatamente
            handleUpdate();
        }
    };

    return {
        showModal,
        setShowModal,
        updateType,
        currentItem,
        updateForm,
        setUpdateForm,
        handleUpdate,
        initializeUpdate
    };
};
