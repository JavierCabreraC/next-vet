import { useUpdateHandler } from '@/hooks/index.hooks';
import type { Cliente, Mascota, Personal, Reservacion, UpdateType, 
    UseAdminUpdatesProps, Usuario } from '@/types/admin';


export const useAdminUpdates = ({
    handleViewList
}: UseAdminUpdatesProps) => {
    const updateHandler = useUpdateHandler({
        onUpdateSuccess: async (type) => {
            // Refrescar los datos según el tipos
            switch (type) {
                case 'personal':
                    await handleViewList('personal');
                    break;
                case 'cliente':
                    await handleViewList('clientes');
                    break;
                case 'mascota':
                    await handleViewList('mascotas');
                    break;
                case 'usuario':
                    await handleViewList('usuarios');
                    break;
                case 'reservacion':
                    await handleViewList('reservacion');
                    break;
            }
        }
    });

    const handleEdit = (record: Personal | Cliente | Mascota | Reservacion | Usuario, type: UpdateType) => {
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
