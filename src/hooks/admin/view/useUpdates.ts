import { useUpdateHandler } from '@/hooks/index.hooks';
import type { Cliente, Mascota, Personal, Reservacion, UpdateType, UseAdminUpdatesProps } from '@/types/admin';


export const useAdminUpdates = ({
    setShowPersonalModal,
    setShowClienteModal,
    setShowMascotaModal
}: UseAdminUpdatesProps) => {
    const updateHandler = useUpdateHandler({
        onUpdateSuccess: (type) => {
            // Cerrar el modal correspondiente después de una actualización exitosa
            switch (type) {
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
        }
    });

    const handleEdit = (record: Personal | Cliente | Mascota | Reservacion, type: UpdateType) => {
        updateHandler.initializeUpdate(record, type);
    };

    return {
        showUpdateModal: updateHandler.showModal,
        setShowUpdateModal: updateHandler.setShowModal,
        updateType: updateHandler.updateType,
        currentItem: updateHandler.currentItem,
        updateForm: updateHandler.updateForm,
        setUpdateForm: updateHandler.setUpdateForm,
        handleUpdate: updateHandler.handleUpdate,
        handleEdit
    };
};
