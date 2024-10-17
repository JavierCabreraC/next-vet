import { CurrentItemType, UpdateForms, UpdateType } from "@/types/index.types";
import { Button } from "../ui/index.ui";


interface UpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: UpdateType | null;
    currentItem: CurrentItemType;
    updateForm: UpdateForms;
    setUpdateForm: (form: UpdateForms) => void;
    onSubmit: () => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
    isOpen,
    onClose,
    type,
    // currentItem,
    updateForm,
    setUpdateForm,
    onSubmit
}) => {
    if (!isOpen || !type) return null;

    const renderFields = () => {
        switch (type) {
            case 'personal':
                return (
                    <>
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            value={updateForm.personalUpdate.NombreCompleto || ''}
                            onChange={(e) => setUpdateForm({
                                ...updateForm,
                                personalUpdate: {
                                    ...updateForm.personalUpdate,
                                    NombreCompleto: e.target.value
                                }
                            })}
                        />
                        {/* Añadir campos restantes */}
                    </>
                );
            // Añadir casos para cliente y mascota
        }
    };

    const getTitle = (type: UpdateType): string => {
        const titles: Record<UpdateType, string> = {
            personal: 'Personal',
            cliente: 'Cliente',
            mascota: 'Mascota'
        };
        return `Actualizar ${titles[type]}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{getTitle(type)}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                    {renderFields()}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={onClose} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Actualizar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
